"use client";

import {
  Bookmark,
  BriefcaseBusiness,
  Lock,
  MapPin,
  MessageCircle,
  UserCircle,
  Users,
  Clock,
  Calendar,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../../../utils/config";
import Cookies from "js-cookie";
import RenderBlocks from "@/components/RenderBlocks";
import Image from "next/image";
import { getDurationUnit } from "@/utils/getDurationUnit";

interface JobOpening {
  title: string;
  description: any;
  grade: string;
  location: string;
  qouta: number;
  type: string;
  company: {
    name: string;
  };
  city_regency: {
    name: string;
  };
  province: {
    name: string;
  };
  save_job_opening: boolean;
  user: {
    photo_profile: string;
  };
  duration: {
    duration_unit: string;
    duration_value: number;
  };
  field: {
    name: string;
  };
}

const DetailLowongan = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const [authorization, setAuthorization] = useState<string>("");
  const [jobOpening, setJobOpening] = useState<JobOpening>({
    title: "",
    description: "",
    grade: "",
    location: "",
    qouta: 0,
    type: "",
    company: {
      name: "",
    },
    city_regency: {
      name: "",
    },
    province: {
      name: "",
    },
    save_job_opening: false,
    user: {
      photo_profile: "",
    },
    field: {
      name: "",
    },
    duration: {
      duration_unit: "",
      duration_value: 0,
    },
  });

  const fetchJobOpening = async () => {
    try {
      console.log(id);
      const response = await API.get(`${ENDPOINTS.JOB_OPENINGS}/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });
      if (response.status === 200) {
        console.log("Job Opening:", response.data.data);
        setJobOpening(response.data.data);
      }
    } catch (error: any) {
      console.error("Error fetching job opening:", error);
    }
  };

  const handleClickFavorite = async (id: string) => {
    try {
      const response = await API.post(
        `${ENDPOINTS.SAVE_JOB_OPENINGS}`,
        {
          job_opening_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        setJobOpening((prevJob) => ({
          ...prevJob,
          save_job_opening: !prevJob.save_job_opening,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobOpening();
    setAuthorization(Cookies.get("authorization") as string);
  }, []);

  const getLocation = (
    location: "onsite" | "remote" | "hybrid" | "field"
  ): string => {
    switch (location) {
      case "onsite":
        return "Kerja di kantor (Onsite/WFO)";
      case "remote":
        return "Kerja di jarak jauh (Remote/WFH)";
      case "hybrid":
        return "Hibrida (Hybrid)";
      case "field":
        return "Kerja lapangan (Field Work)";
      default:
        return "";
    }
  };

  const getType = (type: "full_time" | "part_time"): string => {
    switch (type) {
      case "full_time":
        return "Penuh Waktu (Full-time)";
      case "part_time":
        return "Paruh Waktu (Part-time)";
      default:
        return "";
    }
  };

  const getGrade = (grade: "smk" | "mahasiswa" | "all"): string => {
    switch (grade) {
      case "smk":
        return "SMK";
      case "mahasiswa":
        return "Mahasiswa";
      case "all":
        return "Semua";
      default:
        return "";
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-accent-dark text-sm mb-5">
        <Link
          className="hover:underline hover:text-accent"
          href={"/dashboard/lowongan"}
        >
          Lowongan
        </Link>{" "}
        -&gt; Detail Lowongan
      </h1>
      <div className="mb-8">
        <div className="flex items-center space-x-2 font-extrabold text-accent">
          <BriefcaseBusiness className="w-5 h-5" />
          <h2 className="text-2xl mt-2">Detail Lowongan</h2>
        </div>
      </div>
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
            <div className="flex items-start gap-4">
              {/* Company Logo */}
              <div className="flex-shrink-0">
                {jobOpening.user.photo_profile ? (
                  <div className="w-16 h-16 relative rounded-full border-white border">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/storage/photo-profile/${jobOpening.user.photo_profile}`}
                      alt="Logo Perusahaan"
                      fill
                      sizes="100%"
                      className="object-cover rounded-full"
                    />
                  </div>
                ) : (
                  <UserCircle className="w-16 h-16 text-[var(--color-accent)]" />
                )}
              </div>

              {/* Job Info */}
              <div className="flex-1 min-w-0">
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
                  {jobOpening.title}
                </h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-blue-600 font-medium">
                    {jobOpening.company.name}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">
                    {jobOpening.city_regency.name}, {jobOpening.province.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
              {authorization === "student" ? (
                <>
                  <button className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat Perusahaan</span>
                    <Lock className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleClickFavorite(id)}
                    className="flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 px-4 py-2 border border-gray-300 hover:border-blue-300 rounded-lg font-medium transition-colors cursor-pointer"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        jobOpening.save_job_opening
                          ? "text-blue-500"
                          : "text-gray-400"
                      }`}
                      fill={
                        jobOpening.save_job_opening ? "currentColor" : "none"
                      }
                    />
                    <span>
                      {jobOpening.save_job_opening ? "Tersimpan" : "Simpan"}
                    </span>
                  </button>

                  <Link
                    href={`${id}/apply`}
                    className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Lamar Sekarang
                  </Link>
                </>
              ) : (
                <Link
                  href={`/dashboard/lowongan/${id}/ubah`}
                  className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Ubah Lowongan
                </Link>
              )}
            </div>
          </div>

          {/* Info Lowongan Section */}
          <div className="bg-white py-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Informasi Lowongan
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {/* Tingkat Pendidikan */}
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
                <GraduationCap className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="text-gray-500">Tingkat Pendidikan</p>
                  <p className="font-medium text-gray-900">
                    {getGrade(jobOpening.grade as "smk" | "mahasiswa" | "all")}
                  </p>
                </div>
              </div>

              {/* Lokasi Magang */}
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="text-gray-500">Lokasi Magang</p>
                  <p className="font-medium text-gray-900">
                    {getLocation(
                      jobOpening.location as
                        | "onsite"
                        | "remote"
                        | "hybrid"
                        | "field"
                    )}
                  </p>
                </div>
              </div>

              {/* Kuota Magang */}
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
                <Users className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="text-gray-500">Kuota Magang</p>
                  <p className="font-medium text-gray-900">
                    {jobOpening.qouta} Orang
                  </p>
                </div>
              </div>

              {/* Jenis Magang */}
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
                <Clock className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="text-gray-500">Jenis Magang</p>
                  <p className="font-medium text-gray-900">
                    {getType(jobOpening.type as "full_time" | "part_time")}
                  </p>
                </div>
              </div>

              {/* Bidang Magang */}
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
                <BriefcaseBusiness className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="text-gray-500">Bidang Magang</p>
                  <p className="font-medium text-gray-900">
                    {jobOpening.field.name}
                  </p>
                </div>
              </div>

              {/* Durasi Magang */}
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
                <Calendar className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="text-gray-500">Durasi Magang</p>
                  <p className="font-medium text-gray-900">
                    {jobOpening.duration.duration_value}{" "}
                    {getDurationUnit(jobOpening.duration.duration_unit)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area - Placeholder for job description */}
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Deskripsi
          </h3>
          <div className="text-gray-600">
            <RenderBlocks data={jobOpening.description} />
          </div>
        </div>
      </div>
    </main>
  );
};
export default DetailLowongan;
