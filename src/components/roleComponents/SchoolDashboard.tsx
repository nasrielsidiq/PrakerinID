import {
  BadgeCheck,
  BriefcaseBusiness,
  Building,
  CircleArrowRight,
  FileText,
  Search,
  Users,
} from "lucide-react";
import RatingSummary from "../RatingSummary";
import PieChartCompenent from "../Charts/PieChartCompenent";
import BarChartComponent from "../Charts/BarChartCompenent";
import { useState } from "react";
import Link from "next/link";

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

export default function SchoolDashboard() {
  const [internshipApplications, setInternshipApplications] = useState<
    InternshipApplication[]
  >([]);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 col-span-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex justify-between">
          <div className="text-accent-dark">
            <h1 className="font-extrabold  text-2xl">39</h1>
            <h3 className=" text-md">Total Siswa</h3>
          </div>
          <Users className="text-accent w-7 h-7 my-auto" />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex justify-between">
          <div className="text-accent-dark">
            <h1 className="font-extrabold  text-2xl">45</h1>
            <h3 className=" text-md">Total Siswa Magang</h3>
          </div>
          <Users className="text-accent w-7 h-7 my-auto" />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex justify-between">
          <div className="text-accent-dark">
            <h1 className="font-extrabold  text-2xl">4</h1>
            <h3 className=" text-md">Total Lowongan</h3>
          </div>
          <BriefcaseBusiness className="text-accent w-7 h-7 my-auto" />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex justify-between">
          <div className="text-accent-dark">
            <h1 className="font-extrabold  text-2xl">4</h1>
            <h3 className=" text-md">Total Perusahaan</h3>
          </div>

          <Building className="text-accent w-7 h-7 my-auto" />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex justify-between">
          <div className="text-accent-dark">
            <h1 className="font-extrabold  text-2xl">4</h1>
            <h3 className=" text-md">Total Penghargaan</h3>
          </div>
          <BadgeCheck className="text-accent w-7 h-7 my-auto" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex flex-col justify-between">
        <div className="flex  mb-4   justify-between">
          <div className="flex flex-col ">
            <h3 className="font-bold text-lg">Rating Sekolah </h3>
            <p className="text-sm text-gray-600">
              Rating didapat dari siswa dan perusahaan yang terdaftar sebagai
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
            <RatingSummary
              average={4.2}
              total={118}
              counts={{ 5: 80, 4: 10, 3: 5, 2: 3, 1: 20 }}
            />
          </div>
          <div className="w-1/2 ">
            <PieChartCompenent legend="Persentase Rating" />
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
            <PieChartCompenent legend="Distribusi Total Siswa dan Lowongan" />
          </div>
          <div className="w-1/2 ">
            <PieChartCompenent legend="Distribusi Siswa Magang, Belum Magang, dan Telah Magang" />
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
            <PieChartCompenent legend="Distribusi Total Perusahaan dan Lowongan" />
          </div>
          <div className="w-1/2 ">
            <PieChartCompenent legend="Distribusi Lowongan Aktif & Close" />
          </div>
        </div>
      </div>
    </div>
  );
}
