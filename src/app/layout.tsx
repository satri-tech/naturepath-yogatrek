import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/components/HOC/provider";
import { Poppins } from "next/font/google";
import ToastProvider from "@/components/ui/ToastProvider";

 const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` container px-0 mx-auto max-w-[1900px] ${poppins.className}`}
      >
        <Provider>
          <ToastProvider>{children}</ToastProvider>
        </Provider>
      </body>
    </html>
  );
}
