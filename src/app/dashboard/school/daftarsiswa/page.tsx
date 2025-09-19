"use client";
import {
  CheckSquare,
  ClipboardCopy,
  Plus,
  Search,
  UsersRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../../../utils/config";
import Cookies from "js-cookie";
import TabsComponent from "@/components/TabsCompenent";
import Link from "next/link";
import useDebounce from "@/hooks/useDebounce";

interface Student {
  id: number;
  status: "ongoing" | "not_started" | "completed";
  student: {
    name: string;
    class: string | null;
  };
  major: {
    name: string;
  } | null;
}

const DaftarSiswaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedQuery = useDebounce(searchTerm, 1000);
  const [students, setStudents] = useState<Student[]>([]);
  const tabs = ["Semua", "Belum Magang", "Sedang Magang", "Selesai Magang"];
  const router = useRouter();

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "not_started":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusName = (status: string): string => {
    switch (status) {
      case "ongoing":
        return "Sedang Magang";
      case "not_started":
        return "Belum Magang";
      case "completed":
        return "Selesai Magang";
      default:
        return "";
    }
  };

  const fetchStudents = async () => {
    try {
      let status: string | undefined;
      switch (activeTab) {
        case "Sedang Magang":
          status = "ongoing";
          break;
        case "Belum Magang":
          status = "not_started";
          break;
        case "Selesai Magang":
          status = "completed";
          break;
        default:
          status = undefined;
      }

      const response = await API.get(`${ENDPOINTS.USERS}`, {
        params: {
          is_verified: true,
          page: 1,
          limit: 10,
          role: "student",
          status: status,
          search: searchTerm,
        },
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });
      if (response.status === 200) {
        console.log("Fetched students:", response.data);
        setStudents(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      if (!debouncedQuery) {
        setStudents([]);
        return;
      }
    }

    fetchStudents();
  }, [debouncedQuery, activeTab]);

  return (
    <main className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-accent-dark text-sm mb-5">Daftar Siswa</h1>
        <div className="mb-8">
          <div className="flex items-center space-x-2 font-extrabold text-accent">
            <UsersRound className="w-5 h-5" />
            <h2 className="text-2xl mt-2">Daftar Siswa</h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit mb-6 gap-2">
          <TabsComponent
            data={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end mb-6">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Link
            href="/dashboard/school/daftarsiswa/permohonan"
            className="bg-vip hover:bg-orange-400 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center"
          >
            <ClipboardCopy size={16} className="mr-1" />
            Permohonan Pendaftaran
          </Link>
          <Link
            href="/dashboard/school/daftarsiswa/tambahsiswa"
            className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center"
          >
            <Plus size={16} className="mr-1" />
            Tambah Siswa
          </Link>
        </div>
      </div>

      {/* Task Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari siswa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-accent text-white placeholder-teal-200 pl-10 pr-4 py-3 rounded-t-2xl focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3 font-medium text-gray-600">No</th>
                <th className="text-left p-3 font-medium text-gray-600">
                  Name
                </th>
                <th className="text-left p-3 font-medium text-gray-600">
                  Kelas
                </th>
                <th className="text-left p-3 font-medium text-gray-600">
                  Jurusan
                </th>
                <th className="text-left p-3 font-medium text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {students &&
                students.map((task, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-gray-800">{index + 1}</td>
                    <td className="p-4 text-gray-800">{task.student.name}</td>
                    <td className="p-4 text-gray-800">
                      {task.student.class ?? "-"}
                    </td>
                    <td className="p-4 text-gray-800">
                      {task.major?.name ?? "-"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {getStatusName(task.status)}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Empty State (if no tasks) */}
        {students.length === 0 && (
          <div className="text-center py-12">
            <CheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Tidak ada siswa yang ditemukan</p>
          </div>
        )}
      </div>
    </main>
  );
};
export default DaftarSiswaPage;
