import {
  BadgeCheck,
  BriefcaseBusiness,
  CircleArrowRight,
  FileText,
  Search,
  Users,
} from "lucide-react";
import RatingSummary from "../RatingSummary";
import PieChartCompenent from "../Charts/PieChartCompenent";
import BarChartComponent from "../Charts/BarChartCompenent";
import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { API, ENDPOINTS } from "../../../utils/config";

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
  internship_count: number;
  job_opening_count: number;
  achievement_count: number;
}

interface RatingSummary {
  rating_count: number;
  average_rating: number;
  rating_1: number;
  rating_2: number;
  rating_3: number;
  rating_4: number;
  rating_5: number;
}

export default function IndustryDashboard() {
  const [internshipApplications, setInternshipApplications] = useState<
    InternshipApplication[]
  >([]);
  const [summary, setSummary] = useState<Summary>({
    internship_count: 0,
    job_opening_count: 0,
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
      const internshipCount = API.get(`${ENDPOINTS.INTERNSHIPS}/count`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });
      const jobOpeningCount = API.get(`${ENDPOINTS.JOB_OPENINGS}/count`, {
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
        internshipCount,
        jobOpeningCount,
        rating,
      ]);

      console.log(response);
      setSummary({
        internship_count: response[0].data.data,
        job_opening_count: response[1].data.data,
        achievement_count: response[0].data.data,
      });
      setRatingSummary(response[2].data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 col-span-5  gap-6">
        <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex justify-between">
          <div className="text-accent-dark">
            <h1 className="font-extrabold  text-2xl">
              {summary.internship_count}
            </h1>
            <h3 className=" text-md">Total Magang</h3>
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
            <h3 className="font-bold text-lg">Rating Perusahaan </h3>
            <p className="text-sm text-gray-600">
              Rating didapat dari siswa yang melakukan magang di perusahaan ini
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
              average={ratingSummary.average_rating}
              total={ratingSummary.rating_count}
              counts={{ 5: 80, 4: 10, 3: 5, 2: 3, 1: 20 }}
              data={ratingSummary}
            />
          </div>
          <div className="w-1/2 ">
            <PieChartCompenent legend="Persentase Rating" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex flex-col justify-between">
        <div className="flex flex-col mb-4">
          <h3 className="font-bold text-lg">Distribusi Total Siswa Magang </h3>
          <p className="text-sm text-gray-600">Visualisasi Status Tugas</p>
        </div>

        <div className="flex gap-6">
          <div className="w-1/2 ">
            <BarChartComponent legend="Grafik Distribusi Tugas Selesai Siswa Magang" />
          </div>
          <div className="w-1/2 ">
            <PieChartCompenent legend="Distribusi Status Tugas" />
          </div>
        </div>
      </div>

      <div>
        <div className="rounded-t-2xl  bg-accent">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari Siswa..."
              // value={inputSearch}
              // onChange={(e) => setInputSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-white placeholder-teal-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
        </div>

        <div className="bg-white rounded-b-2xl shadow-md overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* {internshipApplications.map((application, index) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.school.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Masih dummy
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${changeStatusColor(
                      application.status
                    )}`}
                  >
                    {changeStatus(application.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    <span className="bg-green-500 rounded-full p-1">Unduh</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => router.push(`lamaran/${application.id}`)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <CircleAlert size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))} */}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {/* {internshipApplications.map((application, index) => (
            <div key={application.id} className="p-4 -b -gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">
                  {application.student.name}
                </h3>
                <span className="text-sm text-gray-500">#{index + 1}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-medium flex items-center">
                  <Download size={12} className="mr-1" />
                  Unduh
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium flex items-center">
                  <Eye size={12} className="mr-1" />
                  Lihat
                </button>
              </div>

              <div className="flex justify-end space-x-2">
                <button className="text-blue-600 hover:text-blue-800 p-1">
                  <Edit size={16} />
                </button>
                <button className="text-red-600 hover:text-red-800 p-1">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))} */}
          </div>

          {internshipApplications.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <FileText size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Tidak ada task deadline yang ditemukan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
