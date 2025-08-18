import { Archive, Bookmark, BriefcaseBusiness, Funnel, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SiswaLowongan() {
    const [showFilter, setShowFilter] = useState(true);
    return(
        <>
         <div className=" mb-8">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex justify-between">
                        <div className="text-accent-dark">
                            <h1 className="font-extrabold  text-2xl">4</h1>
                            <h3 className=" text-md">Total Pengajuan</h3>
                        </div>
                        <BriefcaseBusiness className="text-accent w-7 h-7 my-auto" />
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex justify-between">
                        <div className="text-accent-dark">
                            <h1 className="font-extrabold  text-2xl">4</h1>
                            <h3 className=" text-md">Total Pengajuan</h3>
                        </div>
                        <BriefcaseBusiness className="text-accent w-7 h-7 my-auto" />
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex justify-between">
                        <div className="text-accent-dark">
                            <h1 className="font-extrabold  text-2xl">4</h1>
                            <h3 className=" text-md">Total Pengajuan</h3>
                        </div>
                        <BriefcaseBusiness className="text-accent w-7 h-7 my-auto" />
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex justify-between">
                        <div className="text-accent-dark">
                            <h1 className="font-extrabold  text-2xl">4</h1>
                            <h3 className=" text-md">Total Pengajuan</h3>
                        </div>
                        <BriefcaseBusiness className="text-accent w-7 h-7 my-auto" />
                    </div>
                </div>
            </div>
            <div className="">
                <div className="flex justify-between">
                    <div className="flex space-x-3 lg:pb-3  mb-3">
                        <input type="text" name="search" className=" rounded-xl p-3  w-80 bg-white border border-gray-200 text-black" placeholder="Cari Lowongan Magang" />
                        <button type="button" onClick={() => setShowFilter(!showFilter)} className="flex rounded-xl bg-white border border-accent text-accent hover:bg-accent transition-colors hover:text-white p-3"><Funnel className="w-5 h-5" /> Filter</button>
                    </div>
                    <Link href={'/dashboard/lowongan/archive'} className="flex bg-accent text-white p-3 max-h-12 items-center rounded-xl">Tersimpan <Archive className="ml-5" /></Link>
                </div>
                <div className={`${showFilter ? "grid" : "hidden"} bg-white grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 border p-3 rounded-lg shadow-sm`}>
                    <select name="provinsi" className="p-3 rounded-lg border border-gray-300 bg-gray-200 text-black">
                        <option value="id">Bandung</option>
                        <option value="id">Jakarta</option>
                        <option value="id">Surabaya</option>
                    </select>
                    <select name="provinsi" className="p-3 rounded-lg border border-gray-300 bg-gray-200 text-black">
                        <option value="id">Bandung</option>
                        <option value="id">Jakarta</option>
                        <option value="id">Surabaya</option>
                    </select>
                    <select name="provinsi" className="p-3 rounded-lg border border-gray-300 bg-gray-200 text-black">
                        <option value="id">Bandung</option>
                        <option value="id">Jakarta</option>
                        <option value="id">Surabaya</option>
                    </select>
                    <select name="provinsi" className="p-3 rounded-lg border border-gray-300 bg-gray-200 text-black">
                        <option value="id">Bandung</option>
                        <option value="id">Jakarta</option>
                        <option value="id">Surabaya</option>
                    </select>
                    <select name="provinsi" className="p-3 rounded-lg border border-gray-300 bg-gray-200 text-black">
                        <option value="id">Bandung</option>
                        <option value="id">Jakarta</option>
                        <option value="id">Surabaya</option>
                    </select>

                    <button type="button" className="text-center text-black">Reset</button>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                <Link href={'lowongan/titit'} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900 text-lg mb-3">Social Media Marketing</h3>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">IG</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg">PT Makerindo Prima Solusi</h3>
                                <div className="flex text-sm text-gray-500 space-x-2">
                                    <MapPin className="w-4 h-4 my-auto" />
                                    <p className="">Kabupaten Bandung, Jawa Barat</p>
                                </div>
                            </div>
                        </div>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            Paid
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-t-2 border-gray-200 pt-3">
                        <span className="text-gray-500 text-sm">Waktu</span>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Bookmark className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </Link>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900 text-lg mb-3">Social Media Marketing</h3>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">IG</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg">PT Makerindo Prima Solusi</h3>
                                <div className="flex text-sm text-gray-500 space-x-2">
                                    <MapPin className="w-4 h-4 my-auto" />
                                    <p className="">Kabupaten Bandung, Jawa Barat</p>
                                </div>
                            </div>
                        </div>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            Paid
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-t-2 border-gray-200 pt-3">
                        <span className="text-gray-500 text-sm">Waktu</span>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Bookmark className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900 text-lg mb-3">Social Media Marketing</h3>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">IG</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg">PT Makerindo Prima Solusi</h3>
                                <div className="flex text-sm text-gray-500 space-x-2">
                                    <MapPin className="w-4 h-4 my-auto" />
                                    <p className="">Kabupaten Bandung, Jawa Barat</p>
                                </div>
                            </div>
                        </div>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            Paid
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-t-2 border-gray-200 pt-3">
                        <span className="text-gray-500 text-sm">Waktu</span>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Bookmark className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900 text-lg mb-3">Social Media Marketing</h3>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">IG</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg">PT Makerindo Prima Solusi</h3>
                                <div className="flex text-sm text-gray-500 space-x-2">
                                    <MapPin className="w-4 h-4 my-auto" />
                                    <p className="">Kabupaten Bandung, Jawa Barat</p>
                                </div>
                            </div>
                        </div>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            Paid
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-t-2 border-gray-200 pt-3">
                        <span className="text-gray-500 text-sm">Waktu</span>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Bookmark className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900 text-lg mb-3">Social Media Marketing</h3>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">IG</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg">PT Makerindo Prima Solusi</h3>
                                <div className="flex text-sm text-gray-500 space-x-2">
                                    <MapPin className="w-4 h-4 my-auto" />
                                    <p className="">Kabupaten Bandung, Jawa Barat</p>
                                </div>
                            </div>
                        </div>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            Paid
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-t-2 border-gray-200 pt-3">
                        <span className="text-gray-500 text-sm">Waktu</span>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Bookmark className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900 text-lg mb-3">Social Media Marketing</h3>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">IG</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg">PT Makerindo Prima Solusi</h3>
                                <div className="flex text-sm text-gray-500 space-x-2">
                                    <MapPin className="w-4 h-4 my-auto" />
                                    <p className="">Kabupaten Bandung, Jawa Barat</p>
                                </div>
                            </div>
                        </div>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            Paid
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-t-2 border-gray-200 pt-3">
                        <span className="text-gray-500 text-sm">Waktu</span>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Bookmark className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}