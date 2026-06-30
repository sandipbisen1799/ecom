'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { stats } from './data';
import { fadeUp, staggerContainer } from '@/lib/motion';

export default function StatsBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 py-20 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_60%)] pointer-events-none" />
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center text-white"
            variants={fadeUp}
            custom={i}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <motion.div
              className="text-5xl mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
            >
              {stat.emoji}
            </motion.div>
            <div className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight drop-shadow-md">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-sm md:text-base text-emerald-100 font-medium uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
