import PageWrapper from "@/layouts/PageWrapper";

export default function SitePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PageWrapper>{children}</PageWrapper>;
}
