"use client";
import Navigation from "@/components/Navigation";
import LandingPage from "./Landingpage";
import { useState, useEffect } from "react";
import ContactPage from "@/components/Contact";
import FooterPage from "@/components/Footer";
import ServiceButton from "@/components/Service";
import { API, ENDPOINTS } from "../../utils/config";
import Loading from "./loading";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");

  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await API.get(ENDPOINTS.HOMEPAGES);
      setData(response.data.data);
      console.log("Data fetched successfully:", response.data.data);
    } catch (error) {
      console.error("Error fetching homepage data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await API.get("/sanctum/csrf-cookie", {})
        .then((response) => {
          console.log("Cookies set successfully:", response);
        })
        .catch((error) => {
          console.error("Error setting cookies:", error);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Navigation section={activeSection} setSection={setActiveSection} />
      {activeSection === "home" && <LandingPage data={data} />}
      {activeSection === "about" && (
        <div className="flex justify-center items-center text-3xl font-extrabold text-gray-400 h-screen">
          About Section
        </div>
      )}
      {activeSection === "internship" && (
        <div className="flex justify-center items-center text-3xl font-extrabold text-gray-400 h-screen">
          Internship Section
        </div>
      )}
      <ContactPage />
      <ServiceButton />
      <FooterPage />
    </>
  );
}
