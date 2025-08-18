import { Briefcase, Building, MapPin } from "lucide-react";

const ApplyLowongan: React.FC = () => {
    return (
        <main className="p-6">
            <h1 className="text-accent-dark text-sm mb-5">Lowongan </h1>
                <div className="flex items-center mb-8 space-x-2 font-extrabold text-accent">
                    <Briefcase className="w-5 h-5" />
                    <h2 className="text-2xl mt-2">Detail Lowongan</h2>
                </div>
                <div className="bg-white md:w-7/10 m-auto rounded-lg shadow-sm border p-6">
                    {/* Job Info */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Frontend Web Developer</h2>
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Building className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">PT Makerindo Prima Solusi</h3>
                                <div className="flex items-center text-gray-600 text-sm mt-1">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    Kabupaten Bandung, Jawa Barat
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Application Form */}
                    <div className="space-y-6">
                        {/* CV Selection */}
                        <div>
                            <div className="block text-sm font-medium text-gray-700 mb-2">
                                Pilih CV
                            </div>
                            <select
                                // value={selectedCV}
                                // onChange={(e) => setSelectedCV(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                            >
                                <option value="">Pilih CV yang akan digunakan</option>
                                <option value="cv1">CV Frontend Developer - 2025.pdf</option>
                                <option value="cv2">CV Web Developer - Updated.pdf</option>
                                <option value="cv3">CV React Developer.pdf</option>
                            </select>
                        </div>

                        {/* Cover Letter */}
                        <div>
                            <div className="block text-sm font-medium text-gray-700 mb-2">
                                Surat Lamaran
                            </div>
                            <textarea
                                // value={coverLetter}
                                // onChange={(e) => setCoverLetter(e.target.value)}
                                rows={8}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                                placeholder="Tulis surat lamaran Anda di sini..."
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                // onClick={handleSubmit}
                                className="px-6 py-2 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors duration-200"
                            >
                                Lamar
                            </button>
                        </div>
                    </div>
                </div>
        </main >
    )
}
export default ApplyLowongan;