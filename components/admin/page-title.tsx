'use client';

import { usePathname } from 'next/navigation';

export default function PageTitle() {
  const pathname = usePathname();

  let pageTitle = '';

  if (pathname === '/dashboard') {
    pageTitle = 'Dashboard';
  } else if (pathname.includes('/about')) {
    pageTitle = 'About';
  } else if (pathname.includes('/experience')) {
    pageTitle = 'Experience';
  } else if (pathname.includes('/expertise')) {
    pageTitle = 'Expertise';
  } else if (pathname.includes('/qualification')) {
    pageTitle = 'Qualification';
  } else if (pathname.includes('/portfolio')) {
    pageTitle = 'Portfolio';
  } else if (pathname.includes('/miscellaneous')) {
    pageTitle = 'Miscellaneous';
  } else if (pathname.includes('/tool')) {
    pageTitle = 'Tool & Apps';
  } else if (pathname.includes('/resume')) {
    pageTitle = 'Resume';
  } else if (pathname.includes('/account')) {
    pageTitle = 'Account';
  }

  return <h1 className='font-bold'>{pageTitle}</h1>;
}
