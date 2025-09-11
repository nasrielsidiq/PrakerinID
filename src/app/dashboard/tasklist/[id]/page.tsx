"use client";
import { CalendarRangeIcon, ClipboardCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../../../utils/config";
import Cookies from "js-cookie";
import Link from "next/link";

interface Task {
  id: string;
  title: string;
  due_date: string;
  status: string;
  description: string;
}

const DetailTasklistPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const router = useRouter();
  const { id } = use(params);
  const [task, setTask] = useState<Task>({
    id: "",
    title: "",
    due_date: "",
    status: "Belum",
    description: "",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_progress":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "Belum";
      case "in_progress":
        return "Sedang";
      case "completed":
        return "Selesai";
      case "cancelled":
        return "Dibatalkan";
    }
  };

  const fetchDetailTask = async () => {
    try {
      const response = await API.get(`${ENDPOINTS.TASKS}/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });

      if (response.status === 200) {
        console.log("Detail task fetched successfully:", response.data.data);
        setTask(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching detail task:", error);
    }
  };

  useEffect(() => {
    console.log("Task ID:", id);
    fetchDetailTask();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-accent-dark text-sm mb-5">
        <Link
          className="hover:underline hover:text-accent"
          href={"/dashboard/tasklist/"}
        >
          Task List
        </Link>{" "}
        -&gt; Detail Task
      </h1>
      <div className="mb-8">
        <div className="flex items-center space-x-2 font-extrabold text-accent">
          <ClipboardCheck className="w-5 h-5" />
          <h2 className="text-2xl mt-2">Detail Task</h2>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col items-end lg:flex-row lg:items-start lg:justify-between gap-4 pb-5 mb-5 border-b-1 border-gray-200">
          <div className="flex items-start space-x-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {task.title}
              </h2>
              <div className="flex items-center space-x-2 text-gray-600 mb-3">
                <CalendarRangeIcon className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{task.due_date}</span>
              </div>
              <span
                className={` ${getStatusColor(
                  task.status
                )} rounded-full p-1 px-3`}
              >
                {getStatus(task.status)}
              </span>
            </div>
          </div>
          <Link
            href={`/dashboard/tasklist/${id}/report`}
            className="bg-accent text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 whitespace-nowrap"
          >
            <span className="">Report</span>
          </Link>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Deskripsi</h3>
        <div className="text-gray-700 text-sm leading-relaxed space-y-3 mb-5">
          <p>{task.description}</p>
          {/* <p>
            PT Makerindo Cipta Solusi adalah perusahaan teknologi yang bergerak
            di bidang pengembangan solusi digital dan rekayasa perangkat keras
            untuk mendukung transformasi industri 4.0 di Indonesia. Berdiri
            sejak tahun [Tahun Berdiri], kami berkomitmen untuk menghadirkan
            inovasi terdepan yang mampu menjawab tantangan zaman dengan semangat
            tumbuh bersama klien.
          </p>
          <p>
            Dengan spesialisasi pada pengembangan sistem IoT (Internet of
            Things), otomasi industri, serta solusi perangkat lunak kustom, PT
            Makerindo Cipta Solusi telah menjadi mitra terpercaya bagi berbagai
            sektor, termasuk manufaktur, agrikultur, pendidikan, dan
            pemerintahan selama bertahun-tahun.
          </p>
          <p>
            Kami percaya bahwa teknologi bukan hanya alat, tetapi juga jembatan
            untuk menciptakan efisiensi, transparansi, dan pertumbuhan
            berkelanjutan. Oleh karena itu, setiap solusi yang kami kembangkan
            selalu berorientasi pada kebutuhan klien dan kemajuan teknologi
            terkini.
          </p> */}
        </div>
        {/* <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Lowongan Magang di Perusahaan ini
                </h3> */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {jobPositions.map((position, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group bg-white"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-gray-900 text-sm mb-1 truncate">
                                        {position.title}
                                    </h4>
                                    <p className="text-xs text-gray-500">{position.duration}</p>
                                </div>
                                <div className="ml-3 flex-shrink-0">
                                    <div className="w-6 h-6 rounded-full border border-red-500 flex items-center justify-center group-hover:border-red-400 transition-colors">
                                        <ArrowRight className="w-4  text-red-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}
      </div>
    </main>
  );
};
export default DetailTasklistPage;
