import { BadgeCheck, BriefcaseBusiness, Users } from "lucide-react";

export default function IndustryDashboard() {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 col-span-5 py-5 gap-6 ">
        <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex justify-between">
          <div className="text-accent-dark">
            <h1 className="font-extrabold  text-2xl">39</h1>
            <h3 className=" text-md">Total Siswa Magang</h3>
          </div>
          <Users className="text-accent w-7 h-7 my-auto" />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex justify-between">
          <div className="text-accent-dark">
            <h1 className="font-extrabold  text-2xl">45</h1>
            <h3 className=" text-md">Total Lowongan</h3>
          </div>
          <BriefcaseBusiness className="text-accent w-7 h-7 my-auto" />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-3 px-5 flex justify-between">
          <div className="text-accent-dark">
            <h1 className="font-extrabold  text-2xl">4</h1>
            <h3 className=" text-md">Total Penghargaan</h3>
          </div>
          <BadgeCheck className="text-accent w-7 h-7 my-auto" />
        </div>
      </div>
      <div className="bg-red-800">la</div>
    </>
  );
}
