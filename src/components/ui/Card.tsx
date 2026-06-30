'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { cardHover } from '@/lib/motion';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export default function Card({
  children,
  className = '',
  interactive = true,
  ...props
}: CardProps) {
  return (
    <motion.div
      className={`ui-card ${className}`.trim()}
      initial="rest"
      whileHover={interactive ? 'hover' : undefined}
      variants={interactive ? cardHover : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}
