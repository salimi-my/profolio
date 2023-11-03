import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export const useAnchor = () => {
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const [anchor, setAnchor] = useState('');

  useEffect(() => {
    setMounted(true);
    setAnchor(window.location.hash);
  }, [params]);

  if (!mounted) {
    return '';
  }

  return anchor;
};
