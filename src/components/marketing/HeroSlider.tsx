'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { heroSlides } from './data';
import { slideInLeft, slideInRight } from '@/lib/motion';

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const next = useCallback(() => goTo((current + 1) % heroSlides.length, 1), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + heroSlides.length) % heroSlides.length, -1), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(() => next(), 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = heroSlides[current];

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
  };

  return (
    <section className="relative overflow-hidden min-h-[600px] flex items-stretch bg-slate-950" aria-label="Hero Banner">
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06)_0%,transparent_40%)]" />
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slide.id}
          className="absolute inset-0 flex items-center justify-center z-10 w-full"
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: slide.gradient }}
        >
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full relative z-20">
            <motion.div
              className="text-white text-center lg:text-left pt-20 lg:pt-0"
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
            >
              <motion.span
                className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-sm font-semibold mb-6 border border-white/20"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {slide.tag}
              </motion.span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
                {slide.title}
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-200">
                  {slide.titleAccent}
                </span>
              </h2>
              <p className="text-lg text-emerald-50 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
                {slide.description}
              </p>
              <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
                <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50 rounded-full font-bold px-8 shadow-xl shadow-emerald-900/20">
                  {slide.primaryCta.label}
                </Button>
                <Button size="lg" variant="outline" className="rounded-full text-white border-white/40 hover:bg-white/10 font-semibold px-8 bg-transparent">
                  {slide.secondaryCta.label}
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="hidden lg:flex items-center justify-center relative"
              variants={slideInRight}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="absolute w-[340px] h-[340px] rounded-full border border-white/20 border-dashed"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-[420px] h-[420px] rounded-full border border-white/10 border-dashed"
                animate={{ rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="w-56 h-56 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-8xl text-white border border-white/30 shadow-2xl shadow-black/20"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <i className={`fa-solid ${slide.icon} drop-shadow-lg`} />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/40 transition-colors"
        onClick={prev}
        whileHover={{ scale: 1.1, x: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Previous slide"
      >
        <i className="fa-solid fa-chevron-left" />
      </motion.button>
      <motion.button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/40 transition-colors"
        onClick={next}
        whileHover={{ scale: 1.1, x: 2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Next slide"
      >
        <i className="fa-solid fa-chevron-right" />
      </motion.button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {heroSlides.map((_, i) => (
          <motion.button
            key={i}
            className={`h-2.5 rounded-full bg-white/40 transition-all duration-300 ${current === i ? 'w-8 bg-white' : 'w-2.5'}`}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${i + 1}`}
            layout
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
        <motion.div
          className="h-full bg-white/60 origin-left"
          key={current}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 6, ease: 'linear' }}
        />
      </div>
    </section>
  );
}
