
;

export default function Layout({
  children, expenses
}: Readonly<{
  children: React.ReactNode;
  expenses: React.ReactNode;
}>) {
  return (
            <>
            {children}
            {expenses}
            </>
        
  );
}
