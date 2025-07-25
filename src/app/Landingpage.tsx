"use client";


export default function LandingPage() {
    return (
        <>
            <section id="beranda" className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6  animate-slide-in-left">
                        <div className=" md:max-w-90 flex items-center text-sm text-prakerin font-medium border-1 border-gray-200 rounded-full">
                            <i className="bg-gray-400 rounded-full p-1 px-2 text-white not-italic text-xs me-2">Kemajuan Prakerin.ID</i> Lihat perkembangan kami <img src="icons/ArrowNarrowRight.svg" alt="" className="ms-2" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-accent-light via-accent to-accent-dark bg-clip-text text-transparent leading-tight">
                            Raih Pengalaman Nyata,
                            <span className="text-prakerin">Bangun Karier Impianmu!</span>
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Temukan peluang magang dari berbagai perusahaan terkemuka.
                            Daftar, lamar, dan mulai perjalanan kariermu bersama kami.
                        </p>


                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <div className="relative flex border border-gray-300 rounded-full items-center">
                                <div className="relative flex-1">
                                    <input type="text"
                                        placeholder="Cari lowongan magang impian anda..."
                                        className="w-full px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-prakerin focus:border-transparent transition-all duration-300" />
                                    <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>
                                <button className="relative bg-accent-dark w-8 h-8 ms-4 me-2 rounded-full text-white hover:bg-prakerin-dark transition-all duration-300 transform hover:scale-105 shadow-lg">
                                    <svg className="absolute inset-0 w-8 h-8 m-auto" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                                    </svg>
                                </button>

                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-6">
                            <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 shadow-sm">Magang Popular</span>
                            <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 shadow-sm">Frontend Developer</span>
                            <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 shadow-sm">Digital Marketing</span>
                            <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 shadow-sm">Backend Developer</span>
                        </div>
                    </div>

                    <div className="hidden md:block relative animate-slide-in-right">
                        <img src="/Hiring.svg" alt="" />
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-br from-accent to-cyan-200 text-white md:rounded-3xl px-4 py-12 md:p-20 m-0 md:m-15">
                <div className="container mx-auto">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-2xl md:text-4xl font-bold mb-4">Kenapa Harus Magang Melalui Prakerin?</h2>
                        <p className="text-base md:text-lg opacity-90">
                            Prakerin hadir sebagai solusi terpercaya untuk menjembatani talenta muda dengan perusahaan berkualitas.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className="space-y-8">
                            <div className="flex items-start space-x-4 animate-fade-in-up">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold mb-2">Magang Terverifikasi</h3>
                                    <p className="opacity-90 text-sm md:text-base">Semua lowongan magang di Prakerin sudah melalui proses verifikasi.</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4 animate-fade-in-up animate-delay-200">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold mb-2">Pendampingan Profesional</h3>
                                    <p className="opacity-90 text-sm md:text-base">Prakerin mendampingi setiap langkahmu agar pengalaman magang berjalan lancar.</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4 animate-fade-in-up animate-delay-400">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold mb-2">Bangun Portofolio Nyata</h3>
                                    <p className="opacity-90 text-sm md:text-base">Dapatkan pengalaman kerja yang aktual industri dan perkuat rekam jejak profesional.</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative animate-slide-in-right mt-8 md:mt-0">
                            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl">
                                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-12 h-12 md:w-16 md:h-16 bg-prakerin rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-600 text-xs md:text-base">Video Preview</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full"></div>
                                        <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded-full"></div>
                                        <div className="w-6 h-6 md:w-8 md:h-8 bg-purple-500 rounded-full"></div>
                                    </div>
                                    <div className="text-xs md:text-sm text-gray-500">3 mentors online</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="mitra" className="py-16 ">
                <div className="container mx-auto px-4">
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">Mitra</h2>
                        <p className="text-gray-600 mb-5">Wujudkan magang di perusahaan impian anda!</p>
                        <div className="w-[170px] h-0 border-2 border-accent"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center transition-all duration-300 transform hover:scale-105 hover-lift bg-gray-50 border border-gray-100 shadow-2xl rounded-2xl p-8 animate-fade-in-up">
                            <div className="w-50 h-50 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <img src={"Makerindo_PS.png"} alt="" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">PT Makerindo Cipta Solusi</h3>
                            <p className="text-gray-600 text-sm">Software Company</p>
                        </div>
                        <div className="text-center transition-all duration-300 transform hover:scale-105 hover-lift bg-gray-50 border border-gray-100 shadow-2xl rounded-2xl p-8 animate-fade-in-up">
                            <div className="w-50 h-50 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <img src={"Makerindo_PS.png"} alt="" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">PT Makerindo Cipta Solusi</h3>
                            <p className="text-gray-600 text-sm">Software Company</p>
                        </div>
                        <div className="text-center transition-all duration-300 transform hover:scale-105 hover-lift bg-gray-50 border border-gray-100 shadow-2xl rounded-2xl p-8 animate-fade-in-up">
                            <div className="w-50 h-50 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <img src={"Makerindo_PS.png"} alt="" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">PT Makerindo Cipta Solusi</h3>
                            <p className="text-gray-600 text-sm">Software Company</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">Feedback Siswa/Mahasiswa</h2>
                        <p className="text-gray-600 mb-5">Apa kata mereka yang sudah magang melalui Prakerin?</p>
                        <div className="w-[170px] h-0 border-2 border-accent"></div>
                    </div>
                    <div className="flex space-x-8 overflow-x-auto scrollbar-hide p-5">
                        <div className="bg-white md:min-w-80 space-y-5 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center animate-fade-in-up">
                            {/* <img src="/avatar1.png" alt="Avatar Siswa" className="w-16 h-16 rounded-full mb-4" /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-16 h-16 text-white bg-gray-400 p-2 rounded-full" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg>
                            <p className="text-gray-700 mb-4">"Magang di Prakerin sangat membantu saya mendapatkan pengalaman kerja nyata dan memperluas relasi di dunia industri."</p>
                            <span className="font-semibold text-prakerin">Rizky, Mahasiswa Informatika</span>
                        </div>
                        <div className="bg-white md:min-w-80 space-y-5 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center animate-fade-in-up">
                            {/* <img src="/avatar1.png" alt="Avatar Siswa" className="w-16 h-16 rounded-full mb-4" /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-16 h-16 text-white bg-gray-400 p-2 rounded-full" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg>
                            <p className="text-gray-700 mb-4">"Magang di Prakerin sangat membantu saya mendapatkan pengalaman kerja nyata dan memperluas relasi di dunia industri."</p>
                            <span className="font-semibold text-prakerin">Rizky, Mahasiswa Informatika</span>
                        </div>
                        <div className="bg-white md:min-w-80 space-y-5 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center animate-fade-in-up">
                            {/* <img src="/avatar1.png" alt="Avatar Siswa" className="w-16 h-16 rounded-full mb-4" /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-16 h-16 text-white bg-gray-400 p-2 rounded-full" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg>
                            <p className="text-gray-700 mb-4">"Magang di Prakerin sangat membantu saya mendapatkan pengalaman kerja nyata dan memperluas relasi di dunia industri."</p>
                            <span className="font-semibold text-prakerin">Rizky, Mahasiswa Informatika</span>
                        </div>
                        <div className="bg-white md:min-w-80 space-y-5 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center animate-fade-in-up">
                            {/* <img src="/avatar1.png" alt="Avatar Siswa" className="w-16 h-16 rounded-full mb-4" /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-16 h-16 text-white bg-gray-400 p-2 rounded-full" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg>
                            <p className="text-gray-700 mb-4">"Magang di Prakerin sangat membantu saya mendapatkan pengalaman kerja nyata dan memperluas relasi di dunia industri."</p>
                            <span className="font-semibold text-prakerin">Rizky, Mahasiswa Informatika</span>
                        </div>
                        <div className="bg-white md:min-w-80 space-y-5 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center animate-fade-in-up">
                            {/* <img src="/avatar1.png" alt="Avatar Siswa" className="w-16 h-16 rounded-full mb-4" /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-16 h-16 text-white bg-gray-400 p-2 rounded-full" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg>
                            <p className="text-gray-700 mb-4">"Magang di Prakerin sangat membantu saya mendapatkan pengalaman kerja nyata dan memperluas relasi di dunia industri."</p>
                            <span className="font-semibold text-prakerin">Rizky, Mahasiswa Informatika</span>
                        </div>
                        
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-br to-accent from-cyan-200 md:m-15 md:rounded-3xl text-white md:py-16 py-10">
                <div className="container flex flex-col md:flex-row items-center justify-between mx-auto md:px-20 px-4 gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Let&apos;s Grow Together!</h2>
                        <p className="text-lg opacity-90">
                            Mulai wujudkan impianmu! Prakerin siap mendukung langkah kariermu.
                        </p>
                    </div>
                    <button className="bg-white text-accent px-8 py-2 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg w-full md:w-auto">
                        Daftar Sekarang
                    </button>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">Sering di tanyakan</h2>
                        <p className="text-gray-600 mb-5">Punya ide, pertanyaan, atau sekadar ingin menyapa seputar magang? Berikut adalah pertanyaan yang sering diajukan:</p>
                        <div className="w-[170px] h-0 border-2 border-accent"></div>
                    </div>
                </div>

                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Bagaimana cara mendaftar magang di Prakerin?</h3>
                                <p className="text-gray-600">Anda dapat mendaftar melalui website kami dengan mengisi formulir pendaftaran dan melengkapi dokumen yang diperlukan.</p>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Apa saja syarat untuk mendaftar magang?</h3>
                                <p className="text-gray-600">Syarat umum meliputi usia minimal 18 tahun, memiliki KTP, dan sedang menempuh pendidikan di perguruan tinggi atau sekolah menengah.</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Berapa lama durasi magang di Prakerin?</h3>
                                <p className="text-gray-600">Durasi magang bervariasi tergantung program, mulai dari 1 bulan hingga 6 bulan.</p>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Apakah ada biaya untuk mendaftar magang?</h3>
                                <p className="text-gray-600">Tidak ada biaya pendaftaran. Semua layanan kami gratis bagi peserta magang.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}