'use client';

import { motion } from 'framer-motion';
import SectionHead from '@/components/ui/SectionHead';
import ProductCard from './ProductCard';
import { products } from './data';
import { staggerContainer, fadeUp } from '@/lib/motion';

export default function FeaturedProducts() {
  return (
    <div id="products" className="bg-slate-50/50 dark:bg-slate-900/50">
      <section className="max-w-7xl mx-auto px-6 py-24">
        <SectionHead
          title="Featured Products"
          subtitle="Handpicked health & wellness essentials for you"
        />
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {products.map((product, i) => (
            <motion.div key={product.id} variants={fadeUp} custom={i} className="h-full">
              <ProductCard product={product} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
