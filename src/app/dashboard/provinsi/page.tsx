"use client";
import {
  Check,
  CheckSquare,
  CirclePlus,
  ClipboardCheck,
  Info,
  Search,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../../utils/config";
import Cookies from "js-cookie";
import useDebounce from "@/hooks/useDebounce";
import Link from "next/link";
import { Province } from "@/models/province";
import { alertConfirm, alertError, alertSuccess } from "@/libs/alert";
import { AxiosError } from "axios";

type ActiveTab = "Semua" | "Diterima" | "Belum Diterima";

const ProvinsiPage: React.FC = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<ActiveTab>("Semua");
  const [inputSearch, setInputSearch] = useState("");
  const debouncedQuery = useDebounce(inputSearch, 1000);
  const tabs = ["Semua", "Diterima", "Belum Diterima"];
  const [provinces, setProvinces] = useState<Province[]>([]);

  const fetchData = async () => {
    try {
      let isAccepted: boolean | undefined = undefined;
      switch (activeTab) {
        case "Diterima":
          isAccepted = true;
          break;
        case "Belum Diterima":
          isAccepted = false;
          break;
      }

      const response = await API.get(ENDPOINTS.PROVINCES, {
        params: {
          is_accepted: isAccepted,
        },
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });
      console.log(response.data.data)
      setProvinces(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const confirm = await alertConfirm(
      `Apakah anda yakin ingin menghapus provinsi "${name}"?`
    );
    if (!confirm) return;

    try {
      await API.delete(`${ENDPOINTS.PROVINCES}/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });

      await alertSuccess(`Provinsi ${name} berhasil dihapus!`);
      fetchData();
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        const responseError = error.response?.data.errors;
        await alertError(responseError);
      }
      console.error(error);
    }
  };

  useEffect(() => {
    if (inputSearch.trim() !== "") {
      if (!debouncedQuery) {
        setProvinces([]);
        return;
      }
    }
    fetchData();
  }, [activeTab, debouncedQuery]);

  return (
    <main className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-accent-dark text-sm mb-5">Provinsi</h1>
        <div className="mb-8">
          <div className="flex items-center space-x-2 font-extrabold text-accent">
            <ClipboardCheck className="w-5 h-5" />
            <h2 className="text-2xl mt-2">Provinsi</h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as ActiveTab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm cursor-pointer  ${
                activeTab === tab
                  ? "bg-accent text-white shadow-sm hover:bg-accent-hover"
                  : "bg-gray-100 text-gray-600 hover:text-gray-800 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex justify-end mb-6">
          <Link
            href="/dashboard/provinsi/tambah"
            className="text-white bg-accent hover:bg-accent-hover rounded-xl p-3 px-5 flex items-center space-x-2"
          >
            <CirclePlus className="w-5 h-5 " />
            <span>Tambah Provinsi</span>
          </Link>
        </div>
      </div>

      {/* Task Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari Provinsi..."
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            className="w-full bg-accent text-white placeholder-teal-200 pl-10 pr-4 py-3 rounded-t-2xl focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3 font-medium text-gray-600">No</th>
                <th className="text-left p-3 font-medium text-gray-600">
                  Nama
                </th>
                <th className="text-left p-3 font-medium text-gray-600">
                  Status
                </th>
                <th className="text-left p-3 font-medium text-gray-600">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {provinces.map((province, index) => (
                <tr key={province.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-gray-800">{index + 1}</td>
                  <td className="p-4 text-gray-800">{province.name}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        province.is_accepted
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {province.is_accepted ? "Diterima" : "Belum Diterima"}
                    </span>
                  </td>
                  <td className="p-4">
                    {!province.is_accepted && (
                      <button
                        //   onClick={() => router.push(`tasklist/${province.id}`)}
                        className="p-2 text-green-600 hover:bg-blue-50 rounded-full transition-colors cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      //   onClick={() => router.push(`tasklist/${province.id}`)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors cursor-pointer"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(province.id, province.name)}
                      className="p-2 text-red-600 hover:bg-blue-50 rounded-full transition-colors cursor-pointer"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State (if no provinces) */}
        {provinces.length === 0 && (
          <div className="text-center py-12">
            <CheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Tidak ada provinsi yang ditemukan</p>
          </div>
        )}
      </div>
    </main>
  );
};
export default ProvinsiPage;
