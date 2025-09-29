"use client";
import {
  Building,
  CircleArrowRight,
  LayoutDashboard,
  MapPin,
  Save,
  UserCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import useDebounce from "@/hooks/useDebounce";
import TabsCompenent from "@/components/TabsCompenent";
import PaginationComponent from "@/components/PaginationComponent";
import NotFoundComponent from "@/components/NotFoundComponent";
import LoaderData from "@/components/loader";
import { API, ENDPOINTS } from "../../../../utils/config";
import { alertConfirm, alertError, alertSuccess } from "@/libs/alert";

interface Data {
  id: string;
  name: string;
  value: string;
}

const PerusahaanPage: React.FC = () => {
  const router = useRouter();
  const [inputSearch, setInputSearch] = useState<string>("");
  const debouncedQuery = useDebounce(inputSearch, 1000);

  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<Data[]>([]);
  const [formData, setFormData] = useState<Data[]>([]);

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await API.get(ENDPOINTS.HOMEPAGES, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });

      console.log("Data fetched successfully:", response.data);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching company:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    const confirm = await alertConfirm(
      "Apakah anda yakin ingin menyimpan perubahan?"
    );
    if (!confirm) return;
    // return
    console.log("Form Data to be saved:", formData);
    try {
      const response = await API.patch(
        ENDPOINTS.HOMEPAGES,
        {
          data: formData,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );

      console.log("Data saved successfully:", response.data);
      fetchData();
      await alertSuccess("Data berhasil disimpan!");
    } catch (error) {
      await alertError("Terjadi kesalahan saat menyimpan data.");
      console.error("Error saving data:", error);
    }
  };

  return (
    <main className="p-6 relative">
      <h1 className="text-accent-dark text-sm mb-5">Isi Halaman</h1>

      <div className="mb-8 p-4 rounded-lg">
        <div className="flex items-center space-x-2 font-extrabold text-accent">
          <LayoutDashboard className="w-5 h-5" />
          <h2 className="text-2xl mt-2">Isi Halaman</h2>
        </div>
      </div>

      <div className="columns-1 lg:columns-2 gap-6">
        {data.map((item) => (
          <div
            className="bg-white rounded-lg shadow-sm p-4 mb-6 break-inside-avoid flex flex-col gap-4"
            key={item.id}
          >
            <label htmlFor={item.id} className="font-medium text-lg">
              {item.name}
            </label>
            <textarea
              id={item.id}
              value={
                formData.find((form) => form.id === item.id)?.value ??
                item.value
              }
              onChange={(e) => {
                const newValue = e.target.value;
                setFormData((prev) => {
                  const exists = prev.find((f) => f.id === item.id);
                  if (exists) {
                    // update value
                    return prev.map((f) =>
                      f.id === item.id ? { ...f, value: newValue } : f
                    );
                  } else {
                    // tambahkan item baru ke formData
                    return [...prev, { ...item, value: newValue }];
                  }
                });
              }}
              className="border p-3 rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent
             w-full resize-y overflow-auto min-h-40 lg:min-h-32"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="fixed bottom-8 right-8 bg-accent p-4 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-accent-hover transition-colors cursor-pointer"
      >
        <Save />
      </button>
    </main>
  );
};
export default PerusahaanPage;
