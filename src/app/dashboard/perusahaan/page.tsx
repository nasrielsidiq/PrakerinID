"use client";
import { Building, CircleArrowRight, MapPin, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../../utils/config";
import Cookies from "js-cookie";
import Image from "next/image";
import useDebounce from "@/hooks/useDebounce";

interface Perusahaan {
  id: string;
  photo_profile?: string | null;
  name: string;
  city_regency: string;
  province: string;
}

const PerusahaanPage: React.FC = () => {
  const [inputSearch, setInputSearch] = useState<string>("");
  const debouncedQuery = useDebounce(inputSearch, 1000);
  const router = useRouter();
  const [perusahaan, setPerushaan] = useState<Perusahaan[]>([]);

  const fetchCompany = async () => {
    try {
      const response = await API.get(ENDPOINTS.USERS, {
        params: {
          search: inputSearch,
          role: "company",
        },
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });

      if (response.status === 200) {
        console.log("Company fetched successfully:", response.data.data);
        const data = response.data.data.map((item: any) => ({
          id: item.id,
          photo_profile: item.photo_profile,
          name: item.company.name,
          city_regency: item.city_regency.name,
          province: item.province.name,
        }));
        setPerushaan(data);
      }
    } catch (error) {
      console.error("Error fetching company:", error);
    }
  };

  useEffect(() => {
    if (inputSearch.trim() !== "") {
      if (!debouncedQuery) {
        setPerushaan([]);
        return;
      }
    }

    fetchCompany();
  }, [debouncedQuery]);
  return (
    <main className="p-6">
      <h1 className="text-accent-dark text-sm mb-5">Perusahaan</h1>
      <div className="mb-8">
        <div className="flex items-center space-x-2 font-extrabold text-accent">
          <Building className="w-5 h-5" />
          <h2 className="text-2xl mt-2">Perusahaan</h2>
        </div>
      </div>
      <div className="lg:flex lg:justify-between items-end mb-5">
        <div className="bg-white p-3 rounded-2xl flex items-center justify-between space-x-5 px-5 mb-5 lg:mb-0">
          <div className="text-black">
            <h1 className="text-2xl font-extrabold">10</h1>
            <span className="text-sm">Total Perusahaan</span>
          </div>
          <Building className="w-10 h-10  text-accent" />
        </div>
        <div className="">
          <div className="relative flex-1 bg-white rounded-2xl">
            <input
              type="text"
              onChange={(e) => setInputSearch(e.target.value)}
              value={inputSearch}
              placeholder="Cari Perusahaan..."
              className="text-gray-600 w-full px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-prakerin focus:border-transparent transition-all duration-300"
            />
            <svg
              className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-black">
        {perusahaan.length !== 0 ? (
          perusahaan.map((data, index) => (
            <div
              className="bg-white flex flex-col md:flex-row space-x-5 p-5 px-10 md:px-5 rounded-2xl justify-between items-end md:items-center"
              key={index}
            >
              <div className="flex w-full md:w-auto">
                {data.photo_profile ? (
                  <div className="w-15 h-15 relative rounded-full border-white border">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/storage/photo-profile/${data.photo_profile}`}
                      alt="Logo Perusahaan"
                      fill
                      sizes="100%"
                      className="object-cover rounded-full"
                    />
                  </div>
                ) : (
                  <UserCircle className="w-15 h-15 text-[var(--color-accent)]" />
                )}

                <div className="ms-3 ">
                  <h5 className="text-accent font-bold">{data.name}</h5>
                  <span className="flex">
                    <MapPin /> {data.city_regency}, {data.province}
                  </span>
                </div>
              </div>
              <button
                onClick={() => router.push(`perusahaan/${data.id}`)}
                className="bg-accent/10 flex justify-between items-center p-1 px-2 space-x-2 rounded-full cursor-pointer hover:bg-accent/20 transition"
              >
                <span>Detail</span>
                <CircleArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 text-center text-gray-500">
            Tidak ada perusahaan yang ditemukan.
          </div>
        )}
      </div>
    </main>
  );
};
export default PerusahaanPage;
