'use client'
import ContactPage from "@/components/Contact";
import FooterPage from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/themeToggle";

export default function LowonganLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {



    return (
        <>
            <ThemeToggle />
            <Navigation section="internship" setSection={() => null} />
            {children}
            <ContactPage />
            <FooterPage />
        </>
    );
}