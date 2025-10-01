"use client";
import dynamic from "next/dynamic";
import { Briefcase, BriefcaseBusiness, CirclePlus, Trash } from "lucide-react";
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

interface Test {
  id: string;
  title: string;
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
  tests: string[];
  start_date: Date;
  closing_date: Date;
}

type type = "part_time" | "full_time" | "";
type location = "onsite" | "remote" | "hybrid" | "field" | "";
type grade = "all" | "smk" | "mahasiswa" | "";

const tambahLowonganPage: React.FC = () => {
  const route = useRouter();
  const [durations, setDurations] = useState<Duration[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [tests, setTests] = useState<Test[]>([]);

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
    tests: [],
    start_date: new Date(),
    closing_date: new Date(),
  });

  const formatDateTime = (date: Date) => {
    // Pastikan date adalah objek Date
    const pad = (n: number) => n.toString().padStart(2, "0");
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      " " +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds())
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      formData.is_available = formData.is_available === "true" ? true : false;
      formData.is_paid = formData.is_paid === "true" ? true : false;

      // Format tanggal sebelum dikirim
      const payload = {
        ...formData,
        start_date: formatDateTime(new Date(formData.start_date)),
        closing_date: formatDateTime(new Date(formData.closing_date)),
      };

      await API.post(ENDPOINTS.JOB_OPENINGS, payload, {
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

  const fetchData = async () => {
    try {
      const durations = API.get(ENDPOINTS.DURATIONS);

      const fields = API.get(ENDPOINTS.FIELDS);

      const tests = API.get(ENDPOINTS.TESTS, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });

      const response = await Promise.all([durations, fields, tests]);

      setDurations(response[0].data.data);
      setFields(response[1].data.data);
      setTests(response[2].data.data);
    } catch (error) {
      console.error("Error fetching durations:", error);
    }
  };

  const handleChangeQuota = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 1 || Number(e.target.value) > 50) {
      return;
    }
    setFormData({ ...formData, quota: Number(e.target.value) });
  };

  const handleChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    // Set jam ke 00:00:00 agar hanya membandingkan tanggal
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      // alertError("Tanggal mulai tidak boleh kurang dari hari ini!");
      return;
    }
    setFormData({ ...formData, start_date: selectedDate });
  };

  const handleChangeCloseDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    // Set jam ke 00:00:00 agar hanya membandingkan tanggal
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      // alertError("Tanggal mulai tidak boleh kurang dari hari ini!");
      return;
    }
    setFormData({ ...formData, closing_date: selectedDate });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTest = () => {
    setFormData((prev) => ({
      ...prev,
      tests: [...prev.tests, ""], // tambah satu select kosong
    }));
  };

  const handleRemoveTest = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tests: prev.tests.filter((_, i) => i !== index),
    }));
  };

  const handleTestChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newTests = [...prev.tests];
      newTests[index] = value;
      return { ...prev, tests: newTests };
    });
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
        -&gt; Tambah Lowongan
      </h1>
      <div className="flex items-center  space-x-2 font-extrabold text-accent">
        <BriefcaseBusiness className="w-5 h-5" />
        <h2 className="text-2xl mt-2">Lowongan Magang</h2>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm p-6 m-auto my-10 max-w-4xl"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gray-200 p-2 rounded-full w-10 h-10 my-auto">
            <Briefcase className="text-accent" size={24} />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800">
              Tambah Lowongan
            </h2>
            <p className="text-gray-400">
              Silahkan isi semua informasi yang dibutuhkan
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-gray-600">
          {/* Nama Lowongan */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Lowongan
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Masukkan judul lowongan"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Jenis Magang */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Magang
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value as type })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="">Pilih jenis magang</option>
              <option value="part_time">Paruh Waktu (Part-time)</option>
              <option value="full_time">Penuh Waktu (Full-time)</option>
            </select>
          </div>

          {/* Lokasi Magang */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lokasi Magang
            </label>
            <select
              value={formData.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: e.target.value as location,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="">Pilih lokasi magang</option>
              <option value="onsite">Kerja di kantor (Onsite/WFO)</option>
              <option value="remote">Kerja jarak jauh (Remote/WFH)</option>
              <option value="hybrid">Hibrida (Hybrid)</option>
            </select>
          </div>

          {/* Tingkat Pendidikan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tingkat Pendidikan
            </label>
            <select
              value={formData.grade}
              onChange={(e) =>
                setFormData({ ...formData, grade: e.target.value as grade })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="">Pilih tingkat pendidikan</option>
              <option value="all">Semua</option>
              <option value="smk">SMK</option>
              <option value="mahasiswa">Mahasiswa</option>
            </select>
          </div>

          {/* Status Magang */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status Magang
            </label>
            <select
              value={formData.is_paid as string}
              onChange={(e) =>
                setFormData({ ...formData, is_paid: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="">Pilih status magang</option>
              <option value="true">Dibayar (Paid)</option>
              <option value="false">Tidak dibayar (Unpaid)</option>
            </select>
          </div>

          {/* Kuota Magang */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kuota Magang
            </label>
            <input
              type="number"
              value={formData.quota}
              onChange={handleChangeQuota}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          {/* Status Ketersediaan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apakah masih tersedia?
            </label>
            <select
              value={formData.is_available as string}
              onChange={(e) =>
                setFormData({ ...formData, is_available: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="true">Tersedia</option>
              <option value="false">Tidak Tersedia</option>
            </select>
          </div>

          {/* Field Magang */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bidang Magang
            </label>
            <select
              value={formData.field_id}
              onChange={(e) =>
                setFormData({ ...formData, field_id: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="">Pilih bidang magang</option>
              {fields.map((field) => (
                <option key={field.id} value={field.id}>
                  {field.name}
                </option>
              ))}
            </select>
          </div>

          {/* Durasi Magang */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durasi Magang
            </label>
            <select
              value={formData.duration_id}
              onChange={(e) =>
                setFormData({ ...formData, duration_id: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="">Pilih durasi magang</option>
              {durations.map((duration) => (
                <option key={duration.id} value={duration.id}>
                  {duration.duration_value}{" "}
                  {getDurationUnit(duration.duration_unit)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Waktu Mulai
            </label>
            <input
              type="date"
              value={
                formData.start_date
                  ? new Date(formData.start_date).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChangeStartDate}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batas Akhir Mendaftar
            </label>
            <input
              type="date"
              value={
                formData.closing_date
                  ? new Date(formData.closing_date).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChangeCloseDate}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          <div className="col-span-2">
            <span className="py-5">Pilih Tes</span>
            <div className="flex flex-col space-y-3 py-5">
              {formData.tests.map((selectedTest, index) => (
                <div className="flex" key={index}>
                  <select
                    value={selectedTest}
                    onChange={(e) => handleTestChange(index, e.target.value)}
                    className="w-5/6 me-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  >
                    <option value="">Pilih tes</option>
                    {tests.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="p-1 px-3 bg-red-500 rounded text-white hove:bg-red-600 cursor-pointer flex items-center gap-2"
                    onClick={() => handleRemoveTest(index)}
                  >
                    <span>
                      <Trash className="text-white" />
                    </span>
                    <span>Hapus Tes</span>
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="p-2 bg-green-500 my-3 rounded text-white hover:bg-green-600 cursor-pointer flex items-center gap-2"
              onClick={handleAddTest}
            >
              <span>
                <CirclePlus className="text-white" />
              </span>
              <span>Tambah Tes</span>
            </button>
          </div>

          {/* Deskripsi */}
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
