"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import { Menu } from "lucide-react";

interface NavigationProps {
  section: string;
  setSection: Dispatch<SetStateAction<string>>;
}

export default function Navigation({ setSection }: NavigationProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const pathName = usePathname();

  const [hash, setHash] = useState("");
  const [isHash, setIsHash] = useState<boolean>(false);

  useEffect(() => {
    const token = Cookies.get("userToken");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    // Mendapatkan hash saat komponen mount
    setHash(window.location.hash);

    // Listener untuk perubahan hash
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    // console.log(router.asPath);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [isHash]);

  const resetMitra = () => {
    setIsHash(!hash);
    setHash("");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/PrakerinID_ico.svg" alt="" />
          </div>

          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              onClick={resetMitra}
              className={`font-semibold hover:text-accent transition-colors duration-300 ${
                pathName === "/" && hash !== "#mitra"
                  ? "text-accent"
                  : "text-gray-700"
              }`}
            >
              Beranda
            </Link>
            <Link
              href="/tentang-kami"
              onClick={resetMitra}
              className={`font-semibold hover:text-accent transition-colors duration-300 ${
                pathName === "/tentang-kami" ? "text-accent" : "text-gray-700"
              }`}
            >
              Tentang Kami
            </Link>
            <Link
              href="/lowongan"
              onClick={resetMitra}
              className={`font-semibold hover:text-accent transition-colors duration-300 ${
                pathName === "/lowongan" || pathName.startsWith("/lowongan/")
                  ? "text-accent"
                  : "text-gray-700"
              }`}
            >
              Lowongan
            </Link>
            <Link
              href="/#mitra"
              onClick={resetMitra}
              className={`font-semibold hover:text-accent transition-colors duration-300 ${
                hash === "#mitra" ? "text-accent" : "text-gray-700"
              }`}
            >
              Mitra
            </Link>
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
            <Menu />
          </button>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" className="md:hidden hidden mt-4 space-y-2">
          <Link
            href="/"
            onClick={resetMitra}
            className={`block py-2 hover:text-prakerin transition-colors duration-300 ${
              pathName === "/" && hash !== "#mitra"
                ? "text-accent"
                : "text-gray-700"
            }`}
          >
            Beranda
          </Link>
          <Link
            href="/tentang-kami"
            onClick={resetMitra}
            className={`block py-2  hover:text-prakerin transition-colors duration-300 ${
              pathName === "/tentang-kami" ? "text-accent" : "text-gray-700"
            }`}
          >
            Tentang Kami
          </Link>
          <Link
            href="/lowongan"
            onClick={resetMitra}
            className={`block py-2  hover:text-prakerin transition-colors duration-300 ${
              pathName === "/lowongan" || pathName.startsWith("/lowongan/")
                ? "text-accent"
                : "text-gray-700"
            }`}
          >
            Lowongan
          </Link>
          <Link
            href="/#mitra"
            onClick={resetMitra}
            className={`block py-2  hover:text-prakerin transition-colors duration-300 ${
              hash === "#mitra" ? "text-accent" : "text-gray-700"
            }`}
          >
            Mitra
          </Link>
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
