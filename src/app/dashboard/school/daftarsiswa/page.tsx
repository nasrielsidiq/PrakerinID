'use client';
import { CheckSquare, ClipboardCheck, ClipboardCopy, Info, Plus, Search, UsersRound } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Task {
    id: number;
    title: string;
    deadline: string;
    status: 'Sedang' | 'Belum' | 'Selesai';
}

interface Student {
    id: number;
    name: string;
    kelas: string;
    jurusan: string;
    status: "Sedang" | "Belum" | "Selesai";
}
const tasks: Task[] = [
    {
        id: 1,
        title: 'Analisis Sistem Informasi dikonoha',
        deadline: '12-12-2025',
        status: 'Sedang'
    }
];

const students: Student[] = [
    {
        id: 1,
        name: "Muhammad Mufti",
        kelas: "Kelas XII",
        jurusan: "Rekayasa Perangkat Lunak",
        status: "Sedang",
    },
    {
        id: 2,
        name: "Adbul Manaf",
        kelas: "Kelas XII",
        jurusan: "Rekayasa Perangkat Lunak",
        status: "Belum",
    },
    {
        id: 3,
        name: "Abu Lahab",
        kelas: "Kelas XII",
        jurusan: "Rekayasa Perangkat Lunak",
        status: "Selesai",
    },
    {
        id: 4,
        name: "Zayid",
        kelas: "Kelas XII",
        jurusan: "Rekayasa Perangkat Lunak",
        status: "Belum",
    },
]
const DaftarSiswaPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');
    const tabs = ['Semua', 'Belum', 'Sedang', 'Selesai'];
    const router = useRouter();
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Sedang':
                return 'bg-green-100 text-green-800';
            case 'Belum':
                return 'bg-yellow-100 text-yellow-800';
            case 'Selesai':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <main className="p-6">
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-accent-dark text-sm mb-5">Daftar Siswa</h1>
                <div className="mb-8">
                    <div className="flex items-center space-x-2 font-extrabold text-accent">
                        <UsersRound className="w-5 h-5" />
                        <h2 className="text-2xl mt-2">Daftar Siswa</h2>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit mb-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab
                                ? 'bg-accent text-white shadow-sm'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end mb-6">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button onClick={() => router.push('daftarsiswa/permohonan')} className="bg-vip hover:bg-orange-400 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center">
                        <ClipboardCopy size={16} className="mr-1" />
                        Permohonan Pendaftaran
                    </button>
                    <button onClick={() => router.push('daftarsiswa/tambahsiswa')} className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center">
                        <Plus size={16} className="mr-1" />
                        Tambah Siswa
                    </button>
                </div>
            </div>

            {/* Task Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Cari Task..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-accent text-white placeholder-teal-200 pl-10 pr-4 py-3 rounded-t-2xl focus:outline-none focus:ring-2 focus:ring-teal-300"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="text-left p-3 font-medium text-gray-600">No</th>
                                <th className="text-left p-3 font-medium text-gray-600">Name</th>
                                <th className="text-left p-3 font-medium text-gray-600">Kelas / Tingkat</th>
                                <th className="text-left p-3 font-medium text-gray-600">Jurusan</th>
                                <th className="text-left p-3 font-medium text-gray-600">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((task, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="p-4 text-gray-800">{index+1}</td>
                                    <td className="p-4 text-gray-800">{task.name}</td>
                                    <td className="p-4 text-gray-800">{task.kelas}</td>
                                    <td className="p-4 text-gray-800">{task.jurusan}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                                            {task.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State (if no tasks) */}
                {students.length === 0 && (
                    <div className="text-center py-12">
                        <CheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Tidak ada task yang ditemukan</p>
                    </div>
                )}
            </div>
        </main>
    )
}
export default DaftarSiswaPage;