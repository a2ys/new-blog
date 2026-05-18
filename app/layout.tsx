import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { Work_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${workSans.variable} h-full antialiased`}>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <section className="flex-1">{children}</section>
        <Footer />
      </body>
    </html>
  );
}
