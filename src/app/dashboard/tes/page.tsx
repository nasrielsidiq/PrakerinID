"use client";
import {
  CheckSquare,
  CirclePlus,
  ClipboardCheck,
  HelpCircle,
  Info,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../../utils/config";
import Cookies from "js-cookie";
import useDebounce from "@/hooks/useDebounce";
import Link from "next/link";
import NotFoundCompoenent from "@/components/NotFoundCompoenent";

interface Task {
  id: number;
  title: string;
  due_date: string;
  status: "in_progress" | "pending" | "completed" | "cancelled";
}

interface Tes {
  id: string;
  title: string;
  link: string;
}

type ActiveTab = "Semua" | "Praktik" | "Teori";

const TasklistPage: React.FC = () => {
  const router = useRouter();
  const tabs = ["Semua", "Praktik", "Teori"];

  const [activeTab, setActiveTab] = useState<ActiveTab>("Semua");
  const [inputSearch, setInputSearch] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const debouncedQuery = useDebounce(inputSearch, 1000);

  const fetchTasks = async () => {
    try {
      let filteredStatus = "all";
      switch (activeTab) {
        case "Semua":
          filteredStatus = "all";
          break;
        case "Praktik":
          filteredStatus = "practice";
          break;
        case "Teori":
          filteredStatus = "theory";
          break;
      }

      const response = await API.get(ENDPOINTS.TASKS, {
        params: {
          status: filteredStatus,
          search: inputSearch,
        },
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });

      console.log("Tasks fetched successfully:", response.data.data);
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (inputSearch.trim() !== "") {
      if (!debouncedQuery) {
        setTasks([]);
        return;
      }
    }
    fetchTasks();
  }, [activeTab, debouncedQuery]);

  return (
    <main className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-accent-dark text-sm mb-5">Tes</h1>
        <div className="mb-8">
          <div className="flex items-center space-x-2 font-extrabold text-accent">
            <HelpCircle className="w-5 h-5" />
            <h2 className="text-2xl mt-2">Tes</h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as ActiveTab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ${
                activeTab === tab
                  ? "bg-accent text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {Cookies.get("authorization") === "company" && (
          <div className="flex justify-end mb-6">
            <Link
              href="/dashboard/tes/tambah"
              className="text-white bg-accent rounded-xl p-3 px-5 flex items-center space-x-2"
            >
              <CirclePlus className="w-5 h-5 " />
              <span>Tambah Tes</span>
            </Link>
          </div>
        )}
      </div>

      {/* Tes Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari Tes..."
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            className="w-full bg-accent text-white placeholder-teal-200 pl-10 pr-4 py-3 rounded-t-2xl focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3 font-medium text-gray-600">No</th>
                <th className="text-left p-3 font-medium text-gray-600">
                  Judul Tes
                </th>
                <th className="text-left p-3 font-medium text-gray-600">
                  Link Tes
                </th>
                <th className="text-left p-3 font-medium text-gray-600">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.length &&
                tasks.map((task, index) => (
                  <tr key={task.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-gray-800">{index + 1}</td>
                    <td className="p-4 text-gray-800">{task.title}</td>
                    <td className="p-4">
                      <button
                        onClick={() => router.push(`tasklist/${task.id}`)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors cursor-pointer"
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
          <div className="text-center py-12 col-span-2 ">
            <NotFoundCompoenent text="Anda belum memiliki tes." />
          </div>
        )}
      </div>
    </main>
  );
};
export default TasklistPage;
