"use client";

import ContactPage from "@/components/Contact";
import FooterPage from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useState } from "react";
import UnderConstruction from "@/components/UnderConstruction";

const cards = [
  {
    title: "Menambah Pengalaman",
    desc: "Jaminan Pengalaman dengan industry industry yang terpercaya dan ter pantau dengan baik",
    bg: "bg-[url(/images/pengalaman.jpeg)] bg-cover",
    gradient: "bg-gradient-to-t from-black/50 from-20% to-white/0",
  },
  {
    title: "Meningkatkan Wawasan",
    desc: "Menambah wawasan baru terkait ragam dunia industry yang ada",
    bg: "bg-[url(/images/wawasan.jpeg)] bg-cover",
    gradient: "bg-gradient-to-t from-black/50 from-20% to-white/0",
  },
  {
    title: "Mudah",
    desc: "Memudah kan para Siswa atau Mahasiswa yang mencari tempat magang yang bagus dan berkualitas",
    bg: "bg-[url(/images/mudah.jpeg)] bg-cover",
    gradient: "bg-gradient-to-t from-black/50 from-20% to-white/0",
  },
];

export default function AboutPage() {
  const [active, setActive] = useState(0);

  const prev = () =>
    setActive((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  const next = () =>
    setActive((prev) => (prev === cards.length - 1 ? 0 : prev + 1));

  return (
    <>
      <Navigation section={""} setSection={() => {}} />
      {/* Section 1: Tentang Kami */}

      {/* <UnderConstruction /> */}
      <section className="grid grid-cols-1 md:grid-cols-10 gap-6 mx-4 md:mx-20 mt-10">
        <div className="md:col-span-4">
          <h5 className="text-accent mb-3 md:mb-5">Tentang kami</h5>
          <h1 className="text-gray-700 text-2xl md:text-3xl font-bold">
            Solusi Magang Terpercaya bagi Mahasiswa dan Talenta Muda
          </h1>
        </div>
        <div className="text-gray-600 flex items-center md:col-span-6 mt-4 md:mt-0">
          <p>
            Prakerin adalah sebuah platform magang digital yang dibuat untuk
            memudahkan mahasiswa dan talenta muda Indonesia dalam menemukan
            pengalaman kerja nyata. Kami menyediakan berbagai peluang magang
            terverifikasi dari perusahaan terpercaya, lengkap dengan bimbingan,
            pelatihan, dan dukungan untuk membangun karier profesionalmu sejak
            dini.
          </p>
        </div>
      </section>

      {/* Section 2: Our Story & Mission */}
      <section className="grid grid-cols-1 md:grid-cols-10 md:grid-rows-2 md:max-h-100 gap-4 mx-4 md:mx-20 mt-10">
        <div
          className={`grid grid-cols-1 grid-rows-7 md:col-span-6 min-h-80 max-h-80 overflow-hidden md:max-h-100 row-span-2 rounded-2xl w-full text-white shadow-xl transition-all duration-500 ${cards[active].bg}`}
        >
          <div className="row-span-4 flex items-end justify-between p-5">
            <button
              onClick={prev}
              className="p-2 rounded-full w-10 h-10 flex items-center justify-center bg-gray-600/50 hover:bg-gray-300 text-xl"
              aria-label="Sebelumnya"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-arrow-left-short"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
                />
              </svg>
            </button>
            <button
              onClick={next}
              className="p-2 rounded-full w-10 h-10 flex items-center justify-center bg-gray-600/50 hover:bg-gray-300 text-xl"
              aria-label="Berikutnya"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-arrow-right-short"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                />
              </svg>
            </button>
          </div>
          <div
            className={`rounded-2xl row-span-3 ${cards[active].gradient} p-5 overflow-hidden`}
          >
            <h1 className="text-xl md:text-2xl font-bold">
              {cards[active].title}
            </h1>
            <div className="overflow-hidden mb-10">
              <p className="text-xs md:text-base mt-2">{cards[active].desc}</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-400 hover:bg-blue-500 col-span-1 md:col-span-4 rounded-2xl grid grid-flow-col grid-rows-5 min-h-[150px] mt-4 md:mt-0">
          <div className="col-span-3 row-span-2"></div>
          <div className="col-span-2 p-5 row-span-3 text-white">
            <h1 className="text-xl md:text-2xl font-bold">Visi</h1>
            <p className="text-xs md:text-xs">
              Menjadi platform magang digital terpercaya yang menjadi jembatan
              utama antara mahasiswa, talenta muda, dan dunia kerja profesional
              di Indonesia.
            </p>
          </div>
        </div>
        <div className="bg-accent col-span-1 md:col-span-4 rounded-2xl grid grid-flow-col grid-rows-5 min-h-[150px] mt-4 md:mt-0">
            <div className="col-span-3 row-span-2 hidden lg:block transition-all duration-300 hover:opacity-0"></div>
            <div className="col-span-2 p-5 row-span-3 text-white bg-black/10 transition-all duration-300 hover:row-span-5 hover:bg-black/0">
            <h1 className="text-xl md:text-2xl font-bold">Our Mission</h1>
            <p className="text-xs md:text-xs">
              1. Menyediakan peluang magang terverifikasi dari perusahaan
              terpercaya di berbagai bidang industri.
              <br />
              2. Membekali mahasiswa dan talenta muda dengan pelatihan,
              bimbingan, dan pengalaman kerja nyata.
              <br />
              3. Membangun ekosistem karier digital yang mendukung pertumbuhan
              profesional sejak dini.
              <br />
              4. Menjadi mitra strategis perusahaan dalam menemukan talenta muda
              potensial.
            </p>
          </div>
        </div>
      </section>
      <ContactPage />
      <FooterPage />
    </>
  );
}
