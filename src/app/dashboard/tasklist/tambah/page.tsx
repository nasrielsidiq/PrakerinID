"use client";
import { FileText, FileTextIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { API, ENDPOINTS } from "../../../../../utils/config";
import Cookies from "js-cookie";
import { alertSuccess } from "@/libs/alert";
import Link from "next/link";

interface FormData {
  name: string;
  file: File | null;
}

const CreateTask: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    file: null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setFormData((prev) => ({ ...prev, file }));

    if (file && file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null); // pastikeun ngan PDF nu bisa dipreview
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("file", formData.file as Blob);

      const response = await API.post(ENDPOINTS.CURRICULUM_VITAE, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });

      if (response.status === 201) {
        await alertSuccess("Berhasil menambahkan CV");
        setFormData({ name: "", file: null });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", file: null });
    setPreviewUrl(null);
  };

  return (
    <main className="p-6">
      <h1 className="text-accent-dark text-sm mb-5">
        <Link
          className="hover:underline hover:text-accent"
          href={"/dashboard/tasklist"}
        >
          Task List
        </Link>{" "}
        -&gt; Tambah Task
      </h1>
      <div className="mb-8">
        <div className="flex items-center space-x-2 font-extrabold text-accent">
          <FileText className="w-5 h-5" />
          <h2 className="text-2xl">Tambah Task</h2>
        </div>
      </div>

      <form
        className="bg-white rounded-2xl space-y-6 p-6 text-black"
        onSubmit={handleSubmit}
      >
        <div className="flex space-x-5">
          <div className="bg-accent/30 p-2 rounded-full w-10 h-10 my-auto">
            <FileTextIcon />
          </div>
          <div>
            <h1 className="text-xl text-gray-800 font-extrabold">
              Tambah Task
            </h1>
            <span className="text-sm text-gray-300">
              Silahkan isi semua informasi yang dibutuhkan
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="name">Nama Magang</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded-lg pr-12 focus:ring-2 outline-none transition-colors bg-gray-200 focus:border-accent border-gray-300"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="name">Judul Task</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded-lg pr-12 focus:ring-2 outline-none transition-colors bg-gray-200 focus:border-accent border-gray-300"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="name">Deadline</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded-lg pr-12 focus:ring-2 outline-none transition-colors bg-gray-200 focus:border-accent border-gray-300"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="name">Deskripsi</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded-lg pr-12 focus:ring-2 outline-none transition-colors bg-gray-200 focus:border-accent border-gray-300"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <label htmlFor="name">Link Task</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded-lg pr-12 focus:ring-2 outline-none transition-colors bg-gray-200 focus:border-accent border-gray-300"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className=" flex gap-4 justify-end">
          <button
            className="bg-gray-200  rounded-lg py-2 px-4 text-gray-600 min-w-24 cursor-pointer"
            type="button"
            onClick={handleCancel}
          >
            Batal
          </button>
          <button
            className="bg-accent rounded-lg py-2 px-4 text-white min-w-24 cursor-pointer"
            type="submit"
          >
            Simpan
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateTask;
