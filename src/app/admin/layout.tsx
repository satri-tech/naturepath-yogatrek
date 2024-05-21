import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Sidebar from "@/components/layouts/sidebar";
import Navbar from "@/components/layouts/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin",
  description: "A admin portal for the website ",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className={`${inter.className} flex flex-1 h-screen w-screen`}>
        <aside className="h-full">
        <Sidebar/>
        </aside>
        <div className="h-full w-full overflow-y-auto">
        <Navbar/>
          <div className="h-[90%] overflow-y-auto">
          {children}
          </div>
        </div>
        </main>
  );
}
