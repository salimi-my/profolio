import Header from '@/components/landing/header';
import { ModeToggle } from '@/components/mode-toggle';

export default function Home() {
  return (
    <main className='relative'>
      <div className='absolute top-5 right-5'>
        <ModeToggle />
      </div>
      <Header />
    </main>
  );
}
