import WhatsappChat from "@/components/ui/whatsAppChat";
import Footer from "@/layouts/Footer/Footer";
import Navbar from "@/layouts/Header/navbar";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Yoga Club",
  description: "A website for a yoga club ",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`dark:bg-gray-dark ${poppins.className}`}>
      <Navbar />
      {children}
      <Footer />
      <WhatsappChat />
    </main>
  );
}
