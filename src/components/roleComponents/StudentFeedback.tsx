import { Building, CircleArrowRight, MapPin, X } from "lucide-react";
import React, { useState } from "react";

interface Perusahaan {
  image?: File | null;
  name: string;
  kota: string;
  provinsi: string;
}

const StudentFeedback = () => {
  const [close, setClose] = useState<boolean>(true);

  const [perusahaan, setPerushaan] = useState<Perusahaan[]>([
    {
      kota: "Bandung",
      name: "Makerindo Prima Solusi",
      provinsi: "Jawa Barat",
    },
    {
      kota: "Bandung",
      name: "Makerindo Prima Solusi",
      provinsi: "Jawa Barat",
    },
    {
      kota: "Bandung",
      name: "Makerindo Prima Solusi",
      provinsi: "Jawa Barat",
    },
    {
      kota: "Bandung",
      name: "Makerindo Prima Solusi",
      provinsi: "Jawa Barat",
    },
    {
      kota: "Bandung",
      name: "Makerindo Prima Solusi",
      provinsi: "Jawa Barat",
    },
    {
      kota: "Bandung",
      name: "Makerindo Prima Solusi",
      provinsi: "Jawa Barat",
    },
  ]);

  const [feedback, setFeedback] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSubmit = () => {
    console.log(feedback);
  };
  const handleModal = (index: number) => {
    setClose(false);
    setSelectedIndex(index);
    console.log("open modal");
  };

  const modal = (index: number) => {
    const company = perusahaan[index];
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-teal-600">
                Beri Feedback
              </h2>
              <button
                onClick={() => setClose(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{company.name}</h3>
                <p className="text-sm text-gray-500">{company.kota}</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feedback
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tulis feedback Anda di sini..."
                className="text-gray-600 w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setClose(true)}
                className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-black">
          {perusahaan &&
            perusahaan.map((data, index) => (
              <div
                className="bg-white flex flex-col md:flex-row space-x-5 p-5 px-10 md:px-5 rounded-2xl justify-between items-end md:items-center"
                key={index}
              >
                <div className="flex w-full md:w-auto">
                  <img
                    src="/Makerindo_PS.png"
                    alt="Icon"
                    className="w-15 h-15"
                  />
                  <div className="ms-3 ">
                    <h5 className="text-accent font-bold">{data.name}</h5>
                    <span className="flex">
                      <MapPin /> {data.kota}, {data.provinsi}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleModal(index)}
                  className="bg-vip/30 text-vip flex justify-between items-center p-1 px-2 space-x-2 rounded-full"
                >
                  <span>Feedback</span>
                  <CircleArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
        </div>
      </div>
      {close !== true && selectedIndex !== null && modal(selectedIndex)}
    </>
  );
};

export default StudentFeedback;
