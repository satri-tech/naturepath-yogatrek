import Footer from "@/components/layouts/Footer/Footer";
import Navbar from "@/components/layouts/Header/navbar";
import type { Metadata } from "next";




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
   
      <>
        <Navbar />
        {children}
        <Footer/>

      </>
           
   
  );
}
