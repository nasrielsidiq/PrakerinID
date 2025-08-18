import { Bookmark, BriefcaseBusiness, Lock, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";   

const DetailLowongan: React.FC = () => {
    return (
        <main className="p-6">
            <h1 className="text-accent-dark text-sm mb-5">Lowongan/Detail Lowongan</h1>
            <div className="mb-8">
                <div className="flex items-center space-x-2 font-extrabold text-accent">
                    <BriefcaseBusiness className="w-5 h-5" />
                    <h2 className="text-2xl mt-2">Detail Lowongan</h2>
                </div>
            </div>
            <div className="mb-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                        <div className="flex items-start gap-4">
                            {/* Company Logo */}
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">M</span>
                                </div>
                            </div>

                            {/* Job Info */}
                            <div className="flex-1 min-w-0">
                                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
                                    Frontend Web Developer
                                </h1>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <span className="text-blue-600 font-medium">PT Makerindo Prima Solusi</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-500 mt-1">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">Kabupaten Bandung, Jawa Barat</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                            <button className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                <span>Chat Perusahaan</span>
                                <Lock className="w-4 h-4" />
                            </button>

                            <button className="flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 px-4 py-2 border border-gray-300 hover:border-blue-300 rounded-lg font-medium transition-colors">
                                <Bookmark className="w-4 h-4" />
                                <span>Simpan</span>
                            </button>

                            <Link href={'titit/apply'} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                                Lamar Sekarang
                            </Link>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200"></div>

                    {/* Content Area - Placeholder for job description */}
                    <div className="mt-6 text-gray-600">
                        {/* <iframe src="/doc/taksonomi prakerin id.pdf" className="w-full h-screen border-0 bg-white/0" ></iframe> */}
                        <object
                            data="/doc/taksonomi prakerin id.pdf"
                            type="application/pdf"
                            width="100%"
                            height="800px"
                        >
                            <p>Browser anjeun teu ngarojong nampilin PDF.
                                <a href="/doc/taksonomi prakerin id.pdf" download>Download PDF</a>.</p>
                        </object>

                    </div>
                </div>
            </div>
        </main>
    )
}
export default DetailLowongan;