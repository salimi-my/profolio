'use client';

import { usePathname } from 'next/navigation';

export default function PageTitle() {
  const pathname = usePathname();

  let pageTitle = '';

  if (pathname === '/admin') {
    pageTitle = 'Dashboard';
  } else if (pathname === '/admin/about') {
    pageTitle = 'About';
  } else if (pathname.includes('/admin/experience')) {
    pageTitle = 'Experience';
  } else if (pathname === '/admin/expertise') {
    pageTitle = 'Expertise';
  } else if (pathname === '/admin/qualification') {
    pageTitle = 'Qualification';
  } else if (pathname === '/admin/portfolio') {
    pageTitle = 'Portfolio';
  } else if (pathname === '/admin/link') {
    pageTitle = 'Link';
  }

  return <h1 className='font-bold'>{pageTitle}</h1>;
}
