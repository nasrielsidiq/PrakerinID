'use client'
import { BriefcaseBusiness, Globe, Lock, MapPin } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
interface Application {
    image: File | null,
    name: string,
    kelas: string,
    jurusan: string,
    jobs: string,
    description: string,
    cv: File | null
}

const detailLamaran: React.FC = () => {
    const application: Application = {
        image: null,
        name: "Abdul Manaf",
        kelas: "XI",
        jurusan: "PPLG",
        jobs: "Web Developer",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore eius dignissimos officiis quo sequi, enim, et, reprehenderit porro aliquid aspernatur mollitia. Laboriosam repudiandae doloribus et.",
        cv: null
    }
    const router = useRouter();
    const params = useParams();
    const id = params?.id;
    return (
        <main className="p-6">
            <h1 className="text-accent-dark text-sm mb-5">Lamaran Magang / Detail Lamaran Magang</h1>
            <div className="flex items-center mb-8  space-x-2 font-extrabold text-accent">
                <BriefcaseBusiness className="w-5 h-5" />
                <h2 className="text-2xl mt-2">Detail Lamaran Magang</h2>
            </div>
            {/* Description Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex flex-col items-end lg:flex-row lg:items-start lg:justify-between gap-4 pb-5 mb-5 border-b-1 border-gray-200">
                    <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <div className="text-white font-bold text-xs">image</div>
                        </div>
                        <div className="min-w-0 flex-1">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                {application.name}
                            </h2>
                            <div className="flex items-center space-x-2 text-gray-600 mb-1">
                                <span className="text-sm">Kelas {application.kelas} | {application.jurusan}</span>
                            </div>
                            <div className="flex items-center space-x-2 font-medium text-blue-600">
                                <span>
                                    {application.jobs}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Surat Lamaran</h3>
                <div className="text-gray-700 text-sm leading-relaxed space-y-3 mb-5">
                    <p>
                        {application.description}
                    </p>
                    <p>
                        Dengan spesialisasi pada pengembangan sistem IoT (Internet of Things), otomasi industri, serta solusi perangkat lunak kustom, PT Makerindo Cipta Solusi telah menjadi mitra terpercaya bagi berbagai sektor, termasuk manufaktur, agrikultur, pendidikan, dan pemerintahan selama bertahun-tahun.
                    </p>
                    <p>
                        Kami percaya bahwa teknologi bukan hanya alat, tetapi juga jembatan untuk menciptakan efisiensi, transparansi, dan pertumbuhan berkelanjutan. Oleh karena itu, setiap solusi yang kami kembangkan selalu berorientasi pada kebutuhan klien dan kemajuan teknologi terkini.
                    </p>
                </div>
                {/* Content Area - Placeholder for job description */}
                <div className="my-6 text-gray-600">
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
                <div className="flex justify-end space-x-5">
                    <button onClick={() => router.back()} className="p-3 px-5 bg-gray-300 text-gray-600 rounded-xl">Kembali</button>
                    <button onClick={() => router.push(`${id}/reject`)} className="p-3 px-5 bg-red-500 text-gray-100 rounded-xl">Tolak Lamaran</button>
                    <button onClick={() => router.push(`${id}/accept`)} className="p-3 px-5 bg-accent text-gray-100 rounded-xl">Jadwalkan Test</button>
                </div>
            </div>
        </main>
    )
}
export default detailLamaran;