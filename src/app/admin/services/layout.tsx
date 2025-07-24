import PageWrapper from "@/layouts/PageWrapper";

export default function ServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageWrapper className=" min-h-screen   md:px-7 py-6">{children}</PageWrapper>
  );
}
