import ModalProvider from '@/providers/modal-provider';

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ModalProvider />
      {children}
    </>
  );
}
