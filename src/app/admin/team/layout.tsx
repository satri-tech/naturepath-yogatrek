import PageWrapper from "@/layouts/PageWrapper";

export default function TeamLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PageWrapper>{children}</PageWrapper>;
}
