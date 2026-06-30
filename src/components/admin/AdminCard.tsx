'use client';

import { motion } from 'framer-motion';
import { cardHover } from '@/lib/motion';

interface AdminCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export default function AdminCard({
  children,
  className = '',
  interactive = true,
}: AdminCardProps) {
  return (
    <motion.div
      className={`card admin-card ${className}`.trim()}
      initial="rest"
      whileHover={interactive ? 'hover' : undefined}
      variants={interactive ? cardHover : undefined}
    >
      {children}
    </motion.div>
  );
}
