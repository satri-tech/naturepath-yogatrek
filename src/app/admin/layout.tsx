import PageWrapper from "@/layouts/PageWrapper";
import Navbar from "@/layouts/admin/navbar";
import Sidebar from "@/layouts/admin/sidebar";
import type { Metadata } from "next";

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
    <main className={`flex flex-1 h-screen w-screen`}>
      <aside className="h-full">
        <Sidebar />
      </aside>
      <div className="h-full w-full overflow-y-auto">
        <Navbar />
        <div className="overflow-y-auto bg-bg-white dark:bg-gray-dark">
          {children}
        </div>
      </div>
    </main>
  );
}
