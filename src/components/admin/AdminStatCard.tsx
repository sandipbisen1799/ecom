'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { fadeUp } from '@/lib/motion';

type StatVariant = 'green' | 'orange' | 'blue' | 'purple' | 'red';

interface AdminStatCardProps {
  icon: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  change?: string;
  trend?: 'up' | 'down';
  variant: StatVariant;
  index?: number;
  isNumeric?: boolean;
  displayValue?: string;
}

export default function AdminStatCard({
  icon,
  value,
  prefix = '',
  suffix = '',
  label,
  change,
  trend,
  variant,
  index = 0,
  isNumeric = true,
  displayValue,
}: AdminStatCardProps) {
  return (
    <motion.div
      className={`stat-card ${variant} admin-stat-card`}
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="stat-icon"
        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
        transition={{ duration: 0.4 }}
      >
        <i className={`fa-solid ${icon}`} />
      </motion.div>
      <div className="stat-num">
        {isNumeric ? (
          <>
            {prefix}
            <AnimatedCounter value={value} suffix={suffix} duration={1.8} />
          </>
        ) : (
          displayValue
        )}
      </div>
      <div className="stat-label">{label}</div>
      {change && trend && (
        <div className={`stat-change ${trend}`}>
          <i className={`fa-solid fa-arrow-trend-${trend}`} /> {change}
        </div>
      )}
      <div className="stat-card-shine" />
    </motion.div>
  );
}
