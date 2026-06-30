'use client';

import { motion } from 'framer-motion';
import SectionHead from '@/components/ui/SectionHead';
import { testimonials } from './data';
import { fadeUp, staggerContainer } from '@/lib/motion';

export default function Testimonials() {
  return (
    <div id="testimonials" className="bg-slate-50 dark:bg-slate-900/40 py-20">
      <section className="max-w-7xl mx-auto px-6">
        <SectionHead
          title="What Our Community Says"
          subtitle="Real stories from real people who transformed their health and wealth"
        />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {testimonials.map((t, i) => (
            <motion.div key={t.id} variants={fadeUp} custom={i}>
              <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative h-full flex flex-col border border-slate-100 dark:border-slate-800">
                <motion.div
                  className="absolute top-4 right-6 text-7xl font-serif text-emerald-100 dark:text-emerald-900/30 leading-none select-none pointer-events-none"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  &ldquo;
                </motion.div>
                <p className="text-slate-600 dark:text-slate-300 italic mb-8 relative z-10 leading-relaxed flex-1">
                  {t.text}
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-inner shrink-0"
                    style={{ background: t.gradient }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {t.avatar}
                  </motion.div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{t.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium uppercase tracking-wider">{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
