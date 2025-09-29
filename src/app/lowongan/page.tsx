"use client";
import { useEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../utils/config";
import { useRouter, useSearchParams } from "next/navigation";
import DescriptionRendererLite from "@/components/RenderBlocksLite";
import LoaderData from "@/components/loader";
import { getDurationUnit } from "@/utils/getDurationUnit";
import { ArrowRight, ChevronDown, ChevronRight, Search } from "lucide-react";
import NotFoundComponent from "@/components/NotFoundComponent";

interface ProvinceAndCityRegencyAndField {
  id: string;
  name: string;
}

interface Filter {
  province_id: string[];
  city_regency_id: string[];
  grade: ("smk" | "mahasiswa" | "all" | "")[];
  field_id: string[];
  duration_id: string[];
}

interface Duration {
  id: string;
  duration_value: number;
  duration_unit: string;
}

export default function InternshipPage() {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [inputSearch, setInputSearch] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("search") || "";

  const [provinces, setProvinces] = useState<ProvinceAndCityRegencyAndField[]>(
    []
  );
  const [cityRegencies, setCityRegencies] = useState<
    ProvinceAndCityRegencyAndField[]
  >([]);
  const [durations, setDurations] = useState<Duration[]>([]);
  const [fields, setFields] = useState<ProvinceAndCityRegencyAndField[]>([]);

  const [filterData, setFilterData] = useState<Filter>({
    province_id: [],
    city_regency_id: [],
    grade: [],
    field_id: [],
    duration_id: [],
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchJobOpenings = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await API.get(ENDPOINTS.JOB_OPENINGS, {
        params: {
          province_id: filterData.province_id,
          city_regency_id: filterData.city_regency_id,
          grade: filterData.grade,
          search: search,
          durasi: filterData.duration_id,
          field_id: filterData.field_id,
        },
      });
      setData(response.data.data);
      console.log("Data fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (filter: string) => {
    setOpenFilter(openFilter === filter ? null : filter);
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
      case "full_time":
        return "Penuh Waktu";
      case "part_time":
        return "Paruh Waktu";
    }
  };

  const getLocationLabel = (location: string) => {
    switch (location) {
      case "onsite":
        return "WFO";
      case "remote":
        return "WFH";
      case "hybrid":
        return "WFO & WFH";
      case "onsite":
        return "WFO";
    }
  };

  const fetchCityRegencies = async () => {
    if (filterData.province_id.length === 0) {
      setCityRegencies([]);
      return;
    }

    try {
      const response = await API.get(ENDPOINTS.CITY_REGENCIES, {
        params: {
          province_id: filterData.province_id,
        },
      });
      console.log("City regencies fetched:", response.data.data);
      setCityRegencies(response.data.data);
    } catch (error) {
      console.error("Error fetching city regencies:", error);
    }
  };

  useEffect(() => {
    Promise.all([fetchProvinces(), fetchDurations(), fetchFields()]);
  }, []);

  useEffect(() => {
    console.log("Filters updated:", filterData);
    fetchJobOpenings();
  }, [filterData, search]);

  useEffect(() => {
    setInputSearch(keyword);
    setSearch(keyword);
  }, [keyword]);

  useEffect(() => {
    fetchCityRegencies();
  }, [filterData.province_id]);

  return (
    <>
      <section className="flex flex-col items-center text-center justify-center mt-15">
        <h1 className="text-3xl font-bold text-accent mb-5">Lowongan Magang</h1>
        <p className="text-gray-500 text-xl">
          Temukan peluang magang dari berbagai perusahaan ternama. Daftar,
          lamar, dan mulai perjalanan kariermu bersama kami.
        </p>

        <div className="relative items-center rounded-full shadow-md w-xl border border-gray-200 bg-gray-200/50 flex mt-8">
          <input
            type="text"
            onChange={(e) => setInputSearch(e.target.value)}
            value={inputSearch}
            placeholder="Cari lowongan magang impian anda..."
            className="w-full pl-12 pr-14 py-3 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 rounded-full"
          />
          <Search className="absolute left-4 w-5 h-5 text-gray-400" />
          <button
            onClick={handleSearchChange}
            className="absolute right-4 bg-accent-dark w-8 h-8  rounded-full text-white hover:bg-prakerin-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <ArrowRight className=" w-6 h-6 m-auto" />
          </button>
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
          <span className="text-gray-800 font-bold"> {data.length}</span>
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
                      {getLocationLabel(item.location)} -{" "}
                      {getGradeLabel(item.grade)} -{" "}
                      {item.duration?.duration_value}{" "}
                      {getDurationUnit(item.duration?.duration_unit)}
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

            {data.length === 0 && loading === false && (
              <div className="text-center py-12 col-span-2 ">
                <NotFoundComponent text="Tidak ada lowongan yang ditemukan." />
              </div>
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
                  <ChevronDown
                    className={`w-4 h-4 transform transition-transform ${
                      openFilter === "provinsi" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFilter === "provinsi" && (
                  <div className="filter-dropdown space-y-2">
                    {provinces.map((prov) => (
                      <label className="flex items-center" key={prov.id}>
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={filterData.province_id.includes(prov.id)}
                          onChange={() => {
                            setFilterData((prev) => ({
                              ...prev,
                              province_id: prev.province_id.includes(prov.id)
                                ? prev.province_id.filter(
                                    (id) => id !== prov.id
                                  )
                                : [...prev.province_id, prov.id],
                            }));
                          }}
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
                  <ChevronDown
                    className={`w-4 h-4 transform transition-transform ${
                      openFilter === "kota" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFilter === "kota" && (
                  <div className="filter-dropdown space-y-2">
                    {cityRegencies.length === 0 ? (
                      <div className="text-center py-12 col-span-2 ">
                        <NotFoundComponent text="Tidak ada kota atau kabupaten yang ditemukan." />
                      </div>
                    ) : (
                      <>
                        {cityRegencies.map((cityRegency) => (
                          <label
                            className="flex items-center"
                            key={cityRegency.id}
                          >
                            <input
                              type="checkbox"
                              className="mr-2"
                              checked={filterData.city_regency_id.includes(
                                cityRegency.id
                              )}
                              onChange={() => {
                                setFilterData((prev) => ({
                                  ...prev,
                                  city_regency_id:
                                    prev.city_regency_id.includes(
                                      cityRegency.id
                                    )
                                      ? prev.city_regency_id.filter(
                                          (id) => id !== cityRegency.id
                                        )
                                      : [
                                          ...prev.city_regency_id,
                                          cityRegency.id,
                                        ],
                                }));
                              }}
                            />
                            {cityRegency.name}
                          </label>
                        ))}
                      </>
                    )}
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
                  <ChevronDown
                    className={`w-4 h-4 transform transition-transform ${
                      openFilter === "pendidikan" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFilter === "pendidikan" && (
                  <div className="filter-dropdown space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={filterData.grade.includes("smk")}
                        onChange={() =>
                          setFilterData((prev) => ({
                            ...prev,
                            grade: prev.grade.includes("smk")
                              ? prev.grade.filter((g) => g !== "smk")
                              : [...prev.grade, "smk"],
                          }))
                        }
                      />
                      SMK
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={filterData.grade.includes("mahasiswa")}
                        onChange={() =>
                          setFilterData((prev) => ({
                            ...prev,
                            grade: prev.grade.includes("mahasiswa")
                              ? prev.grade.filter((g) => g !== "mahasiswa")
                              : [...prev.grade, "mahasiswa"],
                          }))
                        }
                      />
                      Mahasiswa
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={filterData.grade.includes("all")}
                        onChange={() =>
                          setFilterData((prev) => ({
                            ...prev,
                            grade: prev.grade.includes("all")
                              ? prev.grade.filter((g) => g !== "all")
                              : [...prev.grade, "all"],
                          }))
                        }
                      />
                      Semua
                    </label>
                  </div>
                )}
              </div>

              {/* Bidang */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => handleToggle("field")}
                  className="w-full flex items-center justify-between text-left font-medium text-gray-700 mb-3"
                >
                  Bidang Magang
                  <ChevronDown
                    className={`w-4 h-4 transform transition-transform ${
                      openFilter === "field" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openFilter === "field" && (
                  <div className="filter-dropdown space-y-2">
                    {fields.map((field) => (
                      <label className="flex items-center" key={field.id}>
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={filterData.field_id.includes(field.id)}
                          onChange={() =>
                            setFilterData((prev) => ({
                              ...prev,
                              field_id: prev.field_id.includes(field.id)
                                ? prev.field_id.filter((id) => id !== field.id)
                                : [...prev.field_id, field.id],
                            }))
                          }
                        />
                        {field.name}
                      </label>
                    ))}
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
                  <ChevronDown
                    className={`w-4 h-4 transform transition-transform ${
                      openFilter === "durasi" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openFilter === "durasi" && (
                  <div className="filter-dropdown space-y-2">
                    {durations.map((duration) => (
                      <label className="flex items-center" key={duration.id}>
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={filterData.duration_id.includes(duration.id)}
                          onChange={() =>
                            setFilterData((prev) => ({
                              ...prev,
                              duration_id: prev.duration_id.includes(
                                duration.id
                              )
                                ? prev.duration_id.filter(
                                    (id) => id !== duration.id
                                  )
                                : [...prev.duration_id, duration.id],
                            }))
                          }
                        />
                        {duration.duration_value}{" "}
                        {getDurationUnit(duration.duration_unit)}
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
