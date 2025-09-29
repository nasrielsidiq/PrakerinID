"use client";
import { Building } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import AdminPerusahaan from "@/components/Perusahaan/AdminPerusahaan";
import NonadminPerusahaan from "@/components/Perusahaan/NonAdminPerusahaan";
import LoaderData from "@/components/loader";

const PerusahaanPage: React.FC = () => {
  const [authorization, setAuthorization] = useState<string>("");
  useEffect(() => {
    setAuthorization(Cookies.get("authorization") as string);
  }, []);

  const Role = () => {
    return authorization ? (
      authorization === "super_admin" ? (
        <AdminPerusahaan />
      ) : (
        <NonadminPerusahaan />
      )
    ) : (
      <LoaderData />
    );
  };

  return (
    <main className="p-6">
      <h1 className="text-accent-dark text-sm mb-5">Perusahaan</h1>
      <div className="mb-8">
        <div className="flex items-center space-x-2 font-extrabold text-accent">
          <Building className="w-5 h-5" />
          <h2 className="text-2xl mt-2">Daftar Perusahaan</h2>
        </div>
      </div>

      <Role />
    </main>
  );
};
export default PerusahaanPage;
