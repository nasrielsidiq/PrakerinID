import { BriefcaseBusiness, Building, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { API, ENDPOINTS } from "../../../utils/config";
import Cookies from "js-cookie";

interface JobApplication {
  id: string;
  title: string;
  company: string;
  location: string;
  currentStep: number;
  steps: {
    name: string;
    date: string;
    completed: boolean;
  }[];
}

interface InternshipApplicationCount {
  total: number;
  accepted: number;
  rejected: number;
  in_progress: number;
}

interface InternshipApplication {
  id: string;
  job_opening: {
    title: string;
    // company: string;
    // location: string;
  };
  company: {
    name: string;
  };
  city_regency: {
    name: string;
  };
  province: {
    name: string;
  };
}

export default function SiswaDashboard() {
  const jobApplications: JobApplication[] = [
    {
      id: "1",
      title: "Frontend Web Developer",
      company: "PT Makerindo Prima Solusi",
      location: "Kabupaten Bandung, Jawa Barat",
      currentStep: 3,
      steps: [
        { name: "Apply", date: "02-06-2025", completed: true },
        { name: "Pending", date: "03-06-2025", completed: true },
        { name: "Test", date: "05-06-2025", completed: true },
        { name: "Ditolak", date: "06-06-2025", completed: false },
      ],
    },
    {
      id: "2",
      title: "Backend Web Developer",
      company: "PT Makerindo Prima Solusi",
      location: "Kabupaten Bandung, Jawa Barat",
      currentStep: 3,
      steps: [
        { name: "Apply", date: "02-06-2025", completed: true },
        { name: "Pending", date: "03-06-2025", completed: true },
        { name: "Test", date: "05-06-2025", completed: true },
        { name: "Ditolak", date: "06-06-2025", completed: false },
      ],
    },
    {
      id: "3",
      title: "Frontend Web Developer",
      company: "Instagram",
      location: "Kabupaten Bandung, Jawa Barat",
      currentStep: 2,
      steps: [
        { name: "Apply", date: "02-06-2025", completed: true },
        { name: "Pending", date: "03-06-2025", completed: true },
        { name: "Test", date: "05-06-2025", completed: false },
        { name: "Interview", date: "", completed: false },
      ],
    },
    {
      id: "4",
      title: "Frontend Web Developer",
      company: "PT BNI",
      location: "Kabupaten Bandung, Jawa Barat",
      currentStep: 2,
      steps: [
        { name: "Apply", date: "02-06-2025", completed: true },
        { name: "Pending", date: "03-06-2025", completed: true },
        { name: "Test", date: "05-06-2025", completed: false },
        { name: "Interview", date: "", completed: false },
      ],
    },
  ];
  const getStepColor = (
    stepIndex: number,
    currentStep: number,
    isCompleted: boolean
  ) => {
    if (stepIndex < currentStep) return "bg-teal-500";
    if (stepIndex === currentStep && isCompleted) return "bg-teal-500";
    if (stepIndex === currentStep && !isCompleted) return "bg-red-500";
    return "bg-gray-300";
  };
  const [internshipApplication, setInternshipApplication] = useState<
    InternshipApplication[]
  >([]);
  const [internshipApplicationCount, setInternshipApplicationCount] =
    useState<InternshipApplicationCount>({
      total: 0,
      accepted: 0,
      rejected: 0,
      in_progress: 0,
    });

  const fetchInternshipAplicationCount = async () => {
    try {
      const response = await API.get(
        `${ENDPOINTS.INTERNSHIP_APPLICATIONS}/count`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );
      if (response.status === 200) {
        setInternshipApplicationCount(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIntermshipApplications = async () => {
    try {
      const response = await API.get(ENDPOINTS.INTERNSHIP_APPLICATIONS, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      });

      if (response.status === 200) {
        setInternshipApplication(response.data.data);
      }

      console.log("Internship Applications:", response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Promise.all([
      fetchIntermshipApplications(),
      fetchInternshipAplicationCount(),
    ]);
  }, []);
  return (
    <>
      {/* Resume Section */}
      <div className=" p-6 mb-8">
        <div className="flex items-center pt-2 space-x-2 font-bold text-accent">
          <BriefcaseBusiness className="w-5 h-5" />
          <h2 className="text-xl mt-2">Resume Lamaran Magang</h2>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-600 text-sm">
            Lihat! Kamu sudah apply {internshipApplicationCount.total} lowongan!
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Status:</span>
            <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Mencari Magang
            </span>
          </div>
        </div>
      </div>

      {/* Internship Applications Grid */}
      {internshipApplication.length !== 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* {internshipApplication.map((application) => (
            <div
              key={application.id}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {application.job_opening.title}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                  <Building className="w-4 h-4" />
                  <span>{application.company.name}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {application.city_regency.name}, {application.province.name}
                  </span>
                </div>
              </div> */}

              {/* Progress Steps */}
              {/* <div className="relative">
                <div className="flex justify-between items-center">
                  {application.steps.map((step, stepIndex) => (
                    <div
                      key={stepIndex}
                      className="flex flex-col items-center relative z-10"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium ${getStepColor(
                          stepIndex,
                          application.currentStep,
                          step.completed
                        )}`}
                      >
                        {stepIndex + 1}
                      </div>
                      <div className="text-xs text-gray-600 mt-2 text-center max-w-16">
                        {step.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {step.date}
                      </div>
                    </div>
                  ))}
                </div> */}

              {/* Progress Line */}
              {/* <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-300 z-1">
                  <div
                    className="h-full bg-teal-500 transition-all duration-300"
                    style={{
                      width: `${
                        (application.currentStep /
                          (application.steps.length - 1)) *
                        100
                      }%`,
                    }}
                  ></div>
                </div> */}

              {/* </div> */}
            {/* </div>
          ))} */}

          {jobApplications.map((application) => (
            <div
              key={application.id}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {application.title}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                  <Building className="w-4 h-4" />
                  <span>{application.company}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{application.location}</span>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="relative">
                <div className="flex justify-between items-center">
                  {application.steps.map((step, stepIndex) => (
                    <div
                      key={stepIndex}
                      className="flex flex-col items-center relative z-10"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium ${getStepColor(
                          stepIndex,
                          application.currentStep,
                          step.completed
                        )}`}
                      >
                        {stepIndex + 1}
                      </div>
                      <div className="text-xs text-gray-600 mt-2 text-center max-w-16">
                        {step.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {step.date}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress Line */}
                <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-300 z-1">
                  <div
                    className="h-full bg-teal-500 transition-all duration-300"
                    style={{
                      width: `${
                        (application.currentStep /
                          (application.steps.length - 1)) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 p-6 text-center ">
          Kamu belum melamar magang di perusahaan manapun.
        </p>
      )}
    </>
  );
}
