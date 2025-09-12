import {
  Bookmark,
  Building,
  CirclePlus,
  MapPin,
  UserCircle,
  X,
} from "lucide-react";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../utils/config";
import Cookies from "js-cookie";
import { timeAgo } from "@/utils/timeAgo";
import Link from "next/link";
import Image from "next/image";

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
  user: {
    photo_profile: string;
  };
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
        <Link
          href="/dashboard/industry/tambah_lowongan"
          className="text-white bg-accent rounded-xl p-3 px-5 flex items-center space-x-2"
        >
          <CirclePlus className="w-5 h-5 " />
          <span>Tambah Lowongan</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {jobOpenings.length !== 0 ? (
          jobOpenings.map((data) => (
            <Link
              href={`/dashboard/lowongan/${data.id}`}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              key={data.id}
            >
              <h3 className="font-semibold text-gray-900 text-lg mb-3">
                {data.title}
              </h3>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  {data.user.photo_profile ? (
                    <div className="w-15 h-15 relative rounded-full border-white border">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/storage/photo-profile/${data.user.photo_profile}`}
                        alt="Logo Perusahaan"
                        fill
                        sizes="100%"
                        className="object-cover rounded-full"
                      />
                    </div>
                  ) : (
                    <UserCircle className="w-15 h-15 text-[var(--color-accent)]" />
                  )}
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
                {data.is_paid && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Paid
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center border-t-2 border-gray-200 pt-3">
                <span className="text-gray-500 text-sm">
                  {timeAgo(data.updated_at)}
                </span>
              </div>
            </Link>
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
