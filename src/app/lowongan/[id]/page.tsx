"use client";
import { Bookmark, Clock4, Lock, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../../utils/config";
import DescriptionRenderer from "@/components/RenderBlocks";
import dayjs from "dayjs";

const DetailLowonganPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const [data, setData] = useState<any>(); // Replace 'any' with your actual data type
  const { id } = use(params);

  const fetchData = async () => {
    try {
      const response = await API.get(`${ENDPOINTS.JOB_OPENINGS}/${id}`);
      setData(response.data.data);
      console.log("Data fetched successfully:", response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="flex flex-col items-center text-center justify-center mt-15">
        <h1 className="text-3xl font-bold text-accent mb-5">
          Details Lowongan Magang
        </h1>
        <p className="text-gray-500 text-xl">
          Temukan peluang magang dari berbagai perusahaan ternama. Daftar,
          lamar, dan mulai perjalanan kariermu bersama kami.
        </p>
      </section>

      <main className="p-6 w-8/10 m-auto mt-15">
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
                    {data && data.title}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-blue-600 font-medium">
                      {data && data.company.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">
                      {data && data.company.kota},{" "}
                      {data && data.company.provinsi}
                    </span>
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

                <Link
                  href={"titit/apply"}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Lamar Sekarang
                </Link>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            <div className="flex py-3 space-x-2 text-sm ">
              <MapPin className="text-accent" />
              <div className="my-auto">
                <span>{data && data.type} | </span>
                <span>
                  {data &&
                    dayjs(data.end_date).diff(
                      dayjs(data.start_date),
                      "month"
                    )}{" "}
                  Bulan |{" "}
                </span>
                <span>Paid Internship</span>
              </div>
            </div>

            <div className="flex py-3 space-x-2 text-sm ">
              <Clock4 className="text-accent" />
              <div className="my-auto">
                <span>Pendaftaran ditutup: </span>
                <span>{data && data.close}</span>
              </div>
            </div>

            {/* Content Area - Placeholder for job description */}
            <div className="mt-6 text-gray-600">
              {/* <iframe src="/doc/taksonomi prakerin id.pdf" className="w-full h-screen border-0 bg-white/0" ></iframe> */}
              <DescriptionRenderer data={data && data.description} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DetailLowonganPage;
