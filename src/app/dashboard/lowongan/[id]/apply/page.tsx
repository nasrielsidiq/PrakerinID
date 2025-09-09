"use client";

import { Briefcase, Building, MapPin } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../../../../utils/config";
import Cookies from "js-cookie";
import { alertSuccess } from "@/libs/alert";

interface JobOpening {
  title: string;
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

const ApplyLowongan = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const [jobOpening, setJobOpening] = useState<JobOpening>({
    title: "",
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
  const [cvList, setCvList] = useState<CV[]>([]);
  const [formData, setFormData] = useState({
    curriculum_vitae_id: "",
    cover_letter: "",
  });

  const fetchJobOpening = async () => {
    try {
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
      console.error("Error fetching job opening:", error.response.data.errors);
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
      if (response.status === 200) {
        setCvList(response.data.data);
      }
    } catch (error: any) {
      console.error("Error fetching CVs:", error.response.data.errors);
    }
  };

  useEffect(() => {
    console.log("Job ID:", id);
    Promise.all([fetchJobOpening(), fetchCv()]);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
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

      if (response.status === 201) {
        console.log("Application submitted successfully:", response.data);
        setFormData({ curriculum_vitae_id: "", cover_letter: "" });
        await alertSuccess("Lamaran berhasil dikirim!");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
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
      <div className="bg-white md:w-7/10 m-auto rounded-lg shadow-sm border p-6">
        {/* Job Info */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {jobOpening.title}
          </h2>
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Building className="w-6 h-6 text-blue-600" />
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
            >
              <option value="">Pilih CV yang akan digunakan</option>
              {cvList.map((cv) => (
                <option key={cv.id} value={cv.id}>
                  {cv.name} - {cv.file}
                </option>
              ))}
            </select>
          </div>

          {/* Cover Letter */}
          <div>
            <div className="block text-sm font-medium text-gray-700 mb-2">
              Surat Lamaran
            </div>
            <textarea
              value={formData.cover_letter}
              onChange={(e) =>
                setFormData({ ...formData, cover_letter: e.target.value })
              }
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
              placeholder="Tulis surat lamaran Anda di sini..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              // onClick={handleSubmit}
              className="px-6 py-2 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Lamar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
export default ApplyLowongan;
