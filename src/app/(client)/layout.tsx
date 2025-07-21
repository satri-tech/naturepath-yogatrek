import WhatsappChat from "@/components/ui/whatsAppChat";
import Footer from "@/layouts/Footer/Footer";
import Navbar from "@/layouts/Header/navbar";

import type { Metadata } from "next";
import { poppins } from "../layout";

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
