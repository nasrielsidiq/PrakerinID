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
import { API, ENDPOINTS } from "../../../../../../utils/config";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { alertConfirm, alertError, alertSuccess } from "@/libs/alert";
import NotFoundComponent from "@/components/NotFoundComponent";
import { Pages } from "@/models/pagination";
import PaginationComponent from "@/components/PaginationComponent";

interface Student {
  id: string;
  email: string;
  student: {
    name: string;
  };
}

const PermohonanSiswaPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [pages, setPages] = useState<Pages>({
    activePages: 1,
    pages: 1,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [data, setData] = useState<Student[]>([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await API.get(`${ENDPOINTS.USERS}`, {
        params: {
          is_verified: false,
          page: pages.activePages,
          limit: 10,
          role: "student",
          search: searchQuery,
        },
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });
      setData(response.data.data);
      setPages({
        ...pages,
        pages: response.data.last_page,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async (userId: string) => {
    const confirm = await alertConfirm(
      "Apakah anda yakin ingin menerima siswa ini?"
    );
    if (!confirm) return;

    try {
      await API.post(
        `${ENDPOINTS.USERS}/${userId}`,
        {
          _method: "PATCH",
          is_verified: true,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );
      fetchData();
      await alertSuccess("Siswa berhasil didaftarkan!");
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        const responseError = error.response?.data.errors;
        await alertError(responseError);
      }
      console.error(error);
    }
  };

  const handleReject = async (userId: string) => {
    const confirm = await alertConfirm(
      "Apakah anda yakin ingin menolak siswa ini?"
    );
    if (!confirm) return;

    try {
      await API.post(
        `${ENDPOINTS.USERS}/${userId}`,
        {
          _method: "PATCH",
          is_verified: false,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );
      fetchData();
      await alertSuccess("Siswa berhasil ditolak!");
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        const responseError = error.response?.data.errors;
        await alertError(responseError);
      }
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePage = (selectedPage: number) => {
    setPages((prev) => ({
      ...prev,
      activePages: selectedPage,
    }));
  };

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
            placeholder="Cari siswa yang sedang mendaftar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-accent text-white placeholder-teal-200 pl-10 pr-4 py-3 rounded-t-2xl focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3 font-medium text-gray-600 uppercase">
                  No
                </th>
                <th className="text-left p-3 font-medium text-gray-600 uppercase">
                  Nama Siswa
                </th>
                <th className="text-left p-3 font-medium text-gray-600 uppercase">
                  Email
                </th>
                <th className="text-left p-3 font-medium text-gray-600 uppercase">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-gray-800">
                    {index + 1 + (pages.activePages - 1) * 10}
                  </td>
                  <td className="p-4 text-gray-800">{item.student.name}</td>
                  <td className="p-4 text-gray-600">{item.email}</td>
                  <td className="p-4 grid grid-cols-2 gap-2 w-48 ">
                    <button
                      onClick={() => handleAccept(item.id)}
                      className="p-2 text-white hover:bg-green-600   bg-green-500 rounded-full transition-colors"
                    >
                      Terima
                    </button>
                    <button
                      onClick={() => handleReject(item.id)}
                      className="p-2 text-white hover:bg-red-600 bg-red-500 rounded-full transition-colors"
                    >
                      Tolak
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State (if no data) */}
        {data.length === 0 && (
          <div className="text-center py-12 col-span-2 ">
            <NotFoundComponent text="Tidak ada permohonan siswa mendaftar yang ditemukan." />
          </div>
        )}
      </div>
      <PaginationComponent
        activePage={pages.activePages}
        totalPages={pages.pages}
        onPageChange={handleChangePage}
        loading={isLoading}
      />
    </main>
  );
};
export default PermohonanSiswaPage;
