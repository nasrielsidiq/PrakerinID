"use client";

import { RatingSummary } from "@/models/feedback";
import { Star } from "lucide-react";

interface RatingSummaryProps {
  data: RatingSummary;
}

export default function RatingSummaryCompenent({ data }: RatingSummaryProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-6  h-full w-full">
      {/* Bagian rata-rata besar */}
      <div className="flex flex-col items-center md:w-1/3 ">
        <h2 className="text-9xl font-bold text-accent-dark">
          {data.average_rating.toFixed(1)}
        </h2>
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => {
            const rating = i + 1;
            return (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  rating <= Math.round(data.average_rating)
                    ? "fill-accent text-accent"
                    : "text-gray-300"
                }`}
              />
            );
          })}
        </div>
        <span className="text-md text-gray-500 mt-1">
          {data.rating_count} ulasan
        </span>
      </div>

      {/* Bagian persentase bar */}
      <div className="flex-1 w-full">
        <h3 className="text-sm font-medium text-gray-600 mb-3">
          Persentase Penilaian
        </h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const value = data[`rating_${star}` as keyof RatingSummary];
            const count = value;
            const percentage = value ? (count / value) * 100 : 0;

            return (
              <div key={star} className="flex items-center gap-2">
                <span className="w-4 text-sm">{star}</span>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
