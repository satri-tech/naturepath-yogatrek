import PageWrapper from "@/layouts/PageWrapper";

export default function AddExpenseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PageWrapper>{children}</PageWrapper>;
}
