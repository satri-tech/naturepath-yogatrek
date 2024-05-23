import PageWrapper from "@/layouts/PageWrapper";
import Navbar from "@/layouts/admin/navbar";
import Sidebar from "@/layouts/admin/sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
        <Sidebar />
      </aside>
      <div className="h-full w-full overflow-y-auto">
        <Navbar />
        <div className="h-[90%] overflow-y-auto">
          <PageWrapper>{children}</PageWrapper>
        </div>
      </div>
    </main>
  );
}
