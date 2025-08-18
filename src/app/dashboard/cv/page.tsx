'use client';
import { Download, Edit, Eye, FileText, Plus, Search, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface CVItem {
  id: number;
  name: string;
  type: 'Frontend' | 'Backend';
}

const CvPage:React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const cvData: CVItem[] = [
        { id: 1, name: 'Immanuel Never - Frontend', type: 'Frontend' },
        { id: 2, name: 'Immanuel Never - Backend', type: 'Backend' }
    ];
    const filteredCVs = cvData.filter(cv =>
        cv.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <main className="flex-1 p-4 lg:p-6">
            <h1 className="text-accent-dark text-sm mb-5">Curiculum Vitae</h1>
            <div className="mb-8">
                <div className="flex items-center space-x-2 font-extrabold text-accent">
                    <FileText className="w-5 h-5" />
                    <h2 className="text-2xl mt-2">Curiculum Vitae</h2>
                </div>
            </div>

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end mb-6">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button className="bg-vip hover:bg-orange-400 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center">
                        <Plus size={16} className="mr-1" />
                        Buat CV Pintar
                    </button>
                    <button onClick={() => router.push('cv/create')} className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center">
                        <Plus size={16} className="mr-1" />
                        Tambah CV
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="rounded-t-2xl  bg-accent">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Cari CV..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 text-white placeholder-teal-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                </div>
            </div>

            {/* CV Table */}
            <div className="bg-white rounded-b-2xl shadow-md overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama CV</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Download</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preview</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCVs.map((cv) => (
                                <tr key={cv.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cv.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cv.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-medium">
                                            Download
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium">
                                            Lihat
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex space-x-2">
                                            <button className="text-blue-600 hover:text-blue-800">
                                                <Edit size={16} />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800">
                                                <Trash2 size={16} />
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
                    {filteredCVs.map((cv) => (
                        <div key={cv.id} className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-medium text-gray-900">{cv.name}</h3>
                                <span className="text-sm text-gray-500">#{cv.id}</span>
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

                {filteredCVs.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>Tidak ada CV yang ditemukan</p>
                    </div>
                )}
            </div>
        </main>
    )
}

export default CvPage;