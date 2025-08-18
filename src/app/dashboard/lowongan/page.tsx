'use client';
import { Archive, Bookmark, BriefcaseBusiness, Funnel, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import SiswaLowongan from "@/components/roleComponents/SiswaLowongan";
import { IndustryLowongan } from "@/components/roleComponents/IndustryLowongan";

const LowonganPage: React.FC = () => {
    const [role, setRole] = useState<string>();
    useEffect(() => {
        setRole(Cookies.get("authorization"));
    }, [])
    const RolePage: React.FC = () => {
        if(role === "industry") return (<IndustryLowongan />);
        if(role === "student") return(<SiswaLowongan />)
        if(role === "school") return null;
    }
    return (
        <main className=" p-6">
            <h1 className="text-accent-dark text-sm mb-5">Lowongan</h1>
            <div className="flex items-center  space-x-2 font-extrabold text-accent">
                <BriefcaseBusiness className="w-5 h-5" />
                <h2 className="text-2xl mt-2">Resume Lamaran Magang</h2>
            </div>
           <RolePage />
        </main>
    );
}
export default LowonganPage;