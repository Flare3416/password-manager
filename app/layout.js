import { Geist, Geist_Mono, Creepster, Griffy } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Manager from "@/components/Manager"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const creepster = Creepster({
  variable: "--font-creepster",
  subsets: ["latin"],
  weight: "400",
});

const griffy = Griffy({
  variable: "--font-griffy",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "NexLock - Your Password Manager",
  description: "Securely manage your passwords with NexLOCK",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${creepster.variable} ${griffy.variable} antialiased h-full overflow-hidden`}
      >
      <Navbar />
      <Manager />
        {children}
      </body>
    </html>
  );
}
