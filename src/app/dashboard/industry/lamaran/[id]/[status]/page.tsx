'use client'
import { BriefcaseBusiness } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
interface Application {
    image: File | null,
    name: string,
    kelas: string,
    jurusan: string,
    jobs: string,
    description: string,
    cv: File | null
    email: string
}

const statusPage: React.FC = () => {
    const application: Application = {
        image: null,
        name: "Abdul Manaf",
        kelas: "XI",
        jurusan: "PPLG",
        jobs: "Web Developer",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore eius dignissimos officiis quo sequi, enim, et, reprehenderit porro aliquid aspernatur mollitia. Laboriosam repudiandae doloribus et.",
        cv: null,
        email: "manafbinmaaf@gmail.com"
    }
    const router = useRouter();
    const params = useParams();
    const status = params?.status;
    return (
        <main className="px-6">
            <h1 className="text-accent-dark text-sm mb-5">Lamaran Magang / Detail Lamaran Magang</h1>
            <div className="flex items-center mb-8  space-x-2 font-extrabold text-accent">
                <BriefcaseBusiness className="w-5 h-5" />
                <h2 className="text-2xl mt-2">Detail Lamaran Magang</h2>
            </div>
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
                <div className="my-5">
                    <span className="text-gray-800">Email Pelamar: </span> <Link rel="stylesheet" className="text-blue-500 font-medium" href={application.email}>{application.email} </Link>
                </div>
                <div className="my-2">
                    <span className="text-gray-800">Undangan Test: </span>
                </div>
                <div className="bg-gray-200 rounded-2xl text-gray-700 text-sm h-100 leading-relaxed space-y-3 mb-5">
                    <textarea name="message" id="" className="h-full w-full p-5 resize-none focus:border-0 rounded-2xl"></textarea>
                </div>
                <div className="flex justify-end space-x-5">
                    <button onClick={() => router.back()} className="p-3 px-5 bg-gray-300 text-gray-600 rounded-xl">Kembali</button>
                    {status === 'reject' ? (
                        <button className="p-3 px-5 bg-red-500 text-gray-100 rounded-xl">Tolak Lamaran</button>
                    ) : (
                        <button className="p-3 px-5 bg-accent text-gray-100 rounded-xl">Jadwalkan Test</button>
                    )}
                </div>
            </div>
        </main>
    )
}
export default statusPage;