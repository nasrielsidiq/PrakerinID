"use client";
import { useEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../utils/config";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import DescriptionRendererLite from "@/components/RenderBlocksLite";
import LoaderData from "@/components/loader";

interface Province {
  id: string;
  name: string;
}

interface Filter {
  province_id: string;
  city_regency_id: string;
  grade: "smk" | "mahasiswa" | "all" | "";
  field_id: string;
  duration_id: string;
}

interface Duration {
  id: string;
  duration_value: number;
  duration_unit: string;
}

interface Field {
  id: string;
  name: string;
}

export default function InternshipPage() {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]); // Replace 'any' with your actual data type
  const [search, setSearch] = useState<string>("");
  const [inputSearch, setInputSearch] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("search") || "";
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [durations, setDurations] = useState<Duration[]>([]);
  const [filterData, setFilterData] = useState<Filter>({
    province_id: "",
    city_regency_id: "",
    grade: "",
    field_id: "",
    duration_id: "",
  });
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setInputSearch(keyword);
    setSearch(keyword);
  }, [keyword]);

  const [filters, setFilters] = useState({
    provinsi: [] as string[],
    kota: [] as string[],
    pendidikan: [] as string[],
    durasi: [] as string[],
  });

  useEffect(() => {
    if (loading) return;
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await API.get(ENDPOINTS.JOB_OPENINGS, {
          params: {
            provinsi: filters.provinsi.join(","),
            kota: filters.kota.join(","),
            grade: filters.pendidikan.join(","),
            slug: search,
            durasi: filters.durasi.join(","),
          },
        });
        setData(response.data.data);
        console.log("Data fetched successfully:", response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, [filters, search]);

  const handleToggle = (filter: string) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const handleFilterChange = (
    filterKey: keyof typeof filters,
    value: string
  ) => {
    setFilters((prev) => {
      const arr = prev[filterKey];
      if (arr.includes(value)) {
        // Hapus jika sudah ada
        return { ...prev, [filterKey]: arr.filter((v) => v !== value) };
      } else {
        // Tambah jika belum ada
        return { ...prev, [filterKey]: [...arr, value] };
      }
    });
  };

  const handleSearchChange = () => {
    setSearch(inputSearch);
  };

  const fetchProvinces = async () => {
    try {
      const response = await API.get(ENDPOINTS.PROVINCES);
      if (response.status === 200) {
        console.log("Provinces fetched:", response.data.data);
        setProvinces(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching provinces:", error);
      return [];
    }
  };

  const fetchDurations = async () => {
    try {
      const response = await API.get(ENDPOINTS.DURATIONS);
      if (response.status === 200) {
        console.log("Durations fetched:", response.data.data);
        setDurations(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching durations:", error);
    }
  };

  const fetchFields = async () => {
    try {
      const response = await API.get(ENDPOINTS.FIELDS);
      if (response.status === 200) {
        setFields(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getGradeLabel = (grade: string) => {
    switch (grade) {
      case "smk":
        return "Tingkat SMK";
      case "mahasiswa":
        return "Tingkat Mahasiswa";
      case "all":
        return "Semua Tingkat";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "wfh":
        return "WFH";
      case "full_time":
        return "WFO";
      case "hybrid":
        return "Hybrid";
    }
  };

  useEffect(() => {
    Promise.all([fetchProvinces(), fetchDurations(), fetchFields()]);
  }, []);

  return (
    <>
      <section className="flex flex-col items-center text-center justify-center mt-15">
        <h1 className="text-3xl font-bold text-accent mb-5">Lowongan Magang</h1>
        <p className="text-gray-500 text-xl">
          Temukan peluang magang dari berbagai perusahaan ternama. Daftar,
          lamar, dan mulai perjalanan kariermu bersama kami.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <div className="relative flex border border-gray-300 rounded-full items-center">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
                placeholder="Cari lowongan magang impian anda..."
                className="md:w-150 text-gray-600 dark:text-white px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-prakerin focus:border-transparent transition-all duration-300"
              />
              <svg
                className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <button
              onClick={handleSearchChange}
              className="relative bg-accent-dark w-8 h-8 ms-4 me-2 rounded-full text-white hover:bg-prakerin-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg
                className="absolute inset-0 w-8 h-8 m-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          <button
            onClick={() => setInputSearch("Magang Popular")}
            className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 shadow-sm"
          >
            Magang Popular
          </button>
          {fields.map((field) => (
            <button
              key={field.id}
              onClick={() => setInputSearch(field.name)}
              className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 shadow-sm"
            >
              {field.name}
            </button>
          ))}
        </div>
      </section>
      <section className="px-4 md:px-10 lg:px-20 py-10">
        <h5 className="text-sm text-gray-600">
          lowongan ditemukan:
          <span className="text-gray-800 font-bold">{data.length}</span>
        </h5>
        <div className="flex flex-col lg:flex-row gap-8  min-h-screen items-stretch">
          {/* Card List */}
          <div className="w-full lg:flex-1 flex flex-col gap-6 mt-3">
            {/* card */}
            {data && loading !== true ? (
              data.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 space-y-4 grid grid-cols-1 md:grid-cols-10 gap-2"
                >
                  <div className="flex items-start gap-4 col-span-6">
                    <img
                      src="/Makerindo_PS.png"
                      alt="Makerindo"
                      className="w-16 h-16"
                    />
                    <div>
                      <h2 className="text-xl font-bold text-cyan-700">
                        {item.title}
                      </h2>
                      {/* <p className="text-gray-600 whitespace-pre-line">
                        <DescriptionRendererLite data={item.description} />
                      </p> */}
                      <div className="mt-6 text-gray-600">
                        <DescriptionRendererLite data={item.description} />
                      </div>
                    </div>
                  </div>
                  <div className="flex col-span-4 items-center flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      👥 {item.qouta} - {getTypeLabel(item.type)} -{" "}
                      {getGradeLabel(item.grade)} -{" "}
                      {dayjs(item.end_date).diff(
                        dayjs(item.start_date),
                        "month"
                      )}{" "}
                      bulan
                    </div>
                    <div className="flex items-center gap-1">{`${item.company.address}, ${item.city_regency.name}, ${item.province.name}`}</div>
                    {item.is_paid && (
                      <div className="flex items-center gap-1">💰 Paid</div>
                    )}
                    <button className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100">
                      💾 Simpan
                    </button>
                    <button
                      onClick={() => router.push(`/lowongan/${item.id}`)}
                      className="px-4 py-2 rounded-md bg-cyan-700 text-white hover:bg-cyan-800"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <LoaderData />
            )}
          </div>
          {/* Filter Box */}
          <div className="w-full lg:w-1/4 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6 lg:sticky lg:top-20">
              <h3 className="text-lg font-semibold mb-4">Filter Lowongan</h3>

              {/* Provinsi */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => handleToggle("provinsi")}
                  className="w-full flex items-center justify-between text-left font-medium text-gray-700 mb-3"
                >
                  Provinsi
                  <svg
                    className={`w-4 h-4 transform transition-transform ${
                      openFilter === "provinsi" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {openFilter === "provinsi" && (
                  <div className="filter-dropdown space-y-2">
                    {provinces.map((prov) => (
                      <label className="flex items-center" key={prov.id}>
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={filters.provinsi.includes(prov.name)}
                          onChange={() =>
                            handleFilterChange("provinsi", prov.name)
                          }
                        />
                        {prov.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Kota */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => handleToggle("kota")}
                  className="w-full flex items-center justify-between text-left font-medium text-gray-700 mb-3"
                >
                  Kabupaten / Kota
                  <svg
                    className={`w-4 h-4 transform transition-transform ${
                      openFilter === "kota" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {openFilter === "kota" && (
                  <div className="filter-dropdown space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={filters.kota.includes("Bandung")}
                        onChange={() => handleFilterChange("kota", "Bandung")}
                      />{" "}
                      Bandung
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={filters.kota.includes("Bekasi")}
                        onChange={() => handleFilterChange("kota", "Bekasi")}
                      />{" "}
                      Bekasi
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={filters.kota.includes("Tangerang")}
                        onChange={() => handleFilterChange("kota", "Tangerang")}
                      />{" "}
                      Tangerang
                    </label>
                  </div>
                )}
              </div>

              {/* Pendidikan */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => handleToggle("pendidikan")}
                  className="w-full flex items-center justify-between text-left font-medium text-gray-700 mb-3"
                >
                  Tingkat Pendidikan
                  <svg
                    className={`w-4 h-4 transform transition-transform ${
                      openFilter === "pendidikan" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {openFilter === "pendidikan" && (
                  <div className="filter-dropdown space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={filters.pendidikan.includes("smk")}
                        onChange={() => handleFilterChange("pendidikan", "smk")}
                      />
                      SMK
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={filters.pendidikan.includes("mahasiswa")}
                        onChange={() =>
                          handleFilterChange("pendidikan", "mahasiswa")
                        }
                      />
                      Mahasiswa
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={filters.pendidikan.includes("all")}
                        onChange={() => handleFilterChange("pendidikan", "all")}
                      />
                      Semua
                    </label>
                  </div>
                )}
              </div>

              {/* Durasi */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => handleToggle("durasi")}
                  className="w-full flex items-center justify-between text-left font-medium text-gray-700 mb-3"
                >
                  Durasi Magang
                  <svg
                    className={`w-4 h-4 transform transition-transform ${
                      openFilter === "durasi" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                {openFilter === "durasi" && (
                  <div className="filter-dropdown space-y-2">
                    {durations.map((duration) => (
                      <label className="flex items-center" key={duration.id}>
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={filters.durasi.includes(duration.id)}
                          onChange={() =>
                            handleFilterChange("durasi", duration.id)
                          }
                        />
                        {duration.duration_value} {duration.duration_unit}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
