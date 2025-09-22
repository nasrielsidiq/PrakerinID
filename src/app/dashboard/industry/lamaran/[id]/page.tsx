"use client";
import {
  BriefcaseBusiness,
  Globe,
  Lock,
  MapPin,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useLayoutEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../../../../utils/config";
import Cookies from "js-cookie";
import RenderBlocks from "@/components/RenderBlocks";
import Image from "next/image";

interface Application {
  user: {
    photo_profile: File | null;
  };
  student: {
    name: string;
    class: string | null;
    skill: string | null;
  };
  major: {
    name: string | null;
  } | null;
  cover_letter: string;
  cv_id: string;
  status: Status;
}

type Status = "in_progress" | "accepted" | "rejected" | "";

const detailLamaran = ({ params }: { params: Promise<{ id: string }> }) => {
  const [application, setApplication] = useState<Application>({
    user: {
      photo_profile: null,
    },
    student: {
      name: "",
      class: "",
      skill: "",
    },
    major: {
      name: "",
    },
    cover_letter: "",
    cv_id: "",
    status: "",
  });
  const { id } = use(params);
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await API.get(
        `${ENDPOINTS.INTERNSHIP_APPLICATIONS}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );

      console.log(response);
      setApplication(response.data.data);

      const preview = await API.get(
        `${ENDPOINTS.CURRICULUM_VITAE}/${response.data.data.curriculum_vitae_id}/preview`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
          responseType: "blob", // penting!
        }
      );

      const fileBlob = new Blob([preview.data], {
        type: "application/pdf",
      });
      const fileUrl = URL.createObjectURL(fileBlob);

      setPreviewUrl(fileUrl); // ini nanti dipakai di <embed>
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-accent-dark text-sm mb-5">
        <Link
          className="hover:underline hover:text-accent"
          href={"/dashboard/industry/lamaran"}
        >
          Lamaran
        </Link>{" "}
        -&gt; Detail Lamaran
      </h1>
      <div className="flex items-center mb-8  space-x-2 font-extrabold text-accent">
        <BriefcaseBusiness className="w-5 h-5" />
        <h2 className="text-2xl mt-2">Detail Lamaran Magang</h2>
      </div>
      {/* Description Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col items-end lg:flex-row lg:items-start lg:justify-between gap-4 pb-5 mb-5 border-b-1 border-gray-200">
          <div className="flex items-start space-x-4">
            {application.user.photo_profile ? (
              <div className="w-16 h-16 relative rounded-full border-white border">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/photo-profile/${application.user.photo_profile}`}
                  alt="Logo Perusahaan"
                  fill
                  sizes="100%"
                  className="object-cover rounded-full"
                />
              </div>
            ) : (
              <UserCircle className="w-16 h-16 text-[var(--color-accent)]" />
            )}
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {application.student.name}
              </h2>
              <div className="flex items-center space-x-2 text-gray-600 mb-1">
                <span className="text-sm">
                  Kelas {application.student.class ?? "-"} | Jurusan{" "}
                  {application.major?.name ?? "-"}
                </span>
              </div>
              <div className="flex items-center space-x-2 font-medium text-blue-600">
                <span>Keahlian {application.student.skill ?? "-"}</span>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Surat Lamaran
        </h3>
        <div className="text-gray-700 text-sm leading-relaxed space-y-3 mb-5">
          <RenderBlocks data={application.cover_letter} />
        </div>
        {/* Content Area - Placeholder for job description */}
        <div className="my-6 text-gray-600">
          <div className="w-full rounded-md border">
            {/* PDF preview */}
            {previewUrl && (
              <embed
                src={previewUrl}
                type="application/pdf"
                width="100%"
                height="600px"
                className="w-full"
              />
            )}
          </div>
        </div>
        <div className="flex justify-end space-x-5">
          <Link
            href={"/dashboard/industry/lamaran"}
            className="p-3 px-5 bg-gray-300 text-gray-600 rounded-xl hover:bg-gray-400"
          >
            Kembali
          </Link>
          {application.status === "in_progress" && (
            <>
              <Link
                href={`/dashboard/industry/lamaran/${id}/tolak`}
                className="p-3 px-5 bg-red-500 text-gray-100 rounded-xl hover:bg-red-600 "
              >
                Tolak Lamaran
              </Link>
              {true ? (
                <Link
                  href={`/dashboard/industry/lamaran/${id}/terima`}
                  className="p-3 px-5 bg-accent text-gray-100 rounded-xl hover:bg-accent-hover "
                >
                  Terima Lamaran
                </Link>
              ) : (
                <Link
                  href={`/dashboard/industry/lamaran/${id}/tes`}
                  className="p-3 px-5 bg-accent text-gray-100 rounded-xl hover:bg-accent-hover "
                >
                  Jadwalkan Test
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
};
export default detailLamaran;
