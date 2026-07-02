'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Product } from './data';
import { buttonTap } from '@/lib/motion';

interface ProductCardProps {
  product: Product;
  index: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className={`text-[13px] ${i < rating ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700'}`}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem('ahk_wishlist') || '[]');
      setWishlisted(wishlist.some((item: any) => item.id === product.id));
    }
  }, [product.id]);

  const handleAddToCart = () => {
    setInCart(true);
    setTimeout(() => setInCart(false), 2000);
    
    if (typeof window !== 'undefined') {
      const cart = JSON.parse(localStorage.getItem('ahk_cart') || '[]');
      const existing = cart.find((item: any) => item.id === product.id);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('ahk_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('ahk_cart_updated'));
    }
  };

  const toggleWishlist = () => {
    const nextVal = !wishlisted;
    setWishlisted(nextVal);
    
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem('ahk_wishlist') || '[]');
      if (nextVal) {
        if (!wishlist.some((item: any) => item.id === product.id)) {
          wishlist.push(product);
        }
      } else {
        const idx = wishlist.findIndex((item: any) => item.id === product.id);
        if (idx > -1) wishlist.splice(idx, 1);
      }
      localStorage.setItem('ahk_wishlist', JSON.stringify(wishlist));
      window.dispatchEvent(new Event('ahk_wishlist_updated'));
    }
  };

  return (
    <div className="h-full bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden group">
      <motion.div
        className="relative h-52 flex items-center justify-center overflow-hidden"
        style={{ background: product.gradient }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08 }}
      >
        <motion.span
          className="text-6xl drop-shadow-md group-hover:scale-110 transition-transform duration-500"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
        >
          {product.emoji}
        </motion.span>
        
        <motion.span
          className="absolute top-3 left-3 bg-orange-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase shadow-md"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + index * 0.05 }}
        >
          {product.discount}
        </motion.span>
        
        <motion.button
          className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border-none cursor-pointer flex items-center justify-center text-[15px] shadow-sm transition-colors z-10 ${wishlisted ? 'text-red-500' : 'text-slate-400 hover:text-red-400'}`}
          onClick={toggleWishlist}
          whileHover={{ scale: 1.15 }}
          whileTap={buttonTap}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <AnimatePresence mode="wait">
            <motion.i
              key={wishlisted ? 'filled' : 'empty'}
              className={wishlisted ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>
        </motion.button>
      </motion.div>

      <div className="p-5 flex-1 flex flex-col">
        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1.5">{product.category}</span>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center gap-2 mb-4">
          <StarRating rating={product.rating} />
          <span className="text-xs text-slate-500 dark:text-slate-400">({product.reviews})</span>
        </div>
        
        <div className="mt-auto pt-2 flex items-end justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="text-sm text-slate-400 line-through">₹{product.oldPrice.toLocaleString('en-IN')}</span>
          </div>
          {typeof product.bv === 'number' && (
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-1 rounded-md whitespace-nowrap">
              {product.bv} BV
            </span>
          )}
        </div>
        
        <Button
          className={`w-full rounded-xl py-5 font-semibold transition-all ${inCart ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-emerald-700 hover:bg-emerald-800'}`}
          onClick={handleAddToCart}
        >
          <motion.i
            className={`mr-2 ${inCart ? 'fa-solid fa-check' : 'fa-solid fa-cart-plus'}`}
            animate={inCart ? { scale: [1, 1.3, 1] } : {}}
          />
          <AnimatePresence mode="wait">
            <motion.span
              key={inCart ? 'added' : 'add'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {inCart ? 'Added to Cart!' : 'Add to Cart'}
            </motion.span>
          </AnimatePresence>
        </Button>
      </div>
    </div>
  );
}
