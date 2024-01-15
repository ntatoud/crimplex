'use client';

import { motion } from 'framer-motion';

export default function AdminGuestOnlyTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: 'easeInOut', duration: 0.5 }}
      className="flex flex-col gap-5 justify-center items-center"
    >
      {children}
    </motion.div>
  );
}
