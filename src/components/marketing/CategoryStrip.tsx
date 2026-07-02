'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { categories } from './data';
import { fadeUp, staggerContainer } from '@/lib/motion';

export default function CategoryStrip() {
  const router = useRouter();
  return (
    <div className="relative z-20 bg-white dark:bg-slate-950 py-8 px-6 shadow-xl rounded-t-[2.5rem] -mt-8 max-w-6xl mx-auto border-x border-t border-slate-100 dark:border-slate-800">
      <motion.div
        className="max-w-5xl mx-auto flex justify-center gap-4 flex-wrap"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {categories.map((cat, i) => (
          <motion.button
            key={cat.label}
            type="button"
            onClick={() => router.push(`/user/shop?category=${encodeURIComponent(cat.label)}`)}
            className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group cursor-pointer"
            variants={fadeUp}
            custom={i}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-black/5 dark:border-white/5"
              style={{ background: cat.gradient }}
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.4 }}
            >
              {cat.emoji}
            </motion.div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 transition-colors">{cat.label}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
