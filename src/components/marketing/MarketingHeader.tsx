'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MarketingHeader() {
  const [activeNav, setActiveNav] = useState('Home');
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '#about', label: 'About Us' },
    { href: '#products', label: 'Shopping Mall' },
    { href: '#gallery', label: 'Event Gallery' },
    { href: '#contact', label: 'Contact Us' },
  ];

  return (
    <>
      <motion.div
        className="topbar"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="inner">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/login" className="hover:text-green-200 transition-colors">
              <i className="fa-solid fa-user-circle" /> Customer Login
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/login" className="hover:text-green-200 transition-colors">
              <i className="fa-solid fa-user-tie" /> Distributor Login
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.header
        className="marketing-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <div className="header-inner">
          <button className="hamburger" aria-label="Menu">
            <i className="fa-solid fa-bars" />
          </button>
          
          <Link href="/" className="logo-area group">
            <motion.div
              className="logo-box"
              whileHover={{ rotate: [-4, 4, -4, 0], scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              AHK
            </motion.div>
            <div className="logo-txt">
              <h1 className="group-hover:text-green-600 transition-colors">Aurra Health Kart</h1>
              <span>MLM Software</span>
            </div>
          </Link>
          
          <div className="search-bar">
            <input type="text" placeholder="Search for products, categories..." />
            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.95 }}
            >
              <i className="fa-solid fa-magnifying-glass" />
            </motion.button>
          </div>
          
          <div className="header-actions">
            <motion.div whileHover={{ y: -3, scale: 1.05 }} whileTap={{ scale: 0.9 }}>
              <Link href="#" className="icon-btn" title="Wishlist">
                <i className="fa-regular fa-heart" />
                <motion.span 
                  className="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.5 }}
                >
                  3
                </motion.span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -3, scale: 1.05 }} whileTap={{ scale: 0.9 }}>
              <Link href="#" className="icon-btn" title="Cart">
                <i className="fa-solid fa-cart-shopping" />
                <motion.span 
                  className="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.6 }}
                >
                  5
                </motion.span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/login" className="btn-login-hdr relative overflow-hidden group">
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out"></div>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <nav id="mainNav" className="marketing-nav shadow-lg">
        <div className="nav-inner">
          {navItems.map((item) => (
            <div key={item.label} className="relative flex">
              <Link 
                href={item.href} 
                className={`nav-link ${activeNav === item.label ? 'text-white' : 'text-white/80'}`}
                onMouseEnter={() => setActiveNav(item.label)}
              >
                {item.label}
              </Link>
              {activeNav === item.label && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-amber-400 rounded-t-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </div>
          ))}
          <div className="ml-auto flex items-center">
             <motion.div 
               whileHover={{ scale: 1.05 }} 
               animate={{ boxShadow: ['0 0 0 0 rgba(245,158,11,0.6)', '0 0 0 10px rgba(245,158,11,0)', '0 0 0 0 rgba(245,158,11,0)'] }}
               transition={{ duration: 1.8, repeat: Infinity }}
               className="rounded-lg mr-2"
             >
              <Link href="#" className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-lg px-5 py-2.5 text-sm shadow-md hover:shadow-lg transition">
                <i className="fa-solid fa-download"></i> Download Brochure
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>
    </>
  );
}
