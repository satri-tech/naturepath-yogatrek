import PageWrapper from "@/layouts/PageWrapper";

export default function PackageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PageWrapper>{children}</PageWrapper>;
}
