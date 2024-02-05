import prismadb from '@/lib/prismadb';
import Footer from '@/components/main/footer';

export default async function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const miscellaneous = await prismadb.miscellaneous.findFirst();

  return (
    <>
      {children}
      <Footer miscellaneous={miscellaneous} />
    </>
  );
}
