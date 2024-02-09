import { LazyMotion, domAnimation } from 'framer-motion';

export default function LazyMotionLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
