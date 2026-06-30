'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { buttonHover, buttonTap } from '@/lib/motion';

export default function MarketingHeader() {
  return (
    <>
      <motion.div
        className="topbar"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="inner">
          <Link href="/login"><i className="fa-solid fa-user-circle" /> Customer Login</Link>
          <Link href="/login"><i className="fa-solid fa-user-tie" /> Distributor Login</Link>
        </div>
      </motion.div>

      <motion.header
        className="marketing-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="header-inner">
          <button className="hamburger" aria-label="Menu">
            <i className="fa-solid fa-bars" />
          </button>
          <Link href="/" className="logo-area">
            <motion.div
              className="logo-box"
              whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              AHK
            </motion.div>
            <div className="logo-txt">
              <h1>Aurra Health Kart</h1>
              <span>MLM Software</span>
            </div>
          </Link>
          <div className="search-bar">
            <input type="text" placeholder="Search for products, categories..." />
            <motion.button whileHover={buttonHover} whileTap={buttonTap}>
              <i className="fa-solid fa-magnifying-glass" />
            </motion.button>
          </div>
          <div className="header-actions">
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Link href="#" className="icon-btn" title="Wishlist">
                <i className="fa-regular fa-heart" />
                <span className="badge">3</span>
              </Link>
            </motion.div>
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Link href="#" className="icon-btn" title="Cart">
                <i className="fa-solid fa-cart-shopping" />
                <span className="badge">5</span>
              </Link>
            </motion.div>
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Link href="/login" className="btn-login-hdr">Login</Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <nav id="mainNav" className="marketing-nav">
        <div className="nav-inner">
          {[
            { href: '/', label: 'Home', active: true },
            { href: '#about', label: 'About Us' },
            { href: '#products', label: 'Shopping Mall' },
            { href: '#gallery', label: 'Event Gallery' },
            { href: '#contact', label: 'Contact Us' },
          ].map((item) => (
            <motion.div key={item.label} whileHover={{ y: -2 }} style={{ display: 'inline-flex' }}>
              <Link href={item.href} className={`nav-link ${item.active ? 'active' : ''}`}>
                {item.label}
              </Link>
            </motion.div>
          ))}
          <motion.div whileHover={{ scale: 1.02 }} style={{ display: 'inline-flex' }}>
            <Link href="#" className="nav-link">
              <span className="blink">Download Brochure</span>
            </Link>
          </motion.div>
        </div>
      </nav>
    </>
  );
}
