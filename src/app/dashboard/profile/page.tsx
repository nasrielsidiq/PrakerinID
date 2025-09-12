"use client";

import {
  BookOpen,
  Building,
  KeyRound,
  StickyNote,
  Target,
  UploadCloud,
  User,
  UserSquare,
} from "lucide-react";
import { useEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../../utils/config";
import Cookies from "js-cookie";
import { EditorProps } from "@/components/Editor";
import dynamic from "next/dynamic";
import { alertSuccess } from "@/libs/alert";

const Editor = dynamic<EditorProps>(() => import("@/components/Editor"), {
  ssr: false,
});

interface UserForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface CompanyForm {
  
}

interface SchoolForm {
  name: string;
  npsn: string;
  address: string;
  status: string;
  accreditation: string;
  phone_number: string;
  website: string;
}

interface StudentForm {
  name: string;
  date_of_birth: string;
  address: string;
  class: string;
  portofolio_link: string;
  skill: string;
  sosial_media_link: string;
}

interface DescriptionForm {
  description: any;
}

export default function ProfilePage() {
  const [authorization, setAuthorization] = useState("super_admin");
  const [userForm, setUserForm] = useState<UserForm>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [companyForm, setCompanyForm] = useState({});
  const [schoolForm, setSchoolForm] = useState<SchoolForm>({
    name: "",
    npsn: "",
    address: "",
    status: "",
    accreditation: "",
    phone_number: "",
    website: "",
  });
  const [studentForm, setStudentForm] = useState<StudentForm>({
    name: "",
    date_of_birth: "",
    // school: "",
    // gender: "",
    address: "",
    // major: "",
    class: "",
    portofolio_link: "",
    skill: "",
    sosial_media_link: "",
  });
  const [descriptionForm, setDescriptionForm] = useState<DescriptionForm>({
    description: "",
  });
  const [isSubmittingDesc, setIsSubmittingDesc] = useState<boolean>(false);

  const fetchProfile = async () => {
    try {
      const response = await API.get(`${ENDPOINTS.USERS}/profile`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });
      console.log("fetch Profile", response.data.data);
      if (response.status === 200) {
        setUserForm({
          username: response.data.data.username,
          email: response.data.data.email,
          password: "",
          confirmPassword: "",
        });

        switch (response.data.data.role) {
          case "company":
            setCompanyForm(response.data.data.company);
            setDescriptionForm({
              description: response.data.data.company.description,
            });
            break;
          case "school":
            setSchoolForm(response.data.data.school);
            setDescriptionForm({
              description: null,
            });
            break;
          case "student":
            setStudentForm({
              name: response.data.data.student?.name || "",
              date_of_birth: response.data.data.student?.date_of_birth || "",
              address: response.data.data.student?.address || "",
              class: response.data.data.student?.class || "",
              portofolio_link:
                response.data.data.student?.portofolio_link || "",
              skill: response.data.data.student?.skill || "",
              sosial_media_link:
                response.data.data.student?.sosial_media_link || "",
            });
            break;
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent, form: string) => {
    e.preventDefault();
    try {
      let request = {};
      let text = "";

      switch (form) {
        case "user":
          text = "Informasi akun berhasil di simpan!";
          request = userForm;
          break;
        case "company":
          break;
        case "school":
          text = "Informasi sekolah berhasil di simpan!";
          request = schoolForm;
          break;
        case "student":
          text = "Informasi siswa berhasil di simpan!";
          request = studentForm;
          break;
        case "description":
          text = "Deskripsi berhasil di simpan!";
          request = descriptionForm;
          setIsSubmittingDesc(true);
          break;
      }

      console.log("request", request);
      const response = await API.post(
        `${ENDPOINTS.USERS}/profile`,
        {
          ...request,
          _method: "PATCH",
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );

      if (response.status === 200) {
        fetchProfile();
        console.log("Response", response.data.data);
        await alertSuccess(text);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmittingDesc(false);
    }
  };

  const handleEditorChange = (data: any) => {
    setDescriptionForm({
      description: data,
    });
  };

  useEffect(() => {
    fetchProfile();
    setAuthorization(Cookies.get("authorization") as string);
  }, []);

  useEffect(() => {
    console.log("description", descriptionForm);
  }, [descriptionForm]);

  return (
    // Konten utama dimulai di sini
    <main className="space-y-8 p-6">
      {/* Judul Halaman untuk Tampilan Mobile */}
      <h1 className="text-2xl font-semibold text-gray-900 md:hidden">
        Profile
      </h1>

      {/* Grid Utama Halaman */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Wrapper untuk Kartu Foto & Informasi Akun */}
        <div className="lg:col-span-3 grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* --- Kartu Foto --- */}
          <div className="bg-white p-6 rounded-lg shadow-md xl:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <User size={20} className="text-cyan-600" />
              <h3 className="text-lg font-semibold text-gray-800">Foto</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center bg-gray-50 mb-4 relative cursor-pointer">
                {/* Icon upload */}
                <UploadCloud size={48} className="text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Upload Foto</span>

                {/* Input file hidden tapi full area jadi clickable */}
                <input
                  type="file"
                  name="profile_picture"
                  id="profile_picture"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              <p className="text-center text-xs text-gray-500">
                Rekomendasi: Gunakan foto dengan ukuran 200x200 pixel untuk
                hasil terbaik.
              </p>
            </div>
          </div>

          {/* --- Kartu Informasi Akun --- */}
          <div className="bg-white p-6 rounded-lg shadow-md xl:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <KeyRound size={20} className="text-cyan-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Informasi Akun
              </h3>
            </div>
            <form
              className="space-y-6"
              onSubmit={(e) => handleSubmit(e, "user")}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={userForm.username}
                  onChange={(e) =>
                    setUserForm({ ...userForm, username: e.target.value })
                  }
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={userForm.email}
                  onChange={(e) =>
                    setUserForm({ ...userForm, email: e.target.value })
                  }
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={userForm.password}
                    onChange={(e) =>
                      setUserForm({ ...userForm, password: e.target.value })
                    }
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Konfirmasi Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={userForm.confirmPassword}
                    onChange={(e) =>
                      setUserForm({
                        ...userForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* --- Kartu Informasi Perusahaan --- */}
        {authorization === "company" && (
          <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <Building size={20} className="text-cyan-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Informasi Perusahaan
              </h3>
            </div>
            <form
              className="space-y-6"
              onSubmit={(e) => handleSubmit(e, "student")}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nama Perusahaan
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={studentForm?.name}
                    onChange={(e) =>
                      setStudentForm({ ...studentForm, name: e.target.value })
                    }
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="school"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Provinsi
                  </label>
                  <input
                    id="school"
                    type="text"
                    defaultValue="SMKN NEGERI 1 CIPAGALO"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Kota/Kabupaten
                  </label>
                  <input
                    id="gender"
                    type="text"
                    defaultValue="Tidak terdefinisi"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Alamat
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Bandung"
                    value={studentForm?.address}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        address: e.target.value,
                      })
                    }
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Sektor
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Bandung"
                    value={studentForm?.address}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        address: e.target.value,
                      })
                    }
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="social"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    No Telepon
                  </label>
                  <input
                    id="social"
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={studentForm?.sosial_media_link}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        sosial_media_link: e.target.value,
                      })
                    }
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="social"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Website Resmi
                  </label>
                  <input
                    id="social"
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={studentForm?.sosial_media_link}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        sosial_media_link: e.target.value,
                      })
                    }
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        )}

        {/* --- Kartu Informasi Sekolah --- */}
        {authorization === "school" && (
          <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen size={20} className="text-cyan-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Informasi Sekolah/Kampus
              </h3>
            </div>
            <form
              className="space-y-6"
              onSubmit={(e) => handleSubmit(e, "school")}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="school-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nama Sekolah/Kampus
                  </label>
                  <input
                    id="school-name"
                    type="text"
                    placeholder="SMKN 2 SUKABUMI"
                    value={schoolForm.name}
                    onChange={(e) =>
                      setSchoolForm({ ...schoolForm, name: e.target.value })
                    }
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="school-npsn"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    NPSN
                  </label>
                  <input
                    id="school-npsn"
                    type="text"
                    placeholder="20202317"
                    value={schoolForm.npsn ?? ""}
                    onChange={(e) => {
                      setSchoolForm({ ...schoolForm, npsn: e.target.value });
                    }}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="school-address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Alamat Sekolah/Kampus
                  </label>
                  <input
                    id="school-address"
                    type="text"
                    value={schoolForm.address ?? ""}
                    onChange={(e) => {
                      setSchoolForm({ ...schoolForm, address: e.target.value });
                    }}
                    placeholder="JL. PELABUHAN II CIPOHO SUKABUMI"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="school-status"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Status (Negeri/Swasta)
                  </label>
                  <select
                    id="school-status"
                    value={schoolForm.status ?? ""}
                    onChange={(e) => {
                      setSchoolForm({ ...schoolForm, status: e.target.value });
                    }}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  >
                    <option value="">Pilih status</option>
                    <option value="negeri">Negeri</option>
                    <option value="swasta">Swasta</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="school-accreditation"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Akreditasi
                  </label>
                  <select
                    id="school-accreditation"
                    value={schoolForm.accreditation ?? ""}
                    onChange={(e) =>
                      setSchoolForm({
                        ...schoolForm,
                        accreditation: e.target.value,
                      })
                    }
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  >
                    <option value="">Pilih akreditasi</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="school-phone-number"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    No Telepon
                  </label>
                  <input
                    id="school-phone-number"
                    type="text"
                    value={schoolForm.phone_number ?? ""}
                    onChange={(e) => {
                      setSchoolForm({
                        ...schoolForm,
                        phone_number: e.target.value,
                      });
                    }}
                    placeholder="+62-812-3456-7890"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="school-website"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Website Resmi
                  </label>
                  <input
                    id="school-website"
                    type="text"
                    value={schoolForm.website ?? ""}
                    onChange={(e) => {
                      setSchoolForm({
                        ...schoolForm,
                        website: e.target.value,
                      });
                    }}
                    placeholder="https://smkn2smi.sch.id/"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        )}

        {/* --- Kartu Informasi Siswa --- */}
        {authorization === "student" && (
          <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <UserSquare size={20} className="text-cyan-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Informasi Siswa
              </h3>
            </div>
            <form
              className="space-y-6"
              onSubmit={(e) => handleSubmit(e, "student")}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={studentForm?.name}
                    onChange={(e) =>
                      setStudentForm({ ...studentForm, name: e.target.value })
                    }
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="birth"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tempat, Tanggal Lahir
                  </label>
                  <input
                    id="birth"
                    type="text"
                    placeholder="Contoh: Bandung, 1 Januari 2000"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="school"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Asal Sekolah
                  </label>
                  <input
                    id="school"
                    type="text"
                    defaultValue="SMKN NEGERI 1 CIPAGALO"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Jenis Kelamin
                  </label>
                  <input
                    id="gender"
                    type="text"
                    defaultValue="Tidak terdefinisi"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Alamat
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Bandung"
                    value={studentForm?.address}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        address: e.target.value,
                      })
                    }
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="school-phone-number"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Jurusan
                  </label>
                  <input
                    id="major"
                    type="text"
                    defaultValue="RPL"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="class"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Kelas
                  </label>
                  <input
                    id="class"
                    type="text"
                    defaultValue="XI"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="portfolio"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Link Portofolio
                  </label>
                  <input
                    id="portfolio"
                    type="url"
                    placeholder="https://never.dev"
                    value={studentForm?.portofolio_link}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        portofolio_link: e.target.value,
                      })
                    }
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="skills"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Keahlian
                  </label>
                  <input
                    id="skill"
                    type="text"
                    placeholder="Web Development"
                    value={studentForm?.skill}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        skill: e.target.value,
                      })
                    }
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="social"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Link Sosial Media
                  </label>
                  <input
                    id="social"
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={studentForm?.sosial_media_link}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        sosial_media_link: e.target.value,
                      })
                    }
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-2"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        )}

        {/* --- Kartu Deskripsi --- */}
        {authorization !== "student" && authorization !== "super_admin" && (
          <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-3">
            <div className="flex items-center gap-3 mb-6 ">
              <div className="flex gap-2">
                <StickyNote className="text-cyan-600 inline-flex h-full mt-1" />
                <h3 className="text-lg font-semibold text-gray-800 ">
                  Deskripsi
                </h3>
              </div>
            </div>
            <form
              className="space-y-6"
              onSubmit={(e) => handleSubmit(e, "description")}
            >
              <Editor
                onChange={handleEditorChange}
                initialData={descriptionForm.description}
              />
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
                >
                  {isSubmittingDesc ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
