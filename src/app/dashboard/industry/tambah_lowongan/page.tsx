'use client'
import dynamic from "next/dynamic";
import { Briefcase, BriefcaseBusiness, Calendar, Upload } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { EditorProps } from "@/components/Editor";

const Editor = dynamic<EditorProps>(() => import('@/components/Editor'), {
    ssr: false,
});

const tambahLowonganPage: React.FC = () => {
    const [selectedInternshipType, setSelectedInternshipType] = useState('');
    const [editorData, setEditorData] = useState<any>(null);

    const [selectedDuration, setSelectedDuration] = useState('');
    const [selectedPaidStatus, setSelectedPaidStatus] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted');
    };
    const handleEditorChange = (data: any) => {
        setEditorData(data);
        console.log('Editor data:', data);
    };
    return (
        <main className="p-6">
            <h1 className="text-accent-dark text-sm mb-5"><Link href={'/dashboard/lowongan'}>Lowongan</Link> / Tambah Lowongan</h1>
            <div className="flex items-center  space-x-2 font-extrabold text-accent">
                <BriefcaseBusiness className="w-5 h-5" />
                <h2 className="text-2xl mt-2">lowongan Magang</h2>
            </div>
            {/* Form Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 m-auto my-10 max-w-4xl">
                <div className="flex items-center gap-2 mb-6">
                    <Briefcase className="text-accent" size={24} />
                    <h1 className="text-xl font-semibold text-gray-800">Lowongan Magang</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="p-4">
                        <h2 className="font-medium text-gray-800 mb-4">Tambah Lowongan</h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Silahkan isi semua informasi yang dibutuhkan
                        </p>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-gray-600">
                            {/* Nama Lowongan */}
                            <div className="lg:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Lowongan
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                                    placeholder="Masukkan nama lowongan"
                                />
                            </div>

                            {/* Jenis Magang */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Jenis Magang
                                </label>
                                <select
                                    value={selectedInternshipType}
                                    onChange={(e) => setSelectedInternshipType(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                                >
                                    <option value="">Pilih jenis magang</option>
                                    <option value="fulltime">Full Time</option>
                                    <option value="parttime">Part Time</option>
                                    <option value="remote">Remote</option>
                                </select>
                            </div>

                            {/* Mulai Magang */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mulai Magang
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                                    />
                                    {/* <Calendar className="absolute right-3 top-2.5 text-gray-400" size={18} /> */}
                                </div>
                            </div>

                            {/* Durasi Magang */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Durasi Magang
                                </label>
                                <select
                                    value={selectedDuration}
                                    onChange={(e) => setSelectedDuration(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                                >
                                    <option value="">Pilih durasi</option>
                                    <option value="1">1 Bulan</option>
                                    <option value="2">2 Bulan</option>
                                    <option value="3">3 Bulan</option>
                                    <option value="6">6 Bulan</option>
                                    <option value="12">1 Tahun</option>
                                </select>
                            </div>

                            {/* Paid/Unpaid */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Paid / Unpaid
                                </label>
                                <select
                                    value={selectedPaidStatus}
                                    onChange={(e) => setSelectedPaidStatus(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                                >
                                    <option value="">Pilih status</option>
                                    <option value="paid">Paid</option>
                                    <option value="unpaid">Unpaid</option>
                                </select>
                            </div>

                            {/* Upload File */}
                            <div className="lg:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Deskripsi
                                </label>
                                <Editor onChange={handleEditorChange} />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-end">
                            <button
                                type="button"
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-colors"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default tambahLowonganPage;