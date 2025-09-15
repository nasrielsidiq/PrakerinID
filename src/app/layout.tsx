import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "PrakerinID",
  description: "Magang mudah dan nyaman",
  icons: {
    icon: "/prakerin.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id-ID">
      <body
        className={`font-poppins! antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
