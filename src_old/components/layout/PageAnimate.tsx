'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function PageAnimate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col min-h-screen flex-grow"
    >
      {children}
    </motion.div>
  );
}
