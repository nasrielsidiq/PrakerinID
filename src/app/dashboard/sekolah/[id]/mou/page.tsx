"use client";

import { BookOpen, Briefcase, Building, Send } from "lucide-react";
import { use, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { timeAgo } from "@/utils/timeAgo";
import Link from "next/link";
import Image from "next/image";
import { API, ENDPOINTS } from "../../../../../../utils/config";
import { alertConfirm } from "@/libs/alert";
import dynamic from "next/dynamic";
import { EditorProps } from "@/components/Editor";
import { useRouter } from "next/navigation";

const Editor = dynamic<EditorProps>(() => import("@/components/Editor"), {
  ssr: false,
});

interface Company {
  photo_profile?: string | null;
  company: {
    name: string;
    description: string | null;
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

const DetailPerusahaanPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);
  const route = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [company, setCompany] = useState<Company>({
    company: {
      name: "",
      description: null,
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

  const handleEditorChange = (data: any) => {
    // setFormData((prev) => ({
    //   ...prev,
    //   description: data,
    // }));
  };

  useEffect(() => {
    console.log("Id:", id);
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
        -&gt;{" "}
        <Link
          className="hover:underline hover:text-accent"
          href={`/dashboard/sekolah/${id}`}
        >
          Detail Sekolah
        </Link>{" "}
        -&gt; Pengajuan MOU
      </h1>
      <div className="mb-8">
        <div className="flex items-center space-x-2 font-extrabold text-accent">
          <BookOpen className="w-5 h-5" />
          <h2 className="text-2xl mt-2">Pengajuan MOU</h2>
        </div>
      </div>

      {/* Form Card */}
      <form
        // onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm p-6 m-auto my-10 max-w-4xl"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gray-200 p-2 rounded-full w-10 h-10 my-auto">
            <BookOpen className="text-accent" size={24} />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800">Ajukan MOU</h2>
            <p className="text-gray-400">
              Silahkan isi semua informasi yang dibutuhkan
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-gray-600">
          {/* Nama Lowongan */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload File
            </label>
            <input
              type="file"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Masukkan judul lowongan"
              //   value={formData.title}
              //   onChange={(e) =>
              // setFormData({ ...formData, title: e.target.value })
              //   }
            />
          </div>

          {/* Pesan */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pesan
            </label>
            <Editor onChange={handleEditorChange} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-end">
          <Link
            href={`/dashboard/sekolah/${id}`}
            onClick={async (e) => {
              e.preventDefault();
              const isConfirm = await alertConfirm(
                "Apakah anda yakin ingin membatalkan!"
              );
              if (isConfirm) {
                route.push(`/dashboard/sekolah/${id}`);
              }
            }}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Batal
          </Link>
          <button
            type="submit"
            className="px-6 py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-colors cursor-pointer"
          >
            {isSubmitting ? "Mengirim..." : "Kirim"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default DetailPerusahaanPage;
