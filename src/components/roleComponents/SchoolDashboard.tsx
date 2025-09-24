import {
  BadgeCheck,
  BriefcaseBusiness,
  Building,
  CircleArrowRight,
  Users,
} from "lucide-react";
import RatingSummaryCompenent from "../RatingSummaryCompenent";
import PieChartCompenent from "../Charts/PieChartCompenent";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RatingSummary } from "@/models/feedback";
import { API, ENDPOINTS } from "../../../utils/config";
import Cookies from "js-cookie";
import { mapRatingToData } from "@/utils/mapRatingToData";

interface InternshipApplication {
  id: string;
  student: {
    name: string;
  };
  school: {
    name: string;
  };
  status: string;
}

interface Summary {
  student_count: number;
  student_internship_count: number;
  job_opening_count: number;
  company_count: number;
  achievement_count: number;
}

export default function SchoolDashboard() {
  const [internshipApplications, setInternshipApplications] = useState<
    InternshipApplication[]
  >([]);
  const [summary, setSummary] = useState<Summary>({
    student_count: 0,
    student_internship_count: 0,
    job_opening_count: 0,
    company_count: 0,
    achievement_count: 0,
  });
  const [ratingSummary, setRatingSummary] = useState<RatingSummary>({
    rating_count: 0,
    average_rating: 0,
    rating_1: 0,
    rating_2: 0,
    rating_3: 0,
    rating_4: 0,
    rating_5: 0,
  });

  const fetchData = async () => {
    try {
      const userpCount = API.get(`${ENDPOINTS.USERS}/count`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });
      const jobOpeningCount = API.get(`${ENDPOINTS.JOB_OPENINGS}/count`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });

      const achievementCount = API.get(`${ENDPOINTS.ACHIEVEMENTS}/count`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });

      const rating = API.get(`${ENDPOINTS.FEEDBACKS}/rating`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });
      const response = await Promise.all([
        userpCount,
        jobOpeningCount,
        achievementCount,
        rating,
      ]);

      console.log(response);
      setSummary({
        student_count: response[0].data.data.student_count,
        student_internship_count:
          response[0].data.data.total_student_internship,
        job_opening_count: response[1].data.data,
        company_count: response[0].data.data.company_count,
        achievement_count: response[2].data.data,
      });
      setRatingSummary(response[3].data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ratingColors = ["#ff0000", "#ff6600", "#ffcc00", "#66cc00", "#009900"]; // contoh warna

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 col-span-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex justify-between">
          <div className="text-accent-dark">
            <h1 className="font-extrabold  text-2xl">
              {summary.student_count}
            </h1>
            <h3 className=" text-md">Total Siswa</h3>
          </div>
          <Users className="text-accent w-7 h-7 my-auto" />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex justify-between">
          <div className="text-accent-dark">
            <h1 className="font-extrabold  text-2xl">
              {summary.student_internship_count}
            </h1>
            <h3 className=" text-md">Total Siswa Magang</h3>
          </div>
          <Users className="text-accent w-7 h-7 my-auto" />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex justify-between">
          <div className="text-accent-dark">
            <h1 className="font-extrabold  text-2xl">
              {summary.job_opening_count}
            </h1>
            <h3 className=" text-md">Total Lowongan</h3>
          </div>
          <BriefcaseBusiness className="text-accent w-7 h-7 my-auto" />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex justify-between">
          <div className="text-accent-dark">
            <h1 className="font-extrabold  text-2xl">
              {summary.company_count}
            </h1>
            <h3 className=" text-md">Total Perusahaan</h3>
          </div>

          <Building className="text-accent w-7 h-7 my-auto" />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex justify-between">
          <div className="text-accent-dark">
            <h1 className="font-extrabold  text-2xl">
              {summary.achievement_count}
            </h1>
            <h3 className=" text-md">Total Penghargaan</h3>
          </div>
          <BadgeCheck className="text-accent w-7 h-7 my-auto" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex flex-col justify-between">
        <div className="flex  mb-4   justify-between">
          <div className="flex flex-col ">
            <h3 className="font-bold text-lg">Penilaian Sekolah </h3>
            <p className="text-sm text-gray-600">
              Penilaian didapat dari siswa dan perusahaan yang terdaftar sebagai
              pengguna Prakerin
            </p>
          </div>
          <Link href="/dashboard/feedback">
            <CircleArrowRight
              className="text-accent/75  hover:text-accent"
              size={32}
            />
          </Link>
        </div>

        <div className="flex gap-6">
          <div className="w-1/2 ">
            <RatingSummaryCompenent data={ratingSummary} />
          </div>
          <div className="w-1/2 ">
            <PieChartCompenent
              legend="Persentase Penilaian"
              tooltip="Persentase Penilaian"
              dataList={mapRatingToData(ratingSummary, ratingColors)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex flex-col justify-between">
        <div className="flex flex-col mb-4">
          <h3 className="font-bold text-lg">Statistik Siswa </h3>
          <p className="text-sm text-gray-600">
            Visualisasi total siswa yang telah magang
          </p>
        </div>

        <div className="flex gap-6">
          <div className="w-1/2 ">
            <PieChartCompenent
              legend="Distribusi Total Siswa dan Lowongan"
              tooltip="Persentasi Rating"
              dataList={mapRatingToData(ratingSummary, ratingColors)}
            />
          </div>
          <div className="w-1/2 ">
            <PieChartCompenent
              legend="Distribusi Siswa Magang, Belum Magang, dan Telah Magang"
              tooltip="Persentasi Rating"
              dataList={mapRatingToData(ratingSummary, ratingColors)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex flex-col justify-between">
        <div className="flex flex-col mb-4">
          <h3 className="font-bold text-lg">
            Statistik Perusahaan dan Lowongan
          </h3>
          <p className="text-sm text-gray-600">
            Visualisasi total perusahaan dan lowongan
          </p>
        </div>

        <div className="flex gap-6">
          <div className="w-1/2 ">
            <PieChartCompenent
              legend="Distribusi Total Perusahaan dan Lowongan"
              tooltip="Persentase Rating"
              dataList={mapRatingToData(ratingSummary, ratingColors)}
            />
          </div>
          <div className="w-1/2 ">
            <PieChartCompenent
              legend="Distribusi Lowongan Aktif & Tidak Aktif"
              tooltip="Persentase Rating"
              dataList={mapRatingToData(ratingSummary, ratingColors)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
