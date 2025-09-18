"use client";

import {
  Award,
  BookOpen,
  FileText,
  Globe,
  Handshake,
  Hash,
  Lock,
  MapPin,
  Phone,
  Shield,
  UserCircle,
} from "lucide-react";
import { use, useEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../../../utils/config";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import RenderBlocks from "@/components/RenderBlocks";

interface SchoolDetail {
  photo_profile: string | null;
  school: {
    name: string;
    address: string;
    description: string | null;
    website: string | null;
    npsn: string | null;
    phone_number: string | null;
    status: string | null;
    accreditation: string | null;
  };
  city_regency: {
    name: string;
  };
  province: {
    name: string;
  };
}

const DetailSekolahPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [authorization, setAuthorization] = useState<string>();
  const [company, setCompany] = useState<SchoolDetail>({
    photo_profile: null,
    school: {
      name: "",
      address: "",
      description: null,
      website: null,
      npsn: null,
      phone_number: null,
      status: null,
      accreditation: null,
    },
    city_regency: {
      name: "",
    },
    province: {
      name: "",
    },
  });

  const fetchData = async () => {
    try {
      const response = await API.get(`${ENDPOINTS.USERS}/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });

      console.log(response.data.data);
      setCompany(response.data.data);
    } catch (error) {
      console.error("Error fetching company details:", error);
    }
  };

  useEffect(() => {
    setAuthorization(Cookies.get("authorization"));
    fetchData();
  }, []);

  useEffect(() => {
    console.log(company);
  }, [company]);
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
        <div className="flex flex-col items-end lg:flex-row lg:items-start lg:justify-between gap-4 pb-5 border-b-1 border-gray-200">
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
                  {company.city_regency.name ?? "-"},{" "}
                  {company.province.name ?? "-"}
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
                  {company.school.website ?? "Tidak ada website"}
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
                <span className="">Ajukan Kerja Sama</span>
                <Handshake className="w-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Info Sekolah Section */}
        <div className="bg-white py-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Informasi Sekolah
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {/* Alamat */}
            {company.school.address && (
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="text-gray-500">Alamat</p>
                  <p className="font-medium text-gray-900">
                    {company.school.address}
                  </p>
                </div>
              </div>
            )}

            {/* NPSN */}
            {company.school.npsn && (
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
                <Hash className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="text-gray-500">NPSN</p>
                  <p className="font-medium text-gray-900">
                    {company.school.npsn}
                  </p>
                </div>
              </div>
            )}

            {/* No Telepon */}
            {company.school.phone_number && (
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
                <Phone className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="text-gray-500">No Telepon</p>
                  <p className="font-medium text-gray-900">
                    {company.school.phone_number}
                  </p>
                </div>
              </div>
            )}

            {/* Status */}
            {company.school.status && (
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
                <Shield className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="text-gray-500">Status</p>
                  <p className="font-medium text-gray-900">
                    {company.school.status}
                  </p>
                </div>
              </div>
            )}

            {/* Akreditasi */}
            {company.school.accreditation && (
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
                <Award className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="text-gray-500">Akreditasi</p>
                  <p className="font-medium text-gray-900">
                    {company.school.accreditation}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-4">Deskripsi</h3>
        <div className="text-gray-700 text-sm leading-relaxed space-y-3 mb-5">
          <RenderBlocks data={company.school.description} />
        </div>
      </div>
    </main>
  );
};

export default DetailSekolahPage;
