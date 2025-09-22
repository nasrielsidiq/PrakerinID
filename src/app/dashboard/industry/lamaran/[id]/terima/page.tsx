"use client";
import { BriefcaseBusiness, UserCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useLayoutEffect, useState } from "react";
import Cookies from "js-cookie";
import RenderBlocks from "@/components/RenderBlocks";
import Image from "next/image";
import { API, ENDPOINTS } from "../../../../../../../utils/config";
import { AxiosError } from "axios";
import { alertConfirm, alertError, alertSuccess } from "@/libs/alert";

interface Application {
  user: {
    email: string;
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
}

const detailLamaran = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();

  const [application, setApplication] = useState<Application>({
    user: {
      email: "",
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
  });
  const { id } = use(params);

  const fetchData = async () => {
    try {
      const response = await API.get(
        `${ENDPOINTS.INTERNSHIP_APPLICATIONS}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      ); // ini nanti dipakai di <embed>

      console.log(response);
      setApplication(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleAccept = async () => {
    const confirm = await alertConfirm(
      "Apakah anda yakin akan lamaran magang ini menerima?"
    );
    if (!confirm) return;
    try {
      await API.patch(
        `${ENDPOINTS.INTERNSHIP_APPLICATIONS}/${id}`,
        {
          status: "accepted",
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );

      await alertSuccess("Anda telah menerima lamaran magang ini!");

      router.push("/dashboard/industry/lamaran");

      router;
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        const responseError = error.response?.data.errors;
        if (typeof responseError === "string") {
          await alertError(responseError);
        } else {
          // setErrors(responseError);
        }
      }
      console.error(error);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-accent-dark text-sm mb-5">
        <Link
          className="hover:underline hover:text-accent"
          href={"/dashboard/industry/lamaran"}
        >
          Lamaran
        </Link>{" "}
        -&gt;{" "}
        <Link
          className="hover:underline hover:text-accent"
          href={`/dashboard/industry/lamaran/${id}`}
        >
          Detail Lamaran
        </Link>{" "}
        -&gt; Terima Lamaran
      </h1>
      <div className="flex items-center mb-8  space-x-2 font-extrabold text-accent">
        <BriefcaseBusiness className="w-5 h-5" />
        <h2 className="text-2xl mt-2">Terima Lamaran Magang</h2>
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
        <div className="my-5">
          <span className="text-gray-800">Email Pelamar: </span>{" "}
          <Link
            rel="stylesheet"
            className="text-blue-500 font-medium"
            target="_blank"
            href={`mailto:${application.user.email}`}
          >
            {application.user.email}
          </Link>
        </div>
        <div className="my-2">
          <span className="text-gray-800">Undangan Test: </span>
        </div>
        <div className="bg-gray-200 rounded-2xl text-gray-700 text-sm h-100 leading-relaxed space-y-3 mb-5">
          <textarea
            name="message"
            id=""
            className="h-full w-full p-5 resize-none focus:border-0 rounded-2xl"
          ></textarea>
        </div>
        <div className="flex justify-end space-x-5">
          <Link
            href={`/dashboard/industry/lamaran/${id}`}
            className="p-3 px-5 bg-gray-300 text-gray-600 rounded-xl hover:bg-gray-400"
          >
            Kembali
          </Link>
          <button
            type="button"
            onClick={handleAccept}
            className="p-3 px-5 bg-accent text-gray-100 rounded-xl hover:bg-accent-hover "
          >
            Terima Lamaran
          </button>
        </div>
      </div>
    </main>
  );
};
export default detailLamaran;
