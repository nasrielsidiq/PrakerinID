'use client'
import { Briefcase, Calendar, Clock, MapIcon, MapPin, User } from "lucide-react"
import { useRouter } from "next/navigation"

const detailPenempatan: React.FC = () => {
    const route = useRouter();
    return (
        <main className="p-6">
            <h1 className="text-accent-dark text-sm mb-5">Daftar Penempatan Siswa / Detail Penempatan Siswa</h1>
            <div className="mb-8">
                <div className="flex items-center space-x-2 font-extrabold text-accent">
                    <MapPin className="w-5 h-5" />
                    <h2 className="text-2xl mt-2">Detail Penempatan Siswa</h2>
                </div>
            </div>
            <div className="max-w-xl mx-auto">
                {/* Main card */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 overflow-hidden">
                    {/* Card header */}
                    <div className="border-b-1 px-6 py-4">
                        <h2 className="text-accent text-lg font-semibold">Informasi Magang</h2>
                    </div>

                    {/* Card content */}
                    <div className="p-6">
                        <div className="space-y-5">
                            {/* Student info */}
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                                            <User className="w-8 h-8 text-gray-600" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900">Dikaru Wahyudi</h3>
                                        <div className="text-sm text-gray-600">Kelas XI | RPL</div>
                                        <div className="text-sm text-teal-600 mt-1 cursor-pointer hover:underline">
                                            Web Development
                                        </div>
                                    </div>
                                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                                        Sedang Magang
                                    </div>
                                </div>
                            </div>

                            {/* Company info */}
                            <div className="space-y-6">
                                <div className="text-center">
                                    <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
                                        <div className="text-teal-600">
                                            <svg className="w-12 h-12" viewBox="0 0 48 48" fill="currentColor">
                                                <path d="M24 4L6 12v8c0 11.11 7.67 21.47 18 24 10.33-2.53 18-12.89 18-24v-8L24 4zm-4 28l-6-6 2.83-2.83L20 26.34l9.17-9.17L32 20l-12 12z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-1">PT Makerindo Prima Solusi</h4>
                                    <div className="flex items-center justify-center space-x-1 text-sm text-gray-600 mb-4">
                                        <MapIcon className="w-4 h-4" />
                                        <span>Kabupaten Bandung, Jawa Barat</span>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <Calendar className="w-5 h-5 text-teal-600 flex-shrink-0" />
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wider">Durasi</div>
                                            <div className="text-sm font-medium text-gray-900">21 Mei 2025 - 21 Agustus 2025</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <Briefcase className="w-5 h-5 text-teal-600 flex-shrink-0" />
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wider">Role</div>
                                            <div className="text-sm font-medium text-gray-900">Backend Developer</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <Clock className="w-5 h-5 text-teal-600 flex-shrink-0" />
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wider">Tipe Magang</div>
                                            <div className="text-sm font-medium text-gray-900">Fulltime</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action button */}
                        <div className="mt-8 flex justify-end">
                            <button onClick={() => route.back()} className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors">
                                Kembali
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default detailPenempatan