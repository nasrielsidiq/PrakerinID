"use client";
import {
  CheckSquare,
  ClipboardCheck,
  Info,
  Plus,
  Search,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  deadline: string;
  status: "Sedang" | "Belum" | "Selesai";
}
const tasks: Task[] = [
  {
    id: 1,
    title: "Analisis Sistem Informasi dikonoha",
    deadline: "12-12-2025",
    status: "Sedang",
  },
];
const PermohonanSiswaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const tabs = ["Semua", "Belum", "Sedang", "Selesai"];
  const router = useRouter();
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Sedang":
        return "bg-green-100 text-green-800";
      case "Belum":
        return "bg-yellow-100 text-yellow-800";
      case "Selesai":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const fecthStudents = () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <main className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-accent-dark text-sm mb-5">
          <Link
            className="hover:underline hover:text-accent"
            href={"/dashboard/school/daftarsiswa"}
          >
            Daftar Siswa
          </Link>{" "}
          -&gt; Siswa Pendaftar
        </h1>
        <div className="mb-8">
          <div className="flex items-center space-x-2 font-extrabold text-accent">
            <UsersRound className="w-5 h-5" />
            <h2 className="text-2xl mt-2">Permohonan Pendaftaran</h2>
          </div>
        </div>
      </div>

      {/* Task Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari Siswa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-accent text-white placeholder-teal-200 pl-10 pr-4 py-3 rounded-t-2xl focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3 font-medium text-gray-600">No</th>
                <th className="text-left p-3 font-medium text-gray-600">
                  Nama Siswa
                </th>
                <th className="text-left p-3 font-medium text-gray-600">
                  Email
                </th>
                <th className="text-left p-3 font-medium text-gray-600">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-gray-800">{task.id}</td>
                  <td className="p-4 text-gray-800">{task.title}</td>
                  <td className="p-4 text-gray-600">{task.deadline}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => router.push("tasklist/tyd")}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State (if no tasks) */}
        {tasks.length === 0 && (
          <div className="text-center py-12">
            <CheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Tidak ada task yang ditemukan</p>
          </div>
        )}
      </div>
    </main>
  );
};
export default PermohonanSiswaPage;
