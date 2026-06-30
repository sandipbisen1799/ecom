'use client';

import { motion } from 'framer-motion';
import SectionHead from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { fadeUp, staggerContainer } from '@/lib/motion';

const features = [
  { icon: 'fa-leaf', title: '100% Natural', desc: 'Pure, organic ingredients sourced from trusted farms across India.' },
  { icon: 'fa-certificate', title: 'Certified Quality', desc: 'Every product meets strict GMP and FSSAI quality standards.' },
  { icon: 'fa-truck-fast', title: 'Fast Delivery', desc: 'Pan-India shipping with real-time tracking on every order.' },
  { icon: 'fa-handshake', title: 'Proven MLM Model', desc: 'Transparent compensation plan with weekly payouts.' },
];

export default function AboutSection() {
  return (
    <div id="about" className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 border-t border-slate-100 dark:border-slate-800">
      <section className="max-w-7xl mx-auto px-6 py-24">
        <SectionHead
          title="Why Choose Aurra Health Kart"
          subtitle="A trusted wellness brand empowering health and financial growth"
        />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {features.map((f, i) => (
            <motion.div 
              key={f.title} 
              className="bg-white dark:bg-slate-950 rounded-2xl p-8 text-center shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1" 
              variants={fadeUp} 
              custom={i}
            >
              <motion.div
                className="w-16 h-16 rounded-2xl mx-auto mb-6 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-800/20 flex items-center justify-center text-3xl text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <i className={`fa-solid ${f.icon}`} />
              </motion.div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{f.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 py-6 shadow-lg shadow-emerald-600/20 text-base font-semibold"
          >
            <i className="fa-solid fa-rocket mr-2" />
            Start Your Journey
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
