"use client";
import ThemeToggle from "@/components/themeToggle";
import Link from "next/link";
import PrakerinRegistrationSiswaForm from "./AsSiswa";
import { useEffect, useState } from "react";
import PrakerinRegistrationSekolahForm from "./AsSekolah";
import PrakerinRegistrationIndustryForm from "./AsIndustry";

export default function DaftarPage() {
    const [showForm, setShowForm] = useState<string>("");

    useEffect(() => {


    }, [showForm]);
    return (
        <>
            <div className="hidden">
                <ThemeToggle />
            </div>
            <section className={`${showForm ? 'hidden' : 'flex'} items-center justify-center min-h-screen `}>
                <div className="space-y-5 bg-background shadow-2xl md:p-10 rounded-xl flex flex-col items-center md:min-w-100">
                    <img src="PrakerinID_ico.svg" alt="" className="lg:w-50 " />
                    <h1 className="text-2xl font-bold">Daftar</h1>
                    <form className=" md:min-w-75 w-100">
                        <div className="mb-5">
                            <label htmlFor="email" className="block text-sm font-medium">Daftar Sebagai</label>
                            <select onChange={e => { setShowForm(e.target.value) }} id="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-lg px-5">
                                <option value="">Pilih daftar sebagai</option>
                                <option value="siswa">Siswa</option>
                                <option value="sekolah">Sekolah</option>
                                <option value="industry">Industry</option>
                            </select>
                        </div>
                        {/* <button type="submit" className="w-full bg-accent text-white py-2 rounded-lg">Daftar</button> */}
                        <div className="mt-4">
                            <p className="text-sm ">
                                Sudah memilik akun? <Link href="/masuk" className="text-blue-500">Masuk</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </section>
            {showForm && renderForm(showForm)}
        </>
    )

    function renderForm(form: string) {
        if (form === "siswa") return <PrakerinRegistrationSiswaForm setShowForm={setShowForm} />;
        if (form === "sekolah") return <PrakerinRegistrationSekolahForm setShowForm={setShowForm} />;
        if (form === "industry") return <PrakerinRegistrationIndustryForm setShowForm={setShowForm} />;
        return null;
    }
};
