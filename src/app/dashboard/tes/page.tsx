"use client";
import {
  CheckSquare,
  CirclePlus,
  ClipboardCheck,
  HelpCircle,
  Info,
  Search,
  Pencil,
  Trash,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../../utils/config";
import Cookies from "js-cookie";
import useDebounce from "@/hooks/useDebounce";
import Link from "next/link";
import NotFoundComponent from "@/components/NotFoundComponent";
import { alertConfirm, alertError, alertSuccess } from "@/libs/alert";
import { AxiosError } from "axios";
import TabsComponent from "@/components/TabsCompenent";
import LoaderData from "@/components/loader";
import PaginationComponent from "@/components/PaginationComponent";
import { Pages } from "@/models/pagination";

interface Tes {
  id: string;
  title: string;
  link: string;
  description: string;
  type: Type;
}
interface FormError {
  title?: string;
  link?: string;
  description?: string;
  type?: string;
}

type ActiveTab = "Semua" | "Praktik" | "Teori" | "Lainnya";
type Type = "theory" | "practice" | "";

const TestListPage: React.FC = () => {
  const tabs: ActiveTab[] = ["Semua", "Praktik", "Teori", "Lainnya"];

  const [activeTab, setActiveTab] = useState<ActiveTab>("Semua");
  const [inputSearch, setInputSearch] = useState("");
  const [tests, setTests] = useState<Tes[]>([]);
  const [formData, setFormData] = useState<Tes>({
    id: "",
    title: "",
    link: "",
    description: "",
    type: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<FormError>({});

  const debouncedQuery = useDebounce(inputSearch, 1000);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isReload, setIsReload] = useState<boolean>(false);

  const [pages, setPages] = useState<Pages>({
    activePages: 1,
    pages: 1,
  });

  const fetchTests = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      let filteredStatus: undefined | string = "all";
      switch (activeTab) {
        case "Semua":
          filteredStatus = undefined;
          break;
        case "Praktik":
          filteredStatus = "practice";
          break;
        case "Teori":
          filteredStatus = "theory";
          break;
        case "Lainnya":
          filteredStatus = "other";
          break;
      }

      const response = await API.get(ENDPOINTS.TESTS, {
        params: {
          type: filteredStatus,
          search: inputSearch,
          limit: 10,
          page: pages.activePages,
        },
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });

      setTests(response.data.data);
      setPages({
        activePages: response.data.current_page,
        pages: response.data.last_page,
      });
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        const responseError = error.response?.data.errors;
        await alertError(responseError);
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError({});

    try {
      await API.patch(`${ENDPOINTS.TESTS}/${editingId}`, formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });

      await fetchTests();
      setFormData({
        id: "",
        title: "",
        link: "",
        description: "",
        type: "",
      });

      setIsModalOpen(false);
      setEditingId(null);
      await alertSuccess("Tes berhasil diubah!");
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        const responseError = error.response?.data.errors;
        if (typeof responseError === "string") {
          await alertError(responseError);
        } else {
          setFormError(responseError);
        }
      }
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const confirm = await alertConfirm(
      `Apakah anda yakin ingin menghapus Tes "${name}"?`
    );
    if (!confirm) return;

    try {
      await API.delete(`${ENDPOINTS.TESTS}/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });
      if (tests.length == 1) {
        setPages({ ...pages, activePages: pages.activePages - 1 });
      } else {
        await fetchTests();
      }
      await alertSuccess(`Tes ${name} berhasil dihapus!`);
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        const responseError = error.response?.data.formError;
        await alertError(responseError);
      }
      console.error(error);
    }
  };

  const getType = (type: string) => {
    switch (type) {
      case "practice":
        return "Praktik";
      case "theory":
        return "Teori";
      case "other":
        return "Lainnya";
    }
  };

  const handleChangePage = (selectedPage: number) => {
    setPages((prev) => ({
      ...prev,
      activePages: selectedPage,
    }));
  };

  useEffect(() => {
    if (inputSearch.trim() !== "") {
      if (!debouncedQuery) {
        setTests([]);
        return;
      }
    }

    setPages((prev) => ({ ...prev, activePages: 1 }));
    setIsReload(!isReload);
  }, [activeTab, debouncedQuery]);

  useEffect(() => {
    fetchTests();
  }, [pages.activePages, isReload]);

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
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit mb-6 gap-2">
            <TabsComponent
              data={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
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
            placeholder="Cari tes..."
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            className="w-full bg-accent text-white  pl-10 pr-4 py-3 rounded-t-2xl focus:outline-none focus:ring-2 focus:ring-teal-200"
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
                  Judul Tes
                </th>
                <th className="text-left p-3 font-medium text-gray-600 uppercase">
                  Tautan Tes
                </th>
                <th className="text-left p-3 font-medium text-gray-600 uppercase">
                  Deskripsi
                </th>
                <th className="text-left p-3 font-medium text-gray-600 uppercase">
                  Tipe
                </th>
                <th className="text-left p-3 font-medium text-gray-600 uppercase">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {tests && !isLoading ? (
                tests.map((test, index) => (
                  <tr key={test.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-gray-800">
                      {index + 1 + (pages.activePages - 1) * 10}
                    </td>
                    <td className="p-4 text-gray-800">{test.title}</td>
                    <td className="p-4">{test.link}</td>
                    <td className="p-4">{test.description}</td>
                    <td className="p-4">{getType(test.type)}</td>
                    <td className="p-4">
                      <button
                        onClick={() => {
                          setEditingId(test.id);
                          setFormData({
                            id: test.id,
                            title: test.title,
                            link: test.link,
                            description: test.description,
                            type: test.type,
                          });
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors cursor-pointer"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(test.id, test.title)}
                        className="p-2 text-red-600 hover:bg-blue-50 rounded-full transition-colors cursor-pointer"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    <LoaderData />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center h-screen bg-black/25 z-50">
            <div className="bg-white text-black p-6 rounded-lg flex flex-col gap-2 min-w-sm lg:min-w-xl">
              <div className=" rounded-lg justify-between flex">
                <h3 className="text-lg font-semibold">
                  {editingId ? "Ubah" : "Tambah"} Tes
                </h3>
                <X
                  onClick={() => {
                    if (editingId) {
                      setEditingId(null);
                      setFormData({
                        id: "",
                        title: "",
                        link: "",
                        description: "",
                        type: "",
                      });
                    }
                    setIsModalOpen(false);
                  }}
                  className="w-8 h-8 cursor-pointer text-red-500 hover:text-red-600"
                />
              </div>
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Judul Tes
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${
                      formError.title ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Masukkan judul tes"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                  {formError.title && (
                    <p className="mt-1 text-sm text-red-500">
                      {formError.title}
                    </p>
                  )}
                </div>

                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipe Tes
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value as Type })
                    }
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${
                      formError.type ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Pilih jenis magang</option>
                    <option value="theory">Tes Teori</option>
                    <option value="practice">Tes Praktik</option>
                    <option value="other">Tes Lainnya</option>
                  </select>
                  {formError.type && (
                    <p className="mt-1 text-sm text-red-500">
                      {formError.type}
                    </p>
                  )}
                </div>

                {/* Link tes */}
                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link Tes
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${
                      formError.link ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Masukkan link tes"
                    value={formData.link}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                  />
                  {formError.link && (
                    <p className="mt-1 text-sm text-red-500">
                      {formError.link}
                    </p>
                  )}
                </div>

                {/* Deskripsi Tes */}
                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi
                  </label>
                  {formError.description && (
                    <p className="mt-1 text-sm text-red-500">
                      {formError.description}
                    </p>
                  )}
                  <textarea
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    value={formData.description}
                    className={`resize-none w-full h-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${
                      formError.description
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  ></textarea>
                </div>

                <div className="flex justify-end ">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-accent text-white px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-accent-hover"
                  >
                    {isSubmitting ? "Sedang menyimpan..." : "Simpan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Empty State (if no tasks) */}
        {tests.length === 0 && !isLoading && (
          <div className="text-center py-12 col-span-2 ">
            <NotFoundComponent text="Anda belum memiliki tes." />
          </div>
        )}
      </div>

      <PaginationComponent
        activePage={pages.activePages}
        loading={isLoading}
        onPageChange={handleChangePage}
        totalPages={pages.pages}
      />
    </main>
  );
};
export default TestListPage;
