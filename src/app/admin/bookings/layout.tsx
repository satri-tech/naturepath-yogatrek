import PageWrapper from "@/layouts/PageWrapper";

export default function BookingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageWrapper className="vertical-padding-dashboard min-h-screen">
      {children}
    </PageWrapper>
  );
}
