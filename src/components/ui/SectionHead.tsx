'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

interface SectionHeadProps {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}

export default function SectionHead({
  title,
  subtitle,
  align = 'center',
}: SectionHeadProps) {
  return (
    <motion.div
      className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
    >
      <motion.span 
        className="inline-block text-[11px] font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2.5" 
        variants={fadeUp} 
        custom={0}
      >
        Aurra Health Kart
      </motion.span>
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-[15px] text-slate-500 dark:text-slate-400 leading-relaxed ${align === 'center' ? 'max-w-xl mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
      <motion.div
        className={`w-16 h-1 rounded-full bg-gradient-to-r from-emerald-600 to-green-400 mt-5 ${align === 'center' ? 'mx-auto origin-center' : 'origin-left'}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}
