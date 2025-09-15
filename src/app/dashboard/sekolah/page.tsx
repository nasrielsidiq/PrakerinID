"use client";
import { BookOpen, CircleArrowRight, MapPin, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../../utils/config";
import Cookies from "js-cookie";
import Image from "next/image";
import useDebounce from "@/hooks/useDebounce";
import Link from "next/link";

interface Perusahaan {
  id: string;
  photo_profile?: string | null;
  name: string;
  city_regency?: string;
  province?: string;
  mou: false;
}

interface CompanyCount {
  company_count: number;
  company_mou_count: number;
}

type ActiveTab = "Semua" | "Sudah Mou" | "Belum Mou";

const SekolahPage: React.FC = () => {
  const router = useRouter();
  const [inputSearch, setInputSearch] = useState<string>("");
  const debouncedQuery = useDebounce(inputSearch, 1000);
  const [perusahaan, setPerushaan] = useState<Perusahaan[]>([]);
  const tabs = ["Semua", "Sudah Mou", "Belum Mou"];
  const [activeTab, setActiveTab] = useState<ActiveTab>("Semua");
  const [companyCount, setCompanyCount] = useState<CompanyCount>({
    company_count: 0,
    company_mou_count: 0,
  });

  const fetchCompany = async () => {
    try {
      const response = await API.get(ENDPOINTS.USERS, {
        params: {
          search: inputSearch,
          role: "school",
          is_mou:
            activeTab === "Semua"
              ? undefined
              : activeTab === "Sudah Mou"
              ? true
              : false,
        },
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });

      console.log("Company fetched successfully:", response.data.data);
      const data = response.data.data.map((item: any) => ({
        id: item.id,
        photo_profile: item.photo_profile,
        name: item.name,
        // city_regency: item.city_regency.name,
        // province: item.province.name,
      }));
      setPerushaan(data);
    } catch (error) {
      console.error("Error fetching company:", error);
    }
  };

  const fetchCompanyCount = async () => {
    try {
      const response = await API.get(`${ENDPOINTS.USERS}/count`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });
      if (response.status === 200) {
        console.log("Company Count fetched successfully:", response.data.data);
        setCompanyCount(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching company count:", error);
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
  }, [debouncedQuery, activeTab]);

  useEffect(() => {
    fetchCompanyCount();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-accent-dark text-sm mb-5">Sekolah </h1>
      <div className="mb-8">
        <div className="flex items-center space-x-2 font-extrabold text-accent">
          <BookOpen className="w-5 h-5" />
          <h2 className="text-2xl mt-2">Daftar Sekolah</h2>
        </div>
      </div>
      <div className="lg:flex lg:justify-between items-end mb-5">
        <div className="flex gap-4 border-2">
          <div className="bg-white p-3 rounded-2xl flex items-center justify-between space-x-5 px-5 mb-5 lg:mb-0 w-64">
            <div className="text-black">
              <h1 className="text-2xl font-extrabold">
                {companyCount.company_count}
              </h1>
              <span className="text-sm">Total Sekolah</span>
            </div>
            <BookOpen className="w-10 h-10  text-accent" />
          </div>
          <div className="bg-white p-3 rounded-2xl flex items-center justify-between space-x-5 px-5 mb-5 lg:mb-0 w-64">
            <div className="text-black">
              <h1 className="text-2xl font-extrabold">
                {companyCount.company_mou_count}
              </h1>
              <span className="text-sm">Telah Mou</span>
            </div>
            <BookOpen className="w-10 h-10  text-yellow-400" />
          </div>
        </div>
        <div>
          <div className="relative flex-1 bg-white rounded-2xl">
            <input
              type="text"
              onChange={(e) => setInputSearch(e.target.value)}
              value={inputSearch}
              placeholder="Cari Sekolah..."
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

      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as ActiveTab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ${
              activeTab === tab
                ? "bg-accent text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-black">
        {perusahaan.length !== 0 ? (
          perusahaan.map((data, index) => (
            <div
              className="relative bg-white flex flex-col md:flex-row space-x-5 p-6 px-10 md:px-5 rounded-2xl justify-between items-end md:items-center 
              overflow-hidden"
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

                <div className="ms-3">
                  <h5 className="text-accent font-bold">{data.name}</h5>
                  <span className="flex">
                    <MapPin /> {data.city_regency}, {data.province}
                  </span>
                </div>
              </div>

              <Link
                href={`/dashboard/sekolah/${data.id}`}
                className="bg-accent/10 flex justify-between items-center p-1 px-2 space-x-2 rounded-full cursor-pointer hover:bg-accent/20 transition"
              >
                <span>Detail</span>
                <CircleArrowRight className="w-4 h-4" />
              </Link>

              {/* Tombol pojok kanan atas */}
              {data.mou && (
                <h4 className="absolute text-sm top-0 right-0 bg-accent text-white px-3 py-1 rounded-bl-2xl">
                  Sudah Mou
                </h4>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 text-center text-gray-500">
            Tidak ada Sekolah yang ditemukan.
          </div>
        )}
      </div>
    </main>
  );
};
export default SekolahPage;
