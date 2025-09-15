"use client";

import { useEffect, useState, useRef } from "react"; // TAMBAHKAN: useRef
import {
  Home,
  Briefcase,
  FileText,
  Building,
  CheckSquare,
  MessageSquare,
  Award,
  User, // Sudah ada
  Menu,
  X,
  Clock,
  LogOut,
  UsersRound,
  MapPin,
  UserCircle,
  CircleArrowLeft,
  BookOpen,
  MessageSquareText,
  Handshake, // TAMBAHKAN: LogOut
} from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import { API, ENDPOINTS } from "../../../utils/config";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { alertConfirm } from "@/libs/alert";

// Interface MenuItem tidak perlu diubah
interface MenuItem {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
}

interface Profile {
  photo_profile?: string | null;
  name: string;
  email: string;
  role: "Siswa" | "Perusahaan" | "Sekolah" | "Super Admin" | "";
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // --- TAMBAHKAN LOGIKA DROPDOWN DI SINI ---
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [profile, setProfile] = useState<Profile>({
    name: "",
    email: "",
    role: "",
  });
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // --- AKHIR DARI LOGIKA DROPDOWN ---

  const handleLogout = async () => {
    const isConfirm = await alertConfirm("Anda yakin ingin logout?");
    if (!isConfirm) return;

    Cookies.remove("userToken");
    Cookies.remove("authorization");
    router.replace("/");
  };

