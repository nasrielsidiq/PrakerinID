import {
  Building,
  CircleArrowRight,
  MapPin,
  X,
  Star,
  UserCircle,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../utils/config";
import Cookies from "js-cookie";
import PaginationComponent from "../PaginationComponent"; // sesuaikan path jika perlu

interface Perusahaan {
  user?: {
    photo_profile: File | null;
  };
  name: string;
  kota: string;
  provinsi: string;
}
interface Pages {
  activePages: number;
  pages: number;
}

const StudentFeedback = () => {
  const [close, setClose] = useState<boolean>(true);
  const [perusahaan, setPerushaan] = useState<Perusahaan[]>([
    { kota: "Bandung", name: "Makerindo Prima Solusi", provinsi: "Jawa Barat" },
    { kota: "Bandung", name: "Makerindo Prima Solusi", provinsi: "Jawa Barat" },
    { kota: "Bandung", name: "Makerindo Prima Solusi", provinsi: "Jawa Barat" },
    { kota: "Bandung", name: "Makerindo Prima Solusi", provinsi: "Jawa Barat" },
    { kota: "Bandung", name: "Makerindo Prima Solusi", provinsi: "Jawa Barat" },
    { kota: "Bandung", name: "Makerindo Prima Solusi", provinsi: "Jawa Barat" },
  ]);
  const [page, setPage] = useState<Pages>({
    activePages: 1,
    pages: 1,
  });
  const [feedback, setFeedback] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(0); // rating 1-5
  const [loading, setLoading] = useState(false);

  const fetchCompany = async (selectedPage = page.activePages) => {
    if (loading) return; // kalau lagi loading, abaikan click berikutnya
    setLoading(true);

    try {
      const response = await API.get(ENDPOINTS.USERS, {
        params: {
          role: "company",
          page: selectedPage,
          limit: 1,
        },
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });

      if (response.status === 200) {
        console.log("Company fetched successfully:", response.data);

        const data = response.data.data.map((item: any) => ({
          id: item.id,
          photo_profile: item.photo_profile,
          name: item.company.name,
          city_regency: item.city_regency.name,
          province: item.province.name,
        }));
        setPerushaan(data);
        setPage({
          activePages: selectedPage,
          pages: response.data.last_page, // pastikan ini adalah total halaman
        });
      }
    } catch (error) {
      console.error("Error fetching company:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    console.log("Feedback:", feedback);
    console.log("Rating:", rating);
    setClose(true); // tutup modal setelah submit
  };

  const handleModal = (index: number) => {
    setClose(false);
    setSelectedIndex(index);
    setRating(0); // reset rating setiap buka modal baru
    setFeedback(""); // reset feedback
  };

  useEffect(() => {
    fetchCompany(page.activePages);
  }, [page.activePages]);

  const handlePageChange = (selectedPage: number) => {
    setPage((prev) => ({
      ...prev,
      activePages: selectedPage,
    }));
    // fetchCompany(selectedPage); // Tidak perlu, sudah di useEffect
  };

  // Modal
  const modal = (index: number) => {
    const company = perusahaan[index];
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-accent">Beri Feedback</h2>
              <button
                onClick={() => setClose(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              {company.user?.photo_profile ? (
                <div className="w-12 h-12 relative rounded-full border-white border">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/storage/photo-profile/${company.user.photo_profile}`}
                    alt="Logo Perusahaan"
                    fill
                    sizes="100%"
                    className="object-cover rounded-full"
                  />
                </div>
              ) : (
                <UserCircle className="w-12 h-12 text-[var(--color-accent)]" />
              )}
              <div>
                <h3 className="font-semibold text-accent">{company.name}</h3>
                <p className="text-sm text-gray-500">{company.kota}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-6 gap-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-10 h-10 cursor-pointer transition-colors ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Komentar
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tulis komentar Anda di sini..."
                className="text-gray-600 w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent resize-none"
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
                className="px-6 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors"
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
      <div className=" w-full h-full relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-black">
          {perusahaan.map((data, index) => (
            <div
              className="bg-white flex flex-col md:flex-row space-x-5 p-5 px-10 md:px-5 rounded-2xl justify-between items-end md:items-center"
              key={index}
            >
              <div className="flex w-full md:w-auto">
                <img src="/Makerindo_PS.png" alt="Icon" className="w-15 h-15" />
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
        <PaginationComponent
          activePage={page.activePages}
          totalPages={page.pages}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </div>
      {close !== true && selectedIndex !== null && modal(selectedIndex)}
    </>
  );
};

export default StudentFeedback;
