"use client";
import {
  BookOpen,
  Building,
  CalendarClock,
  CalendarDays,
  Globe,
  Handshake,
  Lock,
  MapPin,
  UserCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { API, ENDPOINTS } from "../../../../../utils/config";
import RenderBlocks from "@/components/RenderBlocks";
import Image from "next/image";

interface KerjaSama {
  start_date: string;
  end_date: string;
  status: TypeStatus;
  file: string;
  is_company_accepted: boolean;
  is_school_accepted: boolean;
  message: any;
  user: {
    photo_profile: string;
  };
  province: {
    name: string;
  };
  city_regency: {
    name: string;
  };
  company?: {
    id: string;
    name: string;
    website: string;
  };
  school?: {
    id: string;
    name: string;
    website: string;
  };
}

type TypeStatus = "pending" | "accepted" | "rejected" | "";

const lamaranPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [authorization, setAuthorization] = useState<string>();
  const [data, setData] = useState<KerjaSama>({
    start_date: "",
    end_date: "",
    status: "",
    file: "",
    is_company_accepted: false,
    is_school_accepted: false,
    message: "",
    user: {
      photo_profile: "",
    },
    province: {
      name: "",
    },
    city_regency: {
      name: "",
    },
  });

  const fetchData = async () => {
    try {
      const mou = API.get(`${ENDPOINTS.MOUS}/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });
      const preview = API.get(`${ENDPOINTS.MOUS}/${id}/preview`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
        responseType: "blob", // penting!
      });

      const response = await Promise.all([mou, preview]);

      console.log("Imunisasi", response);
      setData(response[0].data.data);

      const fileBlob = new Blob([response[1].data], {
        type: "application/pdf",
      });
      const fileUrl = URL.createObjectURL(fileBlob);

      setPreviewUrl(fileUrl); // ini nanti dipakai di <embed>
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setAuthorization(Cookies.get("authorization"));
    fetchData();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-accent-dark text-sm mb-5">
        <Link
          className="hover:underline hover:text-accent"
          href={"/dashboard/mou"}
        >
          Kerja Sama
        </Link>{" "}
        -&gt; Detail Kerja Sama
      </h1>
      <div className="flex items-center mb-8  space-x-2 font-extrabold text-accent">
        <Handshake className="w-5 h-5" />
        <h2 className="text-2xl mt-2">Detail Kerja Sama</h2>
      </div>

      {/* Description Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col items-end lg:flex-row lg:items-start lg:justify-between gap-4 pb-5 border-b-1 border-gray-200">
          <div className="flex items-start space-x-4">
            {data.user.photo_profile ? (
              <div className="w-16 h-16 relative rounded-full border-white border">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/photo-profile/${data.user.photo_profile}`}
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
                {authorization === "data"
                  ? data.school?.name
                  : data.company?.name}
              </h2>
              <div className="flex items-center space-x-2 text-gray-600 mb-1">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">
                  {data.city_regency.name ?? "-"}, {data.province.name ?? "-"}
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
                  {(authorization === "data"
                    ? data.school?.website
                    : data.company?.website) ?? "Tidak ada website"}
                </a>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/dashboard/sekolah/${id}/chat`}
              className="bg-vip text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 whitespace-nowrap cursor-pointer"
            >
              <span className="">
                Chat {authorization === "compant" ? "Sekolah" : "Perusahaan"}
              </span>
              <Lock className="w-4" />
            </Link>
            <Link
              href={`/dashboard/sekolah/${id}/mou`}
              className="bg-accent text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 whitespace-nowrap cursor-pointer"
            >
              <span className="">Terima</span>
              <Handshake className="w-4" />
            </Link>
            <Link
              href={`/dashboard/sekolah/${id}/mou`}
              className="bg-accent text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 whitespace-nowrap cursor-pointer"
            >
              <span className="">Tolak</span>
              <Handshake className="w-4" />
            </Link>
          </div>
        </div>

        {/* Info Sekolah Section */}
        <div className="bg-white py-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Informasi Kerja Sama
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {/* Alamat */}
            {data.start_date && (
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
                <CalendarDays className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="text-gray-500">Tanggal Dimulai</p>
                  <p className="font-medium text-gray-900">{data.start_date}</p>
                </div>
              </div>
            )}

            {/* NPSN */}
            {data.end_date && (
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
                <CalendarClock className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="text-gray-500">Tanggal Berakhir</p>
                  <p className="font-medium text-gray-900 ">{data.end_date}</p>
                </div>
              </div>
            )}

            {/* No Telepon */}
            <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
              <Building className="w-5 h-5 text-accent shrink-0 mt-1" />
              <div>
                <p className="text-gray-500">Status Kerja Sama</p>
                <p className="font-medium text-gray-900">
                  {data.is_company_accepted
                    ? "Perusahaan menerima kerja sama"
                    : "Perusahaan menolak kerja sama"}
                </p>
              </div>
            </div>
            {/* No Telepon */}
            <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
              <BookOpen className="w-5 h-5 text-accent shrink-0 mt-1" />
              <div>
                <p className="text-gray-500">Status Kerja Sama</p>
                <p className="font-medium text-gray-900">
                  {data.is_school_accepted
                    ? "Sekolah menerima kerja sama"
                    : "Sekolah menolak kerja sama"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-4">Deskripsi</h3>
        <div className="text-gray-700 text-sm leading-relaxed space-y-3 mb-5">
          <RenderBlocks data={data.message} />
        </div>

        {/* Content Area - Placeholder for job description */}
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Surat Kerja Sama
        </h3>
        <div className="my-6 text-gray-600">
          <div className="w-full rounded-md border">
            {/* PDF preview */}
            {previewUrl && (
              <embed
                src={previewUrl}
                type="application/pdf"
                width="100%"
                height="600px"
                className="w-full"
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
export default lamaranPage;
