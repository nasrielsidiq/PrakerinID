import { Bookmark, Building, CirclePlus, MapPin, X } from "lucide-react";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../utils/config";
import Cookies from "js-cookie";
import { timeAgo } from "@/utils/timeAgo";

interface Lowongan {
  title: string;
  icon: File | null;
  name: string;
  kota: string;
  provinsi: string;
  time: Timestamp | null | number;
}

interface JobOpening {
  id: string;
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
  is_paid: boolean;
  updated_at: string;
  save_job_opening: boolean;
}

export function IndustryLowongan() {
  const route = useRouter();
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [lowongan, setLowongan] = useState<Lowongan[]>([
    {
      title: "Social Media Marketing",
      icon: null,
      name: "Makerindo Prima Solusi",
      kota: "Bandung",
      provinsi: "Jawa Barat",
      time: 1,
    },
    {
      title: "Social Media Marketing",
      icon: null,
      name: "Makerindo Prima Solusi",
      kota: "Bandung",
      provinsi: "Jawa Barat",
      time: 1,
    },
    {
      title: "Social Media Marketing",
      icon: null,
      name: "Makerindo Prima Solusi",
      kota: "Bandung",
      provinsi: "Jawa Barat",
      time: 1,
    },
    {
      title: "Social Media Marketing",
      icon: null,
      name: "Makerindo Prima Solusi",
      kota: "Bandung",
      provinsi: "Jawa Barat",
      time: 1,
    },
    {
      title: "Social Media Marketing",
      icon: null,
      name: "Makerindo Prima Solusi",
      kota: "Bandung",
      provinsi: "Jawa Barat",
      time: 1,
    },
  ]);

  const fetchJobOpenings = async () => {
    try {
      // let params = {
      //   search: inputSearch,
      // };

      // if (showFilter) {
      //   params = { ...params, ...filterData };
      // }

      const response = await API.get(ENDPOINTS.JOB_OPENINGS, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
        // params: {
        //   ...params,
        // },
      });
      if (response.status === 200) {
        console.log(response.data.data);
        setJobOpenings(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobOpenings();
  }, []);
  return (
    <>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => route.push("/dashboard/industry/tambah_lowongan")}
          className="text-white bg-accent rounded-xl p-3 px-5 flex items-center space-x-2"
        >
          <CirclePlus className="w-5 h-5 " />
          <span>Tambah Lowongan</span>
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {jobOpenings.length !== 0 ? (
          jobOpenings.map((data, index) => (
            <div
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              key={index}
            >
              <h3 className="font-semibold text-gray-900 text-lg mb-3">
                {data.title}
              </h3>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">IG</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {data.company.name}
                    </h3>
                    <div className="flex text-sm text-gray-500 space-x-2">
                      <MapPin className="w-4 h-4 my-auto" />
                      <p className="">
                        {data.city_regency.name}, {data.province.name}
                      </p>
                    </div>
                  </div>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Paid
                </span>
              </div>

              <div className="flex justify-between items-center border-t-2 border-gray-200 pt-3">
                <span className="text-gray-500 text-sm">
                  {timeAgo(data.updated_at)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            Anda belum membuat lowongan pekerjaan.
          </p>
        )}
      </div>
    </>
  );
}
