'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { buttonHover, buttonTap } from '@/lib/motion';

type AdminBtnVariant = 'primary' | 'outline' | 'sm' | 'sm-fill' | 'danger';

interface AdminButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: AdminBtnVariant;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const variantClass: Record<AdminBtnVariant, string> = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  sm: 'btn-sm',
  'sm-fill': 'btn-sm fill',
  danger: 'btn-danger',
};

export default function AdminButton({
  variant = 'primary',
  icon,
  children,
  className = '',
  ...props
}: AdminButtonProps) {
  return (
    <motion.button
      className={`${variantClass[variant]} ${className}`.trim()}
      whileHover={buttonHover}
      whileTap={buttonTap}
      {...props}
    >
      {icon}
      {children}
    </motion.button>
  );
}
