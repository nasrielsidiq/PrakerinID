"use client";
import ContactPage from "@/components/Contact";
import FooterPage from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function LowonganLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation section="internship" setSection={() => null} />
      {children}
      <ContactPage />
      <FooterPage />
    </>
  );
}
