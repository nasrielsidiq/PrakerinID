"use client";

import { Briefcase, Building, MapPin, UserCircle } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../../../../utils/config";
import Cookies from "js-cookie";
import { alertConfirm, alertError, alertSuccess } from "@/libs/alert";
import { EditorProps } from "@/components/Editor";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AxiosError } from "axios";

const Editor = dynamic<EditorProps & { error?: string }>(
  () => import("@/components/Editor"),
  {
    ssr: false,
  }
);

interface JobOpening {
  title: string;
  user: {
    photo_profile: string | null;
  };
  company: {
    name: string;
  };
  city_regency: {
    name: string;
  };
  province: {
    name: string;
  };
}

interface CV {
  id: string;
  name: string;
  file: string;
}

interface FormErrors {
  curriculum_vitae_id?: string;
  cover_letter?: string;
}

const ApplyLowongan = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const route = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [cvList, setCvList] = useState<CV[]>([]);

  const [jobOpening, setJobOpening] = useState<JobOpening>({
    title: "",
    user: {
      photo_profile: null,
    },
    company: {
      name: "",
    },
    city_regency: {
      name: "",
    },
    province: {
      name: "",
    },
  });
  const [formData, setFormData] = useState({
    curriculum_vitae_id: "",
    cover_letter: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const fetchJobOpening = async () => {
    try {
      const response = await API.get(`${ENDPOINTS.JOB_OPENINGS}/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });
      console.log("Job Opening:", response.data.data);
      setJobOpening(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCv = async () => {
    try {
      const response = await API.get(
        `${ENDPOINTS.CURRICULUM_VITAE}?page=1&limit=100`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );
      setCvList(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Promise.all([fetchJobOpening(), fetchCv()]);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const response = await API.post(
        ENDPOINTS.INTERNSHIP_APPLICATIONS,
        {
          curriculum_vitae_id: formData.curriculum_vitae_id,
          cover_letter: formData.cover_letter,
          job_opening_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );

      setFormData({ curriculum_vitae_id: "", cover_letter: "" });
      await alertSuccess("Lamaran berhasil dikirim!");

      route.push(`/dashboard/lowongan/${id}`);
    } catch (error: AxiosError | unknown) {
      console.warn(error);
      if (error instanceof AxiosError) {
        const responseError = error.response?.data.errors;
        if (typeof responseError === "string") {
          await alertError(responseError);
        } else {
          setErrors(responseError);
        }
      }
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditorChange = (data: any) => {
    setFormData((prev) => ({
      ...prev,
      cover_letter: data,
    }));
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
        -&gt;{" "}
        <Link
          className="hover:underline hover:text-accent"
          href={`/dashboard/lowongan/${id}`}
        >
          Detail Lowongan
        </Link>{" "}
        -&gt; Lamar
      </h1>
      <div className="flex items-center mb-8 space-x-2 font-extrabold text-accent">
        <Briefcase className="w-5 h-5" />
        <h2 className="text-2xl mt-2">Lamar Lowongan</h2>
      </div>
      <div className="bg-white md:w-7/10 m-auto rounded-lg shadow-sm p-6">
        {/* Job Info */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {jobOpening.title}
          </h2>
          <div className="flex items-start space-x-4">
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
            <div>
              <h3 className="font-medium text-gray-900">
                {jobOpening.company.name}
              </h3>
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {jobOpening.city_regency.name}, {jobOpening.province.name}
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* CV Selection */}
          <div>
            <div className="block text-sm font-medium text-gray-700 mb-2">
              Pilih CV
            </div>
            <select
              value={formData.curriculum_vitae_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  curriculum_vitae_id: e.target.value,
                })
              }
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-gray-50  ${
                errors.curriculum_vitae_id
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">Pilih CV yang akan digunakan</option>
              {cvList.map((cv) => (
                <option key={cv.id} value={cv.id}>
                  {cv.name} - {cv.file}
                </option>
              ))}
            </select>
            {errors.curriculum_vitae_id && (
              <p className="mt-1 text-sm text-red-500">
                {errors.curriculum_vitae_id}
              </p>
            )}
          </div>

          {/* Cover Letter */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Surat Lamaran
            </label>
            <Editor onChange={handleEditorChange} error={errors.cover_letter} />
            {errors.cover_letter && (
              <p className="mt-1 text-sm text-red-500">{errors.cover_letter}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-end">
            <Link
              href={`/dashboard/lowongan/${id}`}
              onClick={async (e) => {
                e.preventDefault();
                const isConfirm = await alertConfirm(
                  "Apakah anda yakin ingin membatalkan!"
                );
                if (isConfirm) {
                  route.push(`/dashboard/lowongan/${id}`);
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
              {isSubmitting ? "Mengirim..." : "Kirim"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
export default ApplyLowongan;
