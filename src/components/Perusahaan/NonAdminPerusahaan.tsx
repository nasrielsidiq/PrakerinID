"use client";
import {
  Building,
  CircleArrowRight,
  MapPin,
  Search,
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
import { API, ENDPOINTS } from "../../../utils/config";

interface Perusahaan {
  id: string;
  photo_profile?: string | null;
  name: string;
  city_regency: string;
  province: string;
  mou: boolean;
}

interface CompanyCount {
  company_count: number;
  mou_count: number;
}

interface Pages {
  activePages: number;
  pages: number;
}

type ActiveTab = "Semua" | "Sudah Kerja Sama" | "Belum Kerja Sama";

const NonadminPerusahaan: React.FC = () => {
  const router = useRouter();
  const [inputSearch, setInputSearch] = useState<string>("");
  const debouncedQuery = useDebounce(inputSearch, 1000);
  const [perusahaan, setPerushaan] = useState<Perusahaan[]>([]);
  const tabs: ActiveTab[] = ["Semua", "Sudah Kerja Sama", "Belum Kerja Sama"];
  const [activeTab, setActiveTab] = useState<ActiveTab>("Semua");
  const [companyCount, setCompanyCount] = useState<CompanyCount>({
    company_count: 0,
    mou_count: 0,
  });
  const [pages, setPages] = useState<Pages>({
    activePages: 1,
    pages: 1,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCompany = async (selectedPages = pages.activePages) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await API.get(ENDPOINTS.USERS, {
        params: {
          search: inputSearch,
          role: "company",
          page: selectedPages,
          limit: 6,
          is_mou:
            activeTab === "Semua"
              ? undefined
              : activeTab === "Sudah Kerja Sama"
              ? true
              : false,
        },
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });

      console.log("Company fetched successfully:", response.data);
      const data = response.data.data.map((item: any) => ({
        id: item.id,
        photo_profile: item.photo_profile,
        name: item.company.name,
        city_regency: item.city_regency.name,
        province: item.province.name,
        mou: item.mou,
      }));
      setPerushaan(data);
      setPages({
        activePages: selectedPages,
        pages: response.data.last_page,
      });
    } catch (error) {
      console.error("Error fetching company:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyCount = async () => {
    try {
      const response = await API.get(`${ENDPOINTS.USERS}/count`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });
      console.log("Company Count fetched successfully:", response.data.data);
      setCompanyCount(response.data.data);
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

    fetchCompany(pages.activePages);
  }, [debouncedQuery, activeTab, pages.activePages]);

  useEffect(() => {
    fetchCompanyCount();
  }, []);

  const handleChangePage = (selectedPage: number) => {
    setPages((prev) => ({
      ...prev,
      activePages: selectedPage,
    }));
  };

  return (
    <>
      <div className="lg:flex lg:justify-between items-end mb-5">
        <div className="flex gap-4">
          <div className="bg-white p-3 rounded-2xl flex items-center justify-between space-x-5 px-5 mb-5 lg:mb-0 w-64">
            <div className="text-black">
              <h1 className="text-2xl font-extrabold">
                {companyCount.company_count}
              </h1>
              <span className="text-sm">Total Perusahaan</span>
            </div>
            <Building className="w-10 h-10  text-accent" />
          </div>
          <div className="bg-white p-3 rounded-2xl flex items-center justify-between space-x-5 px-5 mb-5 lg:mb-0 w-64">
            <div className="text-black">
              <h1 className="text-2xl font-extrabold">
                {companyCount.mou_count}
              </h1>
              <span className="text-sm">Telah Kerja Sama</span>
            </div>
            <Building className="w-10 h-10  text-yellow-400" />
          </div>
        </div>
        <div>
          <div className="relative flex-1 bg-white rounded-2xl">
            <input
              type="text"
              onChange={(e) => setInputSearch(e.target.value)}
              value={inputSearch}
              placeholder="Cari perusahaan..."
              className="text-gray-600 w-full px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-prakerin focus:border-transparent transition-all duration-300"
            />
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <TabsCompenent
          data={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-black ">
        {perusahaan && loading !== true ? (
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

              <button
                onClick={() => router.push(`perusahaan/${data.id}`)}
                className="bg-accent/10 flex justify-between items-center p-1 px-2 space-x-2 rounded-full cursor-pointer hover:bg-accent/20 transition"
              >
                <span>Detail</span>
                <CircleArrowRight className="w-4 h-4" />
              </button>

              {/* Tombol pojok kanan atas */}
              {data.mou && (
                <h4 className="absolute text-sm top-0 right-0 bg-accent text-white px-3 py-1 rounded-bl-2xl">
                  Sudah Kerja Sama
                </h4>
              )}
            </div>
          ))
        ) : (
          <div className="md:col-span-2">
            <LoaderData />
          </div>
        )}
        {perusahaan.length === 0 && loading !== true && (
          <div className="text-center py-12 col-span-2 ">
            <NotFoundComponent text="Tidak ada perusahaan yang ditemukan." />
          </div>
        )}
      </div>
      <PaginationComponent
        activePage={pages.activePages}
        totalPages={pages.pages}
        onPageChange={handleChangePage}
        loading={loading}
      />
    </>
  );
};
export default NonadminPerusahaan;