  useEffect(() => {
    const authorization = Cookies.get("authorization");
    switch (authorization) {
      case "student":
        setMenuItems([
          { icon: Home, label: "Dashboard", href: "/dashboard" },
          {
            icon: Briefcase,
            label: "Lowongan",
            href: "/dashboard/lowongan",
          },
          {
            icon: FileText,
            label: "Curriculum Vitae",
            href: "/dashboard/cv",
          },
          {
            icon: Building,
            label: "Perusahaan",
            href: "/dashboard/perusahaan",
          },
          {
            icon: CheckSquare,
            label: "Task List",
            href: "/dashboard/tasklist",
          },
          {
            icon: MessageSquare,
            label: "Feedback",
            href: "/dashboard/feedback",
          },
          {
            icon: Award,
            label: "Sertifikat",
            href: "/dashboard/sertifikat",
          },
          { icon: User, label: "Profile", href: "/dashboard/profile" },
        ]);
        break;
      case "company":
        setMenuItems([
          {
            icon: Home,
            label: "Dashboard",
            href: "/dashboard",
          },
          {
            icon: Briefcase,
            label: "Lowongan",
            href: "/dashboard/lowongan",
          },
          {
            icon: Briefcase,
            label: "Lamaran",
            href: "/dashboard/industry/lamaran",
          },
          {
            icon: CheckSquare,
            label: "Task List",
            href: "/dashboard/tasklist",
          },
          {
            icon: BookOpen,
            label: "Sekolah",
            href: "/dashboard/sekolah",
          },
          {
            icon: Handshake,
            label: "MOU",
            href: "/dashboard/mou",
          },
          {
            icon: Award,
            label: "Penghargaan",
            href: "/dashboard/penghargaan",
          },
          {
            icon: MessageSquareText,
            label: "Feedback",
            href: "/dashboard/feedback",
          },
          {
            icon: User,
            label: "Profile",
            href: "/dashboard/profile",
          },
        ]);
        break;
      case "school":
        setMenuItems([
          { icon: Home, label: "Dashboard", href: "/dashboard" },
          {
            icon: UsersRound,
            label: "Daftar Siswa",
            href: "/dashboard/school/daftarsiswa",
          },
          {
            icon: MapPin,
            label: "Penempatan",
            href: "/dashboard/school/penempatan",
          },
          {
            icon: Building,
            label: "Perusahaan",
            href: "/dashboard/perusahaan",
          },
          {
            icon: Handshake,
            label: "MOU",
            href: "/dashboard/mou",
          },
          {
            icon: Award,
            label: "Penghargaan",
            href: "/dashboard/penghargaan",
          },
          {
            icon: MessageSquareText,
            label: "Feedback",
            href: "/dashboard/feedback",
          },
          {
            icon: User,
            label: "Profile",
            href: "/dashboard/profile",
          },
        ]);
        break;
      case "super_admin":
        setMenuItems([
          {
            icon: Home,
            label: "Dashboard",
            href: "/dashboard",
          },
          {
            icon: Building,
            label: "Perusahaan",
            href: "/dashboard/perusahaan",
          },
          {
            icon: Briefcase,
            label: "Lowongan",
            href: "/dashboard/lowongan",
          },
          {
            icon: User,
            label: "Profile",
            href: "/dashboard/profile",
          },
        ]);
        break;
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get(`${ENDPOINTS.USERS}/profile`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });
      if (response.status === 200) {
        switch (response.data.data.role) {
          case "student":
            response.data.data.role = "Siswa";
            break;
          case "company":
            response.data.data.role = "Perusahaan";
            break;
          case "school":
            response.data.data.role = "Sekolah";
            break;
          case "super_admin":
            response.data.data.role = "Super Admin";
            break;
          default:
            response.data.data.role = "";
        }
        setProfile(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set waktu pertama kali saat mount
    setTime(new Date());

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!time) return null; // jangan render sampai ada waktu di client

  const timeString = time.toLocaleTimeString("id-ID", { hour12: false });
  const dateString = time.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Sidebar tidak berubah */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        {/* ... Konten sidebar Anda tetap sama ... */}
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center space-x-2">
            <img
              src="/PrakerinID_ico.svg"
              alt="Prakerin.ID Logo"
              className="lg:w-50"
            />
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-8 h-full overflow-y-auto pb-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex bg-accent-light/15 mx-6 p-3 rounded-xl text-accent-dark justify-center space-x-2 ">
            <Clock className="w-7 my-auto h-7 " />
            <div className="">
              <h3 className="font-medium">{timeString}</h3>
              <h3 className="text-xs">{dateString}</h3>
            </div>
          </div>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => {
                setMenuItems((prevItems) =>
                  prevItems.map((prevItem) =>
                    prevItem.label === item.label
                      ? { ...prevItem, active: true }
                      : { ...prevItem, active: false }
                  )
                );
                setSidebarOpen(false);
              }}
              className={`flex rounded-xl items-center mx-6 p-3 my-3 text-gray-700 transition-colors ${
                (
                  item.href === "/dashboard"
                    ? pathName === item.href // hanya match persis
                    : pathName === item.href ||
                      pathName.startsWith(item.href + "/")
                )
                  ? // match exact + anak
                    "bg-accent !text-white shadow-lg font-bold"
                  : "hover:bg-accent/10 hover:text-accent"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* --- MODIFIKASI BAGIAN HEADER DI SINI --- */}
        <header className="fixed top-0 right-0 left-0 lg:left-64 z-40 bg-accent text-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3"
                >
                  <div className="text-right hidden sm:block">
                    <span className="text-sm font-bold block">
                      {profile.name}
                    </span>
                    <span className="text-xs text-gray-200 block">
                      {profile.role}
                    </span>
                  </div>
                  {profile.photo_profile ? (
                    <div className="w-10 h-10 relative rounded-full border-white border">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/storage/photo-profile/${profile.photo_profile}`}
                        alt="Photo Profile"
                        fill
                        sizes="100%"
                        className="object-cover rounded-full"
                      />
                    </div>
                  ) : (
                    <UserCircle className="w-10 h-10 text-white" />
                  )}
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 text-gray-800">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-semibold">{profile.name}</p>
                      <p className="text-xs text-gray-500">{profile.email}</p>
                    </div>
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                    <Link
                      href="/lapor-bug" // Ganti dengan link yang sesuai
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Laporan Bug
                    </Link>
                    <Link
                      href="/hubungi-cs" // Ganti dengan link yang sesuai
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Hubungi CS
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleBack} // Buat fungsi logout jika perlu
                      className="flex items-center w-full px-4 py-2 text-sm text-accent hover:bg-gray-100"
                    >
                      <CircleArrowLeft className="w-4 h-4 mr-2" />
                      Kembali
                    </button>
                    <button
                      onClick={handleLogout} // Buat fungsi logout jika perlu
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        {/* --- AKHIR DARI MODIFIKASI HEADER --- */}

        <main className="pt-20 px-6 pb-6 flex-grow">{children}</main>

        <footer className="bg-white border-t py-4 px-6">
          <p className="text-center text-sm text-gray-500">
            © 2025 Prakerin ID. All rights reserved.
          </p>
        </footer>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
