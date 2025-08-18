'use client'
import { ArrowRight, CalendarRangeIcon, ClipboardCheck, } from "lucide-react";
import { useRouter } from "next/navigation";
interface Task {
    id: number;
    title: string;
    deadline: string;
    status: 'Sedang' | 'Belum' | 'Selesai';
    color: string;
}
const task: Task =
{
    id: 1,
    title: 'Analisis Sistem Informasi dikonoha',
    deadline: '12-12-2025',
    status: 'Sedang',
    color: 'bg-green-400'
};
const DetailTasklistPage: React.FC = () => {
    const router = useRouter();
    // const jobPositions = [
    //     { title: 'Frontend Web Developer', duration: '1 hari yang lalu' },
    //     { title: 'Backend Web Developer', duration: '1 hari yang lalu' },
    //     { title: 'Mobile Developer', duration: '5 hari yang lalu' },
    //     { title: 'Frontend Web Developer', duration: '1 hari yang lalu' },
    //     { title: 'Backend Web Developer', duration: '1 hari yang lalu' },
    //     { title: 'Mobile Developer', duration: '5 hari yang lalu' }
    // ]
    return (
        <main className="p-6">
            <h1 className="text-accent-dark text-sm mb-5">Task List/Detail Task</h1>
            <div className="mb-8">
                <div className="flex items-center space-x-2 font-extrabold text-accent">
                    <ClipboardCheck className="w-5 h-5" />
                    <h2 className="text-2xl mt-2">Detail Task</h2>
                </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex flex-col items-end lg:flex-row lg:items-start lg:justify-between gap-4 pb-5 mb-5 border-b-1 border-gray-200">
                    <div className="flex items-start space-x-4">
                        <div className="min-w-0 flex-1">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                {task.title}
                            </h2>
                            <div className="flex items-center space-x-2 text-gray-600 mb-3">
                                <CalendarRangeIcon className="w-4 h-4 flex-shrink-0" />
                                <span className="text-sm">{task.deadline}t</span> 
                            </div>
                            <span className={`text-white ${task.color} rounded-full p-1 px-3`}>
                               {task.status === 'Sedang' ? (
                                    <span className="text-xs font-medium">Sedang</span>
                                ) : task.status === 'Belum' ? (
                                    <span className="text-xs font-medium">Belum</span>
                                ) : (
                                    <span className="text-xs font-medium">Selesai</span>
                                )}
                            </span>
                        </div>
                    </div>
                    <button onClick={() => {router.push('tyd/report')}} className="bg-accent text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 whitespace-nowrap">
                        <span className="">Report</span>
                    </button>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Deskripsi</h3>
                <div className="text-gray-700 text-sm leading-relaxed space-y-3 mb-5">
                    <p>
                        PT Makerindo Cipta Solusi adalah perusahaan teknologi yang bergerak di bidang pengembangan solusi digital dan rekayasa perangkat keras untuk mendukung transformasi industri 4.0 di Indonesia. Berdiri sejak tahun [Tahun Berdiri], kami berkomitmen untuk menghadirkan inovasi terdepan yang mampu menjawab tantangan zaman dengan semangat tumbuh bersama klien.
                    </p>
                    <p>
                        Dengan spesialisasi pada pengembangan sistem IoT (Internet of Things), otomasi industri, serta solusi perangkat lunak kustom, PT Makerindo Cipta Solusi telah menjadi mitra terpercaya bagi berbagai sektor, termasuk manufaktur, agrikultur, pendidikan, dan pemerintahan selama bertahun-tahun.
                    </p>
                    <p>
                        Kami percaya bahwa teknologi bukan hanya alat, tetapi juga jembatan untuk menciptakan efisiensi, transparansi, dan pertumbuhan berkelanjutan. Oleh karena itu, setiap solusi yang kami kembangkan selalu berorientasi pada kebutuhan klien dan kemajuan teknologi terkini.
                    </p>
                </div>
                {/* <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Lowongan Magang di Perusahaan ini
                </h3> */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {jobPositions.map((position, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group bg-white"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-gray-900 text-sm mb-1 truncate">
                                        {position.title}
                                    </h4>
                                    <p className="text-xs text-gray-500">{position.duration}</p>
                                </div>
                                <div className="ml-3 flex-shrink-0">
                                    <div className="w-6 h-6 rounded-full border border-red-500 flex items-center justify-center group-hover:border-red-400 transition-colors">
                                        <ArrowRight className="w-4  text-red-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}
            </div>
        </main>
    )
}
export default DetailTasklistPage;