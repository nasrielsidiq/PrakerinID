'use client'
// import { File } from "buffer";
import { BriefcaseBusiness, CircleAlert, Download, Edit, Eye, FileText, Search, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Lamaran {
    id: number;
    name: string;
    school_name: string,
    jurusan: string,
    status: 'Pengajuan' | 'Ditolak' | 'Test' | 'Diterima'
    application: File | null
    color?: string
}

const lamaranPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const lamaran: Lamaran[] = [
        {
            id: 1,
            name: 'Immanuel Never - Frontend',
            school_name: 'SMK YPC Tasikmalaya',
            jurusan: 'PPLG',
            status: 'Pengajuan',
            color: 'text-green-500',
            application: null
        },
        {
            id: 2,
            name: 'Immanuel Never - Frontend',
            school_name: 'SMK YPC Garut',
            jurusan: 'PPLG',
            status: 'Ditolak',
            color: 'text-red-500',
            application: null
        },
        {
            id: 3,
            name: 'Immanuel Never - Frontend',
            school_name: 'SMK YPC Ciamis',
            jurusan: 'PPLG',
            status: 'Test',
            color: 'text-orange-500',
            application: null
        },
    ];
    const router = useRouter();
    const filteredApplications = lamaran.filter(application =>
        application.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <main className="p-6">
            <h1 className="text-accent-dark text-sm mb-5">Lamaran Magang</h1>
            <div className="flex items-center mb-8  space-x-2 font-extrabold text-accent">
                <BriefcaseBusiness className="w-5 h-5" />
                <h2 className="text-2xl mt-2">Lamaran Magang</h2>
            </div>
            <div className="rounded-t-2xl  bg-accent">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Cari Siswa..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 text-white placeholder-teal-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                </div>
            </div>
            <div className="bg-white rounded-b-2xl shadow-md overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asal Sekolah</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jurusan</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">application</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredApplications.map((application, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.school_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.jurusan}</td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${application.color}`}>{application.status}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white"><span className="bg-green-500 rounded-full p-1">{"downloaded"}</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex space-x-2">
                                            <button onClick={() => router.push(`lamaran/${application.id}`)} className="text-blue-600 hover:text-blue-800 cursor-pointer">
                                                <CircleAlert size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden">
                    {filteredApplications.map((application) => (
                        <div key={application.id} className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-medium text-gray-900">{application.name}</h3>
                                <span className="text-sm text-gray-500">#{application.id}</span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-3">
                                <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-medium flex items-center">
                                    <Download size={12} className="mr-1" />
                                    Download
                                </button>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium flex items-center">
                                    <Eye size={12} className="mr-1" />
                                    Lihat
                                </button>
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button className="text-blue-600 hover:text-blue-800 p-1">
                                    <Edit size={16} />
                                </button>
                                <button className="text-red-600 hover:text-red-800 p-1">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredApplications.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>Tidak ada application yang ditemukan</p>
                    </div>
                )}
            </div>
        </main>
    )
}
export default lamaranPage;