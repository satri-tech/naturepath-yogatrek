import PageWrapper from "@/layouts/PageWrapper";

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PageWrapper>{children}</PageWrapper>;
}
