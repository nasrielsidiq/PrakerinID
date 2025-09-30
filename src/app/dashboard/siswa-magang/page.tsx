"use client";
import { MapPin, UserCircle, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import SiswaLowongan from "@/components/roleComponents/SiswaLowongan";
import { IndustryLowongan } from "@/components/roleComponents/IndustryLowongan";
import Link from "next/link";
import { API, ENDPOINTS } from "../../../../utils/config";
import { useRouter } from "next/navigation";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import Image from "next/image";
import { timeAgo } from "@/utils/timeAgo";
import NotFoundComponent from "@/components/NotFoundComponent";
import PaginationComponent from "@/components/PaginationComponent";
import { Pages } from "@/models/pagination";

interface Lowongan {
  title: string;
  icon: File | null;
  name: string;
  kota: string;
  provinsi: string;
  time: Timestamp | null | number;
}

interface JobOpening {
  id: string;
  title: string;
  company: {
    name: string;
  };
  city_regency: {
    name: string;
  };
  province: {
    name: string;
  };
  is_paid: boolean;
  updated_at: string;
  save_job_opening: boolean;
  user: {
    photo_profile: string;
  };
}

interface StudentIntership {
  id: string;
  email: string;
  phone_number: string | null;
  photo_profile: string | null;
  student: {
    name: string;
  };
  school: {
    name: string;
  };
  internship: {
    role: string;
  };
}

const SiswMagangPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<Pages>({
    activePages: 1,
    pages: 1,
  });
  const [data, setData] = useState<StudentIntership[]>([]);

  const fetchData = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await API.get(ENDPOINTS.USERS, {
        params: {
          page: page.activePages,
          limit: 10,
          role: "student",
        },
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });
      console.log(response.data.data);
      setPage({ ...page, pages: response.data.last_page });
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (selectedPage: number) => {
    setPage((prev) => ({
      ...prev,
      activePage: selectedPage,
    }));
  };

  useEffect(() => {
    fetchData();
  }, [page.activePages]);

  return (
    <main className=" p-6">
      <h1 className="text-accent-dark text-sm mb-5">Siswa Magang</h1>
      <div className="flex items-center  space-x-2 font-extrabold text-accent">
        <UsersRound className="w-5 h-5" />
        <h2 className="text-2xl mt-2">Siswa Magang</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {data.length !== 0 ? (
          <>
            {data.map((item) => (
              <Link
                href={`/dashboard/siswa-magang/${item.id}`}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                key={item.id}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    {item.photo_profile ? (
                      <div className="w-15 h-15 relative rounded-full border-white border">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}/storage/photo-profile/${item.photo_profile}`}
                          alt="Logo Perusahaan"
                          fill
                          sizes="100%"
                          className="object-cover rounded-full"
                        />
                      </div>
                    ) : (
                      <UserCircle className="w-15 h-15 text-[var(--color-accent)]" />
                    )}
                    <div className="flex-col flex gap-1">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {item.student.name}
                        </h4>
                        <h5 className="text-gray-700">
                          {item.internship.role ?? "Belum memiliki bidang"}
                        </h5>
                      </div>
                      <p className="text-sm text-gray-500">
                        Kontak : {item.email} | {item.phone_number ?? "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <div className="lg:col-span-2">
              <PaginationComponent
                activePage={page.activePages}
                loading={isLoading}
                onPageChange={handlePageChange}
                totalPages={page.pages}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-12 col-span-2 ">
            <NotFoundComponent text="Anda belum memiliki siswa magang." />
          </div>
        )}
      </div>
    </main>
  );
};
export default SiswMagangPage;
