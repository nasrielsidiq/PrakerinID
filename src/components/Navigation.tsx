"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

interface NavigationProps {
  section: string;
  setSection: Dispatch<SetStateAction<string>>;
}

export default function Navigation({ setSection }: NavigationProps) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleNavigation = (section: string) => {
    setSection(section);
    if (section === "internship") {
      router.push("/lowongan");
    } else if (section === "mou") {
      // Jika sudah di halaman home, scroll ke #mitra
      if (window.location.pathname === "/") {
        document
          .getElementById("mitra")
          ?.scrollIntoView({ behavior: "smooth" });
      } else {
        // Pindah ke home, lalu scroll ke #mitra setelah halaman selesai dimuat
        router.push("/");
        setTimeout(() => {
          document
            .getElementById("mitra")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 500); // delay agar halaman sempat render
      }
    } else if (section === "about") {
      router.push("/tentangKami");
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    const token = Cookies.get("userToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/PrakerinID_ico.svg" alt="" />
          </div>

          <div className="hidden md:flex space-x-8">
            <button
              type="button"
              onClick={() => handleNavigation("home")}
              className="text-gray-700 font-semibold hover:text-accent transition-colors duration-300"
            >
              Beranda
            </button>
            <button
              type="button"
              onClick={() => handleNavigation("about")}
              className="text-gray-700 font-semibold hover:text-accent transition-colors duration-300"
            >
              Tentang Kami
            </button>
            <button
              type="button"
              onClick={() => handleNavigation("internship")}
              className="text-gray-700 font-semibold hover:text-accent transition-colors duration-300"
            >
              Lowongan
            </button>
            <button
              type="button"
              onClick={() => handleNavigation("mou")}
              className="text-gray-700 font-semibold hover:text-accent transition-colors duration-300"
            >
              Mitra
            </button>
          </div>

          <div className="hidden md:flex space-x-4">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="px-4 py-2 font-semibold bg-gradient-to-r from-accent to-accent-light text-white rounded-lg hover:from-accent-light hover:to-accent-light duration-300 transition-all"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/daftar"
                  className="px-4 py-2 font-semibold border border-accent text-accent text-prakerin rounded-lg hover:bg-accent-light hover:border-accent-light hover:text-white transition-all duration-300"
                >
                  Daftar
                </Link>
                <Link
                  href="/masuk"
                  className="px-4 py-2 font-semibold bg-gradient-to-r from-accent to-accent-light text-white rounded-lg hover:from-accent-light hover:to-accent-light duration-300 transition-all"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* <ThemeToggle /> */}

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center justify-center p-2 text-gray-700 hover:text-accent transition-colors duration-300"
            onClick={() => {
              const mobileMenu = document.getElementById("mobile-menu");
              if (mobileMenu) {
                mobileMenu.classList.toggle("hidden");
              }
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 6h18M3 12h18m-18 6h18"
              ></path>
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" className="md:hidden hidden mt-4 space-y-2">
          <button
            type="button"
            onClick={() => handleNavigation("home")}
            className="block py-2 text-gray-700 hover:text-prakerin transition-colors duration-300"
          >
            Beranda
          </button>
          <button
            type="button"
            onClick={() => handleNavigation("about")}
            className="block py-2 text-gray-700 hover:text-prakerin transition-colors duration-300"
          >
            Tentang Kami
          </button>
          <button
            type="button"
            onClick={() => handleNavigation("internship")}
            className="block py-2 text-gray-700 hover:text-prakerin transition-colors duration-300"
          >
            Lowongan
          </button>
          <button
            type="button"
            onClick={() => handleNavigation("mou")}
            className="block py-2 text-gray-700 hover:text-prakerin transition-colors duration-300"
          >
            Mitra
          </button>
          <div className="flex flex-col gap-2 mt-2">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="w-full px-4 py-2 font-semibold bg-gradient-to-r from-accent to-accent-light text-white rounded-lg hover:from-accent-light hover:to-accent-light duration-300 transition-all text-center"
              >
                Dahsboard
              </Link>
            ) : (
              <>
                <Link
                  href="/daftar"
                  className="w-full px-4 py-2 font-semibold border border-accent text-accent rounded-lg hover:bg-accent-light hover:border-accent-light hover:text-white transition-all duration-300 text-center"
                >
                  Daftar
                </Link>
                <Link
                  href="/masuk"
                  className="w-full px-4 py-2 font-semibold bg-gradient-to-r from-accent to-accent-light text-white rounded-lg hover:from-accent-light hover:to-accent-light duration-300 transition-all text-center"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
