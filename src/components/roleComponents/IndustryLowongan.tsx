import { Bookmark, Building, CirclePlus, MapPin, X } from "lucide-react";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Lowongan {
    title: string,
    icon: File | null,
    name: string,
    kota: string,
    provinsi: string,
    time: Timestamp | null | number
}

export function IndustryLowongan() {
    const route = useRouter();
    const [lowongan, setLowongan] = useState<Lowongan[]>([
        {
            title: "Social Media Marketing",
            icon: null,
            name: "Makerindo Prima Solusi",
            kota: "Bandung",
            provinsi: "Jawa Barat",
            time: 1
        },
        {
            title: "Social Media Marketing",
            icon: null,
            name: "Makerindo Prima Solusi",
            kota: "Bandung",
            provinsi: "Jawa Barat",
            time: 1
        },
        {
            title: "Social Media Marketing",
            icon: null,
            name: "Makerindo Prima Solusi",
            kota: "Bandung",
            provinsi: "Jawa Barat",
            time: 1
        },
        {
            title: "Social Media Marketing",
            icon: null,
            name: "Makerindo Prima Solusi",
            kota: "Bandung",
            provinsi: "Jawa Barat",
            time: 1
        },
        {
            title: "Social Media Marketing",
            icon: null,
            name: "Makerindo Prima Solusi",
            kota: "Bandung",
            provinsi: "Jawa Barat",
            time: 1
        },
    ]);
    return (
        <>
            <div className="flex justify-end mb-6">
                <button onClick={() => route.push('/dashboard/industry/tambah_lowongan')} className="text-white bg-accent rounded-xl p-3 px-5 flex items-center space-x-2">
                    <CirclePlus className="w-5 h-5 " />
                    <span>Tambah Lowongan</span>
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                {lowongan && lowongan.map((data, index) => (
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow" key={index}>
                        <h3 className="font-semibold text-gray-900 text-lg mb-3">{data.title}</h3>
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">IG</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg">{data.name}</h3>
                                    <div className="flex text-sm text-gray-500 space-x-2">
                                        <MapPin className="w-4 h-4 my-auto" />
                                        <p className="">{data.kota}, {data.provinsi}</p>
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
                ))}
            </div>
        </>
    )
}