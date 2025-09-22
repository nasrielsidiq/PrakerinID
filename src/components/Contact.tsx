"use client";
import emailJs from "emailjs-com";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FaInstagram } from "react-icons/fa";

interface contactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaRef.current) return;

    // Jalankan reCAPTCHA invisible
    const token = await recaptchaRef.current.executeAsync();
    if (!token) {
      recaptchaRef.current.reset();
      alert("Please complete the reCAPTCHA.");
      return;
    }

    if (!formRef.current) return;

    emailJs
      .sendForm(
        "service_t598gze",
        "template_w76bqwl",
        formRef.current,
        "Q_nxvshDO3z0nsyVg"
      )
      .then(() => {
        alert("Pesan berhasil dikirim!");
        formRef.current?.reset();
      })
      .catch((err) => {
        console.error(err);
        alert("Gagal mengirim pesan.");
      });
  };
  return (
    <section id="contact" className="py-16 ">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
            Hubungi Kami
          </h2>
          <p className="text-gray-600 mb-5">
            Punya ide, pertanyaan, atau sekadar ingin menyapa seputar magang?
            Kami senang mendengarnya! Silakan hubungi kami kapan saja.
          </p>
          <div className="w-[170px] h-0 border-2 border-accent"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Info Kontak */}
          <div className="space-y-9">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-prakerin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                Lokasi
              </h3>
              <p className="text-gray-600 text-sm">
                Jl. Dago Giri No. 4, Jababeka
                <br />
                Kp. Benteng, Padaleunyi, Kabupaten Bandung Barat
                <br />
                Jawa Barat 40552
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-prakerin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                Kontak Kami
              </h3>
              <p className="text-gray-600 text-sm">
                cs@prakerin.id
                <br />
                +62 8564885888
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-prakerin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2m-9 0V4"
                  ></path>
                </svg>
                Media Sosial
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors"
                >
                  <FaInstagram size={24} color="#fff" />
                </a>
              </div>
            </div>
          </div>

          {/* Form Kontak */}
          <div className="bg-white md:col-span-2 rounded-2xl p-8 shadow-lg flex flex-col justify-between">
            <form className="space-y-6" ref={formRef} onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prakerin focus:border-transparent transition-all duration-300"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prakerin focus:border-transparent transition-all duration-300"
                  placeholder="nama@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pesan
                </label>
                <textarea
                  name="message"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prakerin focus:border-transparent transition-all duration-300"
                  placeholder="Tulis pesan Anda di sini..."
                  rows={3}
                ></textarea>
              </div>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY as string}
                size="invisible"
                ref={recaptchaRef}
              />
              <button
                type="submit"
                className="w-full bg-prakerin bg-accent text-white py-3 rounded-lg font-medium hover:bg-prakerin-dark transition-all duration-300 transform hover:scale-105"
              >
                Kirim Pesan
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="bg-white md:col-span-3 rounded-2xl p-4 shadow-lg flex items-center justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.52204155400318!2d107.65891012411763!3d-6.9676570406016225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9465bf21013%3A0x52be50500715e36c!2sPT.%20Makerindo%20Prima%20Solusi!5e0!3m2!1sid!2sid!4v1752132302971!5m2!1sid!2sid"
              className="w-full h-60 md:h-72 rounded-2xl border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
