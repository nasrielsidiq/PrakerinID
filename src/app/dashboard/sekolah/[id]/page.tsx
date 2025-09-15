"use client";

import {
  ArrowRight,
  BookOpen,
  Building,
  FileText,
  Globe,
  Lock,
  MapPin,
  UserCircle,
} from "lucide-react";
import { use, useEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../../../utils/config";
import Cookies from "js-cookie";
import { timeAgo } from "@/utils/timeAgo";
import Link from "next/link";
import Image from "next/image";

interface Company {
  photo_profile?: string | null;
  school: {
    name: string;
    desctription: string | null;
  };
  city_regency: {
    name: string;
  };
  province: {
    name: string;
  };
  job_openings: {
    id: string;
    title: string;
    updated_at: string;
  }[];
}

const DetailSekolahPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [authorization, setAuthorization] = useState<string>();
  const [company, setCompany] = useState<Company>({
    school: {
      name: "",
      desctription: null,
    },
    city_regency: {
      name: "",
    },
    province: {
      name: "",
    },
    job_openings: [],
  });

  const fetchCompanyDetail = async () => {
    try {
      const response = await API.get(`${ENDPOINTS.USERS}/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });

      if (response.status === 200) {
        console.log("Company Detail:", response.data.data);
        setCompany(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching company details:", error);
    }
  };

  useEffect(() => {
    console.log("Id:", id);
    setAuthorization(Cookies.get("authorization"));
    fetchCompanyDetail();
  }, []);
  return (
    <main className="p-6">
      <h1 className="text-accent-dark text-sm mb-5">
        <Link
          className="hover:underline hover:text-accent"
          href={"/dashboard/sekolah/"}
        >
          Sekolah
        </Link>{" "}
        -&gt; Detail Sekolah
      </h1>
      <div className="mb-8">
        <div className="flex items-center space-x-2 font-extrabold text-accent">
          <BookOpen className="w-5 h-5" />
          <h2 className="text-2xl mt-2">Detail Sekolah</h2>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col items-end lg:flex-row lg:items-start lg:justify-between gap-4 pb-5 mb-5 border-b-1 border-gray-200">
          <div className="flex items-start space-x-4">
            {company.photo_profile ? (
              <div className="w-16 h-16 relative rounded-full border-white border">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/photo-profile/${company.photo_profile}`}
                  alt="Logo Perusahaan"
                  fill
                  sizes="100%"
                  className="object-cover rounded-full"
                />
              </div>
            ) : (
              <UserCircle className="w-16 h-16 text-[var(--color-accent)]" />
            )}
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {company.school.name}
              </h2>
              <div className="flex items-center space-x-2 text-gray-600 mb-1">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">
                  {/* {company.city_regency.name}, {company.province.name} */}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Globe className="w-4 h-4 flex-shrink-0" />
                <a
                  href="http://makerindo.co.id"
                  className="text-sm text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  makerindo.co.id
                </a>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/dashboard/sekolah/${id}/chat`}
              className="bg-vip text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 whitespace-nowrap cursor-pointer"
            >
              <span className="">Chat Sekolah</span>
              <Lock className="w-4" />
            </Link>
            {authorization === "company" && (
              <Link
                href={`/dashboard/sekolah/${id}/mou`}
                className="bg-accent text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 whitespace-nowrap cursor-pointer"
              >
                <span className="">Ajukan Mou</span>
                <FileText className="w-4" />
              </Link>
            )}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Deskripsi</h3>
        <div className="text-gray-700 text-sm leading-relaxed space-y-3 mb-5">
          <p>
            PT Makerindo Cipta Solusi adalah perusahaan teknologi yang bergerak
            di bidang pengembangan solusi digital dan rekayasa perangkat keras
            untuk mendukung transformasi industri 4.0 di Indonesia. Berdiri
            sejak tahun [Tahun Berdiri], kami berkomitmen untuk menghadirkan
            inovasi terdepan yang mampu menjawab tantangan zaman dengan semangat
            tumbuh bersama klien.
          </p>
          <p>
            Dengan spesialisasi pada pengembangan sistem IoT (Internet of
            Things), otomasi industri, serta solusi perangkat lunak kustom, PT
            Makerindo Cipta Solusi telah menjadi mitra terpercaya bagi berbagai
            sektor, termasuk manufaktur, agrikultur, pendidikan, dan
            pemerintahan selama bertahun-tahun.
          </p>
          <p>
            Kami percaya bahwa teknologi bukan hanya alat, tetapi juga jembatan
            untuk menciptakan efisiensi, transparansi, dan pertumbuhan
            berkelanjutan. Oleh karena itu, setiap solusi yang kami kembangkan
            selalu berorientasi pada kebutuhan klien dan kemajuan teknologi
            terkini.
          </p>
        </div>
      </div>
    </main>
  );
};

export default DetailSekolahPage;
