"use client";
import dynamic from "next/dynamic";
import { Briefcase, BriefcaseBusiness, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EditorProps } from "@/components/Editor";
import { API, ENDPOINTS } from "../../../../../utils/config";
import { getDurationUnit } from "@/utils/getDurationUnit";
import Cookies from "js-cookie";
import { alertConfirm, alertError, alertSuccess } from "@/libs/alert";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Select from "react-select";

const Editor = dynamic<EditorProps & { error?: string }>(
  () => import("@/components/Editor"),
  {
    ssr: false,
  }
);

interface Duration {
  id: string;
  duration_value: number;
  duration_unit: string;
}

interface Field {
  id: string;
  name: string;
}

interface CreateJobOpening {
  title: string;
  type: type;
  location: location;
  grade: grade;
  is_paid: string | boolean;
  quota: number;
  is_available: string | boolean;
  field_id: string;
  duration_id: string;
  description: any;
}

type type = "part_time" | "full_time" | "";
type location = "onsite" | "remote" | "hybrid" | "field" | "";
type grade = "all" | "smk" | "mahasiswa" | "";

const tambahLowonganPage: React.FC = () => {
  const route = useRouter();
  const [durations, setDurations] = useState<Duration[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState<CreateJobOpening>({
    title: "",
    type: "",
    location: "",
    grade: "",
    is_paid: "",
    quota: 1,
    is_available: "true",
    field_id: "",
    duration_id: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    try {
      setIsSubmitting(true);
      formData.is_available = Boolean(formData.is_available);
      formData.is_paid =
        formData.is_paid !== "" ? Boolean(formData.is_paid) : formData.is_paid;

      await API.post(ENDPOINTS.JOB_OPENINGS, formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });

      await alertSuccess("Lowongan berhasil ditambahkan!");

      route.replace("/dashboard/lowongan");
    } catch (error: AxiosError | unknown) {
      await alertError("Gagal menambahkan lowongan!");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleEditorChange = (data: any) => {
    setFormData((prev) => ({
      ...prev,
      description: data,
    }));
  };

  const fetchDurations = async () => {
    try {
      const response = await API.get(ENDPOINTS.DURATIONS);
      console.log("Durations fetched:", response.data.data);
      setDurations(response.data.data);
    } catch (error) {
      console.error("Error fetching durations:", error);
    }
  };

  const fetchFields = async () => {
    try {
      const response = await API.get(ENDPOINTS.FIELDS);
      console.log("Fields fetched:", response.data.data);
      setFields(response.data.data);
    } catch (error) {
      console.error("Error fetching fields:", error);
    }
  };

  const handleChangeQuota = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 1 || Number(e.target.value) > 50) {
      return;
    }
    setFormData({ ...formData, quota: Number(e.target.value) });
  };

  useEffect(() => {
    Promise.all([fetchDurations(), fetchFields()]);
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-accent-dark text-sm mb-5">
        <Link
          className="hover:underline hover:text-accent"
          href={"/dashboard/tes"}
        >
          Tes
        </Link>{" "}
        -&gt; Tambah Tes
      </h1>
      <div className="flex items-center  space-x-2 font-extrabold text-accent">
        <HelpCircle className="w-5 h-5" />
        <h2 className="text-2xl mt-2">Tes</h2>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm p-6 m-auto my-10 max-w-4xl"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gray-200 p-2 rounded-full w-10 h-10 my-auto">
            <HelpCircle className="text-accent" size={24} />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800">Tambah Tes</h2>
            <p className="text-gray-400">
              Silahkan isi semua informasi yang dibutuhkan
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-gray-600">
          {/* Nama tes */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Tes
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Masukkan judul tes"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Link tes */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link Tes
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Masukkan link tes"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Deskripsi Tes */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi
            </label>
            <Editor onChange={handleEditorChange} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-end">
          <Link
            href="/dashboard/lowongan"
            onClick={async (e) => {
              e.preventDefault();
              const isConfirm = await alertConfirm(
                "Apakah anda yakin ingin membatalkan!"
              );
              if (isConfirm) {
                route.push("/dashboard/lowongan");
              }
            }}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-accent text-white rounded-md hover:bg-accent-hover transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default tambahLowonganPage;
