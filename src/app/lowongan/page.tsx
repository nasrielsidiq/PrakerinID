"use client";
import ContactPage from "@/components/Contact";
import FooterPage from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/themeToggle";
import { useState } from "react";

export default function InternshipPage() {
    const [openFilter, setOpenFilter] = useState<string | null>(null);

    const handleToggle = (filter: string) => {
        setOpenFilter(openFilter === filter ? null : filter);
    };

    return (
        <>
            <ThemeToggle />
            <Navigation section="internship" setSection={() => null} />
            <section className="flex flex-col items-center text-center justify-center mt-15">
                <h1 className="text-3xl font-bold text-accent mb-5">Lowongan Magang</h1>
                <p className="text-gray-500 text-xl">Temukan peluang magang dari berbagai perusahaan ternama. Daftar, lamar, dan mulai perjalanan kariermu bersama kami.</p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <div className="relative flex border border-gray-300 rounded-full items-center">
                        <div className="relative flex-1">
                            <input type="text"
                                placeholder="Cari lowongan magang impian anda..."
                                className="md:w-150 text-gray-600 dark:text-white px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-prakerin focus:border-transparent transition-all duration-300" />
                            <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <button className="relative bg-accent-dark w-8 h-8 ms-4 me-2 rounded-full text-white hover:bg-prakerin-dark transition-all duration-300 transform hover:scale-105 shadow-lg">
                            <svg className="absolute inset-0 w-8 h-8 m-auto" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                    <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 shadow-sm">Magang Popular</span>
                    <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 shadow-sm">Frontend Developer</span>
                    <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 shadow-sm">Digital Marketing</span>
                    <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 shadow-sm">Backend Developer</span>
                </div>
            </section>
            <section className="px-4 md:px-10 lg:px-20 py-10">
                <h5 className="text-sm text-gray-600">
                    lowongan ditemukan: <span className="text-gray-800 font-bold">15</span>
                </h5>
                <div className="flex flex-col lg:flex-row gap-8  min-h-screen items-stretch">
                    {/* Card List */}
                    <div className="w-full lg:flex-1 flex flex-col gap-6 mt-3">
                        {/* card */}
                        <div className="bg-white rounded-xl shadow-md p-6 space-y-4 grid grid-cols-1 md:grid-cols-10 gap-2">
                            <div className="flex items-start gap-4 col-span-6">
                                <img
                                    src="/Makerindo_PS.png"
                                    alt="Makerindo"
                                    className="w-16 h-16"
                                />
                                <div>
                                    <h2 className="text-xl font-bold text-cyan-700">FrontEnd Developer</h2>
                                    <p className="text-gray-600 whitespace-pre-line">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nihil culpa natus odit similique dolores! Saepe iure nihil magni eos.</p>
                                </div>
                            </div>
                            <div className="flex col-span-4 items-center flex-wrap gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">👥 5 - full time - Level Pemula - 6 bulan</div>
                                <div className="flex items-center gap-1">📍 Komplek Pesona Ciganitri Blok A39, Cipagalo, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40287</div>
                                <div className="flex items-center gap-1">💰 Paid</div>
                                <button className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100">
                                    💾 Simpan
                                </button>
                                <button className="px-4 py-2 rounded-md bg-cyan-700 text-white hover:bg-cyan-800">
                                    Lamar Sekarang
                                </button>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6 space-y-4 grid grid-cols-1 md:grid-cols-10 gap-2">
                            <div className="flex items-start gap-4 col-span-6">
                                <img
                                    src="/Makerindo_PS.png"
                                    alt="Makerindo"
                                    className="w-16 h-16"
                                />
                                <div>
                                    <h2 className="text-xl font-bold text-cyan-700">FrontEnd Developer</h2>
                                    <p className="text-gray-600 whitespace-pre-line">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nihil culpa natus odit similique dolores! Saepe iure nihil magni eos.</p>
                                </div>
                            </div>
                            <div className="flex col-span-4 items-center flex-wrap gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">👥 5 - full time - Level Pemula - 6 bulan</div>
                                <div className="flex items-center gap-1">📍 Komplek Pesona Ciganitri Blok A39, Cipagalo, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40287</div>
                                <div className="flex items-center gap-1">💰 Paid</div>
                                <button className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100">
                                    💾 Simpan
                                </button>
                                <button className="px-4 py-2 rounded-md bg-cyan-700 text-white hover:bg-cyan-800">
                                    Lamar Sekarang
                                </button>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6 space-y-4 grid grid-cols-1 md:grid-cols-10 gap-2">
                            <div className="flex items-start gap-4 col-span-6">
                                <img
                                    src="/Makerindo_PS.png"
                                    alt="Makerindo"
                                    className="w-16 h-16"
                                />
                                <div>
                                    <h2 className="text-xl font-bold text-cyan-700">FrontEnd Developer</h2>
                                    <p className="text-gray-600 whitespace-pre-line">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nihil culpa natus odit similique dolores! Saepe iure nihil magni eos.</p>
                                </div>
                            </div>
                            <div className="flex col-span-4 items-center flex-wrap gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">👥 5 - full time - Level Pemula - 6 bulan</div>
                                <div className="flex items-center gap-1">📍 Komplek Pesona Ciganitri Blok A39, Cipagalo, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40287</div>
                                <div className="flex items-center gap-1">💰 Paid</div>
                                <button className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100">
                                    💾 Simpan
                                </button>
                                <button className="px-4 py-2 rounded-md bg-cyan-700 text-white hover:bg-cyan-800">
                                    Lamar Sekarang
                                </button>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6 space-y-4 grid grid-cols-1 md:grid-cols-10 gap-2">
                            <div className="flex items-start gap-4 col-span-6">
                                <img
                                    src="/Makerindo_PS.png"
                                    alt="Makerindo"
                                    className="w-16 h-16"
                                />
                                <div>
                                    <h2 className="text-xl font-bold text-cyan-700">FrontEnd Developer</h2>
                                    <p className="text-gray-600 whitespace-pre-line">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nihil culpa natus odit similique dolores! Saepe iure nihil magni eos.</p>
                                </div>
                            </div>
                            <div className="flex col-span-4 items-center flex-wrap gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">👥 5 - full time - Level Pemula - 6 bulan</div>
                                <div className="flex items-center gap-1">📍 Komplek Pesona Ciganitri Blok A39, Cipagalo, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40287</div>
                                <div className="flex items-center gap-1">💰 Paid</div>
                                <button className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100">
                                    💾 Simpan
                                </button>
                                <button className="px-4 py-2 rounded-md bg-cyan-700 text-white hover:bg-cyan-800">
                                    Lamar Sekarang
                                </button>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6 space-y-4 grid grid-cols-1 md:grid-cols-10 gap-2">
                            <div className="flex items-start gap-4 col-span-6">
                                <img
                                    src="/Makerindo_PS.png"
                                    alt="Makerindo"
                                    className="w-16 h-16"
                                />
                                <div>
                                    <h2 className="text-xl font-bold text-cyan-700">FrontEnd Developer</h2>
                                    <p className="text-gray-600 whitespace-pre-line">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nihil culpa natus odit similique dolores! Saepe iure nihil magni eos.</p>
                                </div>
                            </div>
                            <div className="flex col-span-4 items-center flex-wrap gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">👥 5 - full time - Level Pemula - 6 bulan</div>
                                <div className="flex items-center gap-1">📍 Komplek Pesona Ciganitri Blok A39, Cipagalo, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40287</div>
                                <div className="flex items-center gap-1">💰 Paid</div>
                                <button className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100">
                                    💾 Simpan
                                </button>
                                <button className="px-4 py-2 rounded-md bg-cyan-700 text-white hover:bg-cyan-800">
                                    Lamar Sekarang
                                </button>
                            </div>
                        </div>
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
                                    <svg className={`w-4 h-4 transform transition-transform ${openFilter === "provinsi" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                {openFilter === "provinsi" && (
                                    <div className="filter-dropdown space-y-2">
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" /> Jawa Barat
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" /> Jakarta
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" /> Jawa Timur
                                        </label>
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
                                    <svg className={`w-4 h-4 transform transition-transform ${openFilter === "kota" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                {openFilter === "kota" && (
                                    <div className="filter-dropdown space-y-2">
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" /> Kota Bandung
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" /> Kabupaten Bandung Barat
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" /> Kota Cimahi
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
                                    <svg className={`w-4 h-4 transform transition-transform ${openFilter === "pendidikan" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                {openFilter === "pendidikan" && (
                                    <div className="filter-dropdown space-y-2">
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" /> SMK
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" /> Mahasiswa
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* Bidang */}
                            <div className="mb-6">
                                <button
                                    type="button"
                                    onClick={() => handleToggle("bidang")}
                                    className="w-full flex items-center justify-between text-left font-medium text-gray-700 mb-3"
                                >
                                    Bidang Magang
                                    <svg className={`w-4 h-4 transform transition-transform ${openFilter === "bidang" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                {openFilter === "bidang" && (
                                    <div className="filter-dropdown space-y-2">
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" /> IT
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" /> Embedding
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
                                    <svg className={`w-4 h-4 transform transition-transform ${openFilter === "durasi" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                {openFilter === "durasi" && (
                                    <div className="filter-dropdown space-y-2">
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" /> 3 Bulan
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" /> 6 Bulan
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" /> 8 Bulan
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ContactPage />
            <FooterPage />
        </>
    );
}