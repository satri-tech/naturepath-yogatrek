import PageWrapper from "@/layouts/PageWrapper";

export default function Layout({
  children,
  expenses,
}: Readonly<{
  children: React.ReactNode;
  expenses: React.ReactNode;
}>) {
  return (
    <PageWrapper className="vertical-padding-dashboard min-h-screen">
      {children}
      {expenses}
    </PageWrapper>
  );
}
