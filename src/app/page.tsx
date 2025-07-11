"use client";
import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/themeToggle";
import LandingPage from "./Landingpage";
import About from "./About";
import { useState, useEffect } from "react";
import ContactPage from "@/components/Contact";
import FooterPage from "@/components/Footer";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-12 w-12 rounded-full border-4 border-cyan-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <ThemeToggle />
      <Navigation section={activeSection} setSection={setActiveSection} />
      {activeSection === "home" && <LandingPage />}
      {activeSection === "about" && <About />}
      {activeSection === "internship" && (
        <div className="flex justify-center items-center text-3xl font-extrabold text-gray-400 h-screen">
          Internship Section
        </div>
      )}
      {activeSection === "mou" && (
        <LandingPage />
      )}
      <ContactPage />
      <FooterPage />
    </>
  );
}