"use client";
import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/themeToggle";
import LandingPage from "./Landingpage";
import { useState, useEffect } from "react";
import ContactPage from "@/components/Contact";
import FooterPage from "@/components/Footer";
import ServiceButton from "@/components/Service";
import axios from "axios";
import { API, ENDPOINTS } from "../../utils/config";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const fetchData = async () => {
      await API.get('/sanctum/csrf-cookie', {
        }).then((response) => {
          console.log("Cookies set successfully:", response);
        }).catch((error) => {
          console.error("Error setting cookies:", error);
        });
    };
    fetchData();
  }, []);

  return (
    <>
      <ThemeToggle />
      <Navigation section={activeSection} setSection={setActiveSection} />
      {activeSection === "home" && <LandingPage />}
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
      {activeSection === "mou" && (
        <LandingPage />
      )}
      <ContactPage />
      <ServiceButton />
      <FooterPage />
    </>
  );
}