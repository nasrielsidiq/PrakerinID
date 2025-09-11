"use client";
import {
  BriefcaseBusiness,
  CircleAlert,
  Download,
  Edit,
  Eye,
  FileText,
  Search,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../../../utils/config";
import Cookies from "js-cookie";
import useDebounce from "@/hooks/useDebounce";

interface Lamaran {
  id: number;
  name: string;
  school_name: string;
  jurusan: string;
  status: "Pengajuan" | "Ditolak" | "Test" | "Diterima";
  application: File | null;
  color?: string;
}

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

const lamaranPage: React.FC = () => {
  const router = useRouter();
  const [inputSearch, setInputSearch] = useState("");
  const debouncedQuery = useDebounce(inputSearch, 1000);
  const [internshipApplications, setInternshipApplications] = useState<
    InternshipApplication[]
  >([]);

  const fetchInternshipAplication = async () => {
    try {
      const response = await API.get(ENDPOINTS.INTERNSHIP_APPLICATIONS, {
        params: {
          search: inputSearch,
        },
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });

      if (response.status === 200) {
        console.log(response.data.data);
        setInternshipApplications(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatus = (status: string) => {
    switch (status) {
      case "in_progress":
        return "Pengajuan";
      case "accepted":
        return "Diterima";
      case "rejected":
        return "Ditolak";
    }
  };

  const changeStatusColor = (status: string) => {
    switch (status) {
      case "in_progress":
        return "text-green-500";
      case "accepted":
        return "text-accent";
      case "rejected":
        return "text-red-500";
    }
  };

  useEffect(() => {
    if (inputSearch.trim() !== "") {
      if (!debouncedQuery) {
        setInternshipApplications([]);
        return;
      }
    }
    fetchInternshipAplication();
  }, [debouncedQuery]);

  return (
    <main className="p-6">
      <h1 className="text-accent-dark text-sm mb-5">Lamaran Magang</h1>
      <div className="flex items-center mb-8  space-x-2 font-extrabold text-accent">
        <BriefcaseBusiness className="w-5 h-5" />
        <h2 className="text-2xl mt-2">Lamaran Magang</h2>
      </div>
      <div className="rounded-t-2xl  bg-accent">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Cari Siswa..."
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
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
                  Nama Siswa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asal Sekolah
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jurusan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CV
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {internshipApplications.map((application, index) => (
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
                    {/* {application.jurusan} */}
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden">
          {internshipApplications.map((application, index) => (
            <div key={application.id} className="p-4 border-b border-gray-200">
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
          ))}
        </div>

        {internshipApplications.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <FileText size={48} className="mx-auto mb-4 text-gray-300" />
            <p>Tidak ada lamaran yang ditemukan</p>
          </div>
        )}
      </div>
    </main>
  );
};
export default lamaranPage;
