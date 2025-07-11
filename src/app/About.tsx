"use client";

import { useState } from "react";

const cards = [
    {
        title: "Our Story",
        desc: "Berawal dari keresahan sederhana, kami ingin membuat peluang magang lebih mudah diakses siapa saja.",
        bg: "bg-[url(/images/close-up-image.jpg)] bg-cover",
        gradient: "bg-gradient-to-t from-black/50 from-20% to-white/0",
    },
    {
        title: "Our Mission",
        desc: "Membantu mahasiswa Indonesia menemukan pengalaman kerja nyata yang relevan dengan bidang studi mereka, sehingga mereka dapat mempersiapkan diri dengan baik untuk memasuki dunia kerja.",
        bg: "bg-blue-300",
        gradient: "",
    },
    {
        title: "Our Mission",
        desc: "Membantu mahasiswa Indonesia menemukan pengalaman kerja nyata yang relevan dengan bidang studi mereka, sehingga mereka dapat mempersiapkan diri dengan baik untuk memasuki dunia kerja.",
        bg: "bg-accent",
        gradient: "",
    },
];

export default function About() {
    const [active, setActive] = useState(0);

    const prev = () => setActive((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
    const next = () => setActive((prev) => (prev === cards.length - 1 ? 0 : prev + 1));

    return (
        <>
            {/* Section 1: Tentang Kami */}
            <section className="grid grid-cols-1 md:grid-cols-10 gap-6 mx-4 md:mx-20 mt-10">
                <div className="md:col-span-4">
                    <h5 className="text-accent mb-3 md:mb-5">Tentang kami</h5>
                    <h1 className="text-gray-700 text-2xl md:text-3xl font-bold">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
                    </h1>
                </div>
                <div className="text-gray-600 flex items-center md:col-span-6 mt-4 md:mt-0">
                    <p>
                        Prakerin adalah sebuah platform magang digital yang dibuat untuk memudahkan mahasiswa dan talenta muda Indonesia dalam menemukan pengalaman kerja nyata. Kami menyediakan berbagai peluang magang terverifikasi dari perusahaan terpercaya, lengkap dengan bimbingan, pelatihan, dan dukungan untuk membangun karier profesionalmu sejak dini.
                    </p>
                </div>
            </section>

            {/* Section 2: Our Story & Mission */}
            <section className="grid grid-cols-1 md:grid-cols-10 grid-rows-2 md:max-h-100 gap-4 mx-4 md:mx-20 mt-10">
                {/* <div className="bg-[url(/images/close-up-image.jpg)] bg-cover col-span-1 md:col-span-6 row-span-2 rounded-2xl grid grid-flow-col grid-rows-5 min-h-[200px]">
                    <div className="col-span-3 row-span-3"></div>
                    <div className="col-span-2 p-5 row-span-2 rounded-2xl text-white bg-gradient-to-t from-black/50 from-20%   to-white/0">
                        <h1 className="text-xl md:text-2xl md:mt-5 font-bold">Our Story</h1>
                        <p>Berawal dari keresahan sederhana, kami ingin membuat peluang magang lebih mudah diakses siapa saja.</p>
                    </div>
                </div> */}
                <div className={`grid grid-cols-1 grid-rows-3 col-span-6 row-span-2 rounded-2xl w-full  border border-red-500 text-white shadow-xl transition-all duration-500 ${cards[active].bg}`}>
                    <div className="row-span-2 flex items-end justify-between p-5">
                        <button
                            onClick={prev}
                            className="p-2 rounded-full w-10 h-10 flex items-center justify-center bg-gray-600/50 hover:bg-gray-300 text-xl"
                            aria-label="Sebelumnya"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
                            </svg>
                        </button>
                        <button
                            onClick={next}
                            className="p-2 rounded-full w-10 h-10 flex items-center justify-center bg-gray-600/50 hover:bg-gray-300 text-xl"
                            aria-label="Berikutnya"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                            </svg>
                        </button>
                    </div>
                    {/* <div className={``}> */}
                    <div className={`rounded-2xl ${cards[active].gradient} p-5`}>
                        <h1 className="text-xl md:text-2xl font-bold">{cards[active].title}</h1>
                        <p className="text-xs md:text-base mt-2">{cards[active].desc}</p>
                    </div>
                    {/* </div> */}

                </div>
                {/* Dots
                <div className="flex justify-center mt-4 gap-2">
                    {cards.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActive(idx)}
                            className={`w-3 h-3 rounded-full ${active === idx ? "bg-accent" : "bg-gray-300"}`}
                            aria-label={`Pilih slide ${idx + 1}`}
                        />
                    ))}
                </div> */}
                <div className="bg-blue-300 col-span-1 md:col-span-4 rounded-2xl grid grid-flow-col grid-rows-5 min-h-[150px] mt-4 md:mt-0">
                    <div className="col-span-3 row-span-2"></div>
                    <div className="col-span-2 p-5 row-span-3 text-white">
                        <h1 className="text-xl md:text-2xl font-bold">Our Mission</h1>
                        <p className="text-xs md:text-base">
                            Membantu mahasiswa Indonesia menemukan pengalaman kerja nyata yang relevan dengan bidang studi mereka, sehingga mereka dapat mempersiapkan diri dengan baik untuk memasuki dunia kerja.
                        </p>
                    </div>
                </div>
                <div className="bg-accent col-span-1 md:col-span-4 rounded-2xl grid grid-flow-col grid-rows-5 min-h-[150px] mt-4 md:mt-0">
                    <div className="col-span-3 row-span-2"></div>
                    <div className="col-span-2 p-5 row-span-3 text-white">
                        <h1 className="text-xl md:text-2xl font-bold">Our Mission</h1>
                        <p className="text-xs md:text-base">
                            Membantu mahasiswa Indonesia menemukan pengalaman kerja nyata yang relevan dengan bidang studi mereka, sehingga mereka dapat mempersiapkan diri dengan baik untuk memasuki dunia kerja.
                        </p>
                    </div>
                </div>
            </section>

        </>
    )
}