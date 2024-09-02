import PageWrapper from "@/layouts/PageWrapper";

export default function ServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageWrapper className="vertical-padding-dashboard min-h-screen dark:">{children}</PageWrapper>
  );
}
