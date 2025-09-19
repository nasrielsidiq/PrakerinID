import {
  Archive,
  Bookmark,
  BriefcaseBusiness,
  CircleCheck,
  CircleX,
  Funnel,
  MapPin,
  Scale,
  UserCircle,
  Loader
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../utils/config";
import Cookies from "js-cookie";
import { timeAgo } from "@/utils/timeAgo";
import useDebounce from "@/hooks/useDebounce";
import Image from "next/image";
import PaginationComponent from "@/components/PaginationComponent";
import { Page } from "@/models/pagination";
import LoaderData from "../loader";

interface InternshipApplicationCount {
  total: number;
  accepted: number;
  rejected: number;
  in_progress: number;
}

interface JobOpening {
  id: string;
  title: string;
  company: {
    name: string;
  };
  city_regency: {
    name: string;
  };
  province: {
    name: string;
  };
  is_paid: boolean;
  updated_at: string;
  save_job_opening: boolean;
  user: {
    photo_profile: string;
  };
}

interface Province {
  id: string;
  name: string;
}

interface Field {
  id: string;
  name: string;
}

interface Duration {
  id: string;
  duration_value: number;
  duration_unit: string;
}

interface Filter {
  province_id: string;
  city_regency_id: string;
  grade: "smk" | "mahasiswa" | "all" | "";
  field_id: string;
  duration_id: string;
}

// interface Page {
//   activePage: number;
//   page: number;
// }

export default function SiswaLowongan() {
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [filterData, setFilterData] = useState<Filter>({
    province_id: "",
    city_regency_id: "",
    grade: "",
    field_id: "",
    duration_id: "",
  });
  const [internshipApplicationCount, setInternshipApplicationCount] =
    useState<InternshipApplicationCount>({
      total: 0,
      accepted: 0,
      rejected: 0,
      in_progress: 0,
    });
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [durations, setDurations] = useState<Duration[]>([]);
  const [inputSearch, setInputSearch] = useState<string>("");
  const debouncedQuery = useDebounce(inputSearch, 1000);
  const [page, setPage] = useState<Page>({
    activePage: 1,
    pages: 1,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchInternshipAplicationCount = async () => {
    try {
      const response = await API.get(
        `${ENDPOINTS.INTERNSHIP_APPLICATIONS}/count`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );
      if (response.status === 200) {
        setInternshipApplicationCount(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchJobOpenings = async (selectedPage = page.activePage) => {
    if (loading) return;
    setLoading(true);
    try {
      let params = {
        search: inputSearch,
        page: selectedPage,
        limit: 6,
      };

      if (showFilter) {
        params = { ...params, ...filterData };
      }

      const response = await API.get(ENDPOINTS.JOB_OPENINGS, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
        params: {
          ...params,
        },
      });
      if (response.status === 200) {
        console.log(response.data.data);
        setJobOpenings(response.data.data);
        setPage({
          activePage: selectedPage,
          pages: response.data.last_page,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickFavorite = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await API.post(
        `${ENDPOINTS.SAVE_JOB_OPENINGS}`,
        {
          job_opening_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        setJobOpenings((prevJobs) =>
          prevJobs.map((job) =>
            job.id === id
              ? { ...job, save_job_opening: !job.save_job_opening }
              : job
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await API.get(ENDPOINTS.PROVINCES);
      if (response.status === 200) {
        setProvinces(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCityRegencies = async (provinceId: string) => {
    try {
      const response = await API.get(ENDPOINTS.CITY_REGENCIES, {
        params: { province_id: provinceId },
      });
      if (response.status === 200) {
        // setCityRegencies(response.data.data);
      }
    } catch (error) {
      console.log(error);
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

  const fetchDurations = async () => {
    try {
      const response = await API.get(ENDPOINTS.DURATIONS);
      if (response.status === 200) {
        setDurations(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Promise.all([
      fetchInternshipAplicationCount(),
      fetchProvinces(),
      fetchFields(),
      fetchDurations(),
    ]);
  }, []);

  useEffect(() => {
    if (inputSearch.trim() !== "") {
      if (!debouncedQuery) {
        setJobOpenings([]);
        return;
      }
    }

    fetchJobOpenings();
  }, [debouncedQuery, filterData, showFilter, page.activePage]);

  const handleReset = () => {
    setFilterData({
      province_id: "",
      city_regency_id: "",
      grade: "",
      field_id: "",
      duration_id: "",
    });
  };

  const handlePageChange = (selectedPage: number) => {
    setPage((prev) => ({
      ...prev,
      activePage: selectedPage,
    }));
  };

  return (
    <>
      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex justify-between">
            <div className="text-accent-dark">
              <h1 className="font-extrabold  text-2xl">
                {internshipApplicationCount.total}
              </h1>
              <h3 className=" text-md">Total Pengajuan</h3>
            </div>
            <BriefcaseBusiness className="text-accent w-7 h-7 my-auto" />
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex justify-between">
            <div className="text-accent-dark">
              <h1 className="font-extrabold  text-2xl">
                {internshipApplicationCount.accepted}
              </h1>
              <h3 className=" text-md">Diterima</h3>
            </div>
            <CircleCheck className="text-[#03CE7D] w-7 h-7 my-auto" />
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex justify-between">
            <div className="text-accent-dark">
              <h1 className="font-extrabold  text-2xl">
                {internshipApplicationCount.rejected}
              </h1>
              <h3 className=" text-md">Ditolak</h3>
            </div>
            <CircleX className="text-[#FF3C3C] w-7 h-7 my-auto" />
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex justify-between">
            <div className="text-accent-dark">
              <h1 className="font-extrabold  text-2xl">
                {internshipApplicationCount.in_progress}
              </h1>
              <h3 className=" text-md">Berjalan</h3>
            </div>
            <Scale className="text-accent w-7 h-7 my-auto" />
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 lg:pb-3 mb-3">
            <input
              type="text"
              onChange={(e) => setInputSearch(e.target.value)}
              value={inputSearch}
              name="search"
              className="rounded-xl p-3 w-full sm:w-80 bg-white border border-gray-200 text-black"
              placeholder="Cari Lowongan Magang"
            />
            <button
              type="button"
              onClick={() => {
                handleReset();
                setShowFilter(!showFilter);
              }}
              className="flex rounded-xl bg-white border border-accent text-accent hover:bg-accent transition-colors hover:text-white p-3 items-center"
            >
              <Funnel className="w-5 h-5 mr-2" /> Filter
            </button>
          </div>
          <Link
            href={"/dashboard/lowongan/archive"}
            className="flex bg-accent text-white p-3 max-h-12 items-center rounded-xl justify-center"
          >
            Tersimpan <Archive className="ml-2" />
          </Link>
        </div>
        <div
          className={`${
            showFilter ? "grid" : "hidden"
          } grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-3 rounded-lg shadow-sm bg-white mt-2`}
        >
          <select
            name="province_id"
            value={filterData.province_id}
            onChange={(e) => {
              setFilterData({
                ...filterData,
                province_id: e.target.value,
              });
              fetchCityRegencies(e.target.value);
            }}
            className="p-3 rounded-lg border border-gray-300 bg-gray-200 text-black"
          >
            <option value="">Provinsi</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
          <select
            name="city_regency_id"
            value={filterData.city_regency_id}
            onChange={(e) =>
              setFilterData({
                ...filterData,
                city_regency_id: e.target.value,
              })
            }
            className="p-3 rounded-lg border border-gray-300 bg-gray-200 text-black"
          >
            <option value="">Kota/Kabupaten</option>
            <option value="id">Jakarta</option>
          </select>
          <select
            name="grade"
            value={filterData.grade}
            onChange={(e) =>
              setFilterData({
                ...filterData,
                grade: e.target.value as "" | "smk" | "mahasiswa" | "all",
              })
            }
            className="p-3 rounded-lg border border-gray-300 bg-gray-200 text-black"
          >
            <option value="">Tingkat Pendidikan</option>
            <option value="smk">SMK</option>
            <option value="mahasiswa">Mahasiswa</option>
            <option value="all">Semua</option>
          </select>
          <select
            name="field_id"
            value={filterData.field_id}
            onChange={(e) =>
              setFilterData({
                ...filterData,
                field_id: e.target.value,
              })
            }
            className="p-3 rounded-lg border border-gray-300 bg-gray-200 text-black"
          >
            <option value="">Bidang</option>
            {fields.map((field) => (
              <option key={field.id} value={field.id}>
                {field.name}
              </option>
            ))}
          </select>
          <select
            name="duration_id"
            value={filterData.duration_id}
            onChange={(e) =>
              setFilterData({
                ...filterData,
                duration_id: e.target.value,
              })
            }
            className="p-3 rounded-lg border border-gray-300 bg-gray-200 text-black"
          >
            <option value="">Durasi</option>
            {durations.map((duration) => (
              <option key={duration.id} value={duration.id}>
                {duration.duration_value} {duration.duration_unit}
              </option>
            ))}
          </select>

          <button
            onClick={handleReset}
            type="button"
            className="text-center text-black"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-0 sm:p-6">
        {jobOpenings && loading !== true? jobOpenings.map((job) => (
          <Link
            key={job.id}
            href={`lowongan/${job.id}`}
            className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col"
          >
            <h3 className="font-semibold text-gray-900 text-lg mb-3">
              {job.title}
            </h3>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                {job.user.photo_profile ? (
                  <div className="w-15 h-15 relative rounded-full border-white border">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/storage/photo-profile/${job.user.photo_profile}`}
                      alt="Logo Perusahaan"
                      fill
                      sizes="100%"
                      className="object-cover rounded-full"
                    />
                  </div>
                ) : (
                  <UserCircle className="w-15 h-15 text-[var(--color-accent)]" />
                )}
                {/* <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">IG</span>
                  </div>
                </div> */}
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {job.company.name}
                  </h3>
                  <div className="flex text-sm text-gray-500 space-x-2">
                    <MapPin className="w-4 h-4 my-auto" />
                    <p className="">
                      {job.city_regency.name}, {job.province.name}
                    </p>
                  </div>
                </div>
              </div>
              {job.is_paid && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Paid
                </span>
              )}
            </div>

            <div className="flex justify-between items-center border-t-2 border-gray-200 pt-3">
              <span className="text-gray-500 text-sm">
                {timeAgo(job.updated_at)}
              </span>
              <button
                type="button"
                onClick={(e) => handleClickFavorite(e, job.id)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bookmark
                  className={`w-5 h-5 ${
                    job.save_job_opening ? "text-blue-500" : "text-gray-400"
                  }`}
                  fill={job.save_job_opening ? "currentColor" : "none"}
                />
              </button>
            </div>
          </Link>
        )): <Loader />}
      </div>
      <div className="px-2 sm:px-6">
        <PaginationComponent
          activePage={page.activePage}
          totalPages={page.pages}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </div>
    </>
  );
}
