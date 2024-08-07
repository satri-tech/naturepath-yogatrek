import PageWrapper from "@/layouts/PageWrapper";

export default function Layout({
  children,
  expenses,
}: Readonly<{
  children: React.ReactNode;
  expenses: React.ReactNode;
}>) {
  return (
    <PageWrapper>
      {children}
      {expenses}
    </PageWrapper>
  );
}
