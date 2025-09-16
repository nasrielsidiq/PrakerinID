"use client";
import { FileText, FileTextIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { API, ENDPOINTS } from "../../../../../utils/config";
import Cookies from "js-cookie";
import { alertSuccess } from "@/libs/alert";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
}

const CreatePage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await API.post(ENDPOINTS.PROVINCES, formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });

      await alertSuccess("Berhasil menambahkan provinsi!");
      router.push("/dashboard/provinsi");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {};

  return (
    <main className="p-6">
      <h1 className="text-accent-dark text-sm mb-5">
        <Link
          className="hover:underline hover:text-accent"
          href={"/dashboard/provinsi"}
        >
          Provinsi
        </Link>{" "}
        -&gt; Tambah Provinsi
      </h1>
      <div className="mb-8">
        <div className="flex items-center space-x-2 font-extrabold text-accent">
          <FileText className="w-5 h-5" />
          <h2 className="text-2xl">Provinsi</h2>
        </div>
      </div>

      <form
        className="bg-white rounded-2xl space-y-6 p-6 text-black"
        onSubmit={handleSubmit}
      >
        <div className="flex space-x-5">
          <div>
            <h1 className="text-xl text-gray-800 font-extrabold">
              Tambah Provinsi
            </h1>
            <span className="text-sm text-gray-300">
              Silahkan isi semua informasi yang dibutuhkan
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="name">Nama Provinsi</label>
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

export default CreatePage;
