import { Award, BadgeCheck } from "lucide-react";
import Image from "next/image";
interface Award {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
}
const CertificateCard = ({
  title,
  date,
  imageUrl,
}: {
  title: string;
  date: string;
  imageUrl: string;
}) => {
  return (
    <div className=" bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center space-y-3 hover:shadow-lg transition-shadow">
      <div className="w-40 h-40 relative flex items-center justify-center">
        <Image src={imageUrl} alt={title} layout="fill" objectFit="contain" />
      </div>
      <div className="pt-2">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </div>
  );
};
const NonAdminAchievemet: React.FC = () => {
  const awards: Award[] = [
    {
      id: 1,
      title: "Penghargaan terhadap sesuatu",
      date: "Juli 30, 2025",
      imageUrl: "/certificate-placeholder.svg",
    },
    {
      id: 2,
      title: "Penghargaan terhadap sesuatu",
      date: "Juli 30, 2025",
      imageUrl: "/certificate-placeholder.svg",
    },
    {
      id: 3,
      title: "Penghargaan terhadap sesuatu",
      date: "Juli 30, 2025",
      imageUrl: "/certificate-placeholder.svg",
    },
    {
      id: 4,
      title: "Penghargaan terhadap sesuatu",
      date: "Juli 30, 2025",
      imageUrl: "/certificate-placeholder.svg",
    },
  ];
  return (
    <main className="p-6">
      <h1 className="text-accent-dark text-sm mb-5">Penghargaan</h1>
      <div className="flex items-center mb-8  space-x-2 font-extrabold text-accent">
        <Award className="w-5 h-5" />
        <h2 className="text-2xl mt-2">Penghargaan</h2>
      </div>
      <div className="bg-white p-3 rounded-2xl flex justify-between lg:w-2/9 mb-8">
        <div>
          <h1 className="text-gray-700 text-2xl font-bold">4</h1>
          <span className="text text-gray-500">Total Penghargaan</span>
        </div>
        <Award className="w-8 h-8 text-accent my-auto" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {awards.map((award) => (
          <CertificateCard
            key={award.id}
            title={award.title}
            date={award.date}
            imageUrl={award.imageUrl}
          />
        ))}
      </div>
    </main>
  );
};
export default NonAdminAchievemet;
