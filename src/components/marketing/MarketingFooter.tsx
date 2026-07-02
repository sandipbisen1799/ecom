'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';

export default function MarketingFooter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus('error');
      setErrorMsg('Email address is required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setErrorMsg('');
      setTimeout(() => setStatus('idle'), 4000);
    }, 1500);
  };

  return (
    <footer id="contact" className="marketing-footer">
      <div className="footer-grid">
        <motion.div
          className="footer-brand"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="logo-box-sm">AHK</div>
          <p>Aurra Health Kart is a leading wellness brand dedicated to providing high-quality, natural health products directly to your doorstep.</p>
          <div className="footer-social">
            {['facebook-f', 'instagram', 'youtube'].map((icon) => (
              <motion.div key={icon} whileHover={{ y: -3, scale: 1.1 }} style={{ display: 'inline-flex' }}>
                <Link href="#" className="social-link">
                  <i className={`fa-brands fa-${icon}`} />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="footer-col"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h4 variants={fadeUp}>Quick Links</motion.h4>
          {['/', '#about', '#products', '#testimonials'].map((href, i) => {
            const labels = ['Home', 'About Us', 'Shop Products', 'Testimonials'];
            return (
              <motion.div key={href} variants={fadeUp} custom={i}>
                <Link href={href}>{labels[i]}</Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="footer-col"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h4 variants={fadeUp}>Business</motion.h4>
          {['Customer Login', 'Distributor Login', 'Franchise Login', 'Compensation Plan'].map((label, i) => (
            <motion.div key={label} variants={fadeUp} custom={i}>
              <Link href={label === 'Compensation Plan' ? '#' : '/login'}>{label}</Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="footer-col"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h4>Contact Info</h4>
          <a href="tel:+919876543210"><i className="fa-solid fa-phone" style={{ marginRight: '8px' }} /> +91 98765 43210</a>
          <a href="mailto:support@aurrahealthkart.in"><i className="fa-solid fa-envelope" style={{ marginRight: '8px' }} /> support@aurrahealth.in</a>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '8px', lineHeight: '1.6' }}>
            <i className="fa-solid fa-location-dot" style={{ marginRight: '8px' }} /> 123 Health Avenue, Business Park, New Delhi, 110001
          </p>
        </motion.div>

        <motion.div
          className="footer-col"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h4>Newsletter</h4>
          <p style={{ fontSize: '12px', lineHeight: '1.6', marginBottom: '14px', color: 'rgba(255,255,255,0.6)' }}>
            Subscribe to receive weekly wellness tips, new arrivals alerts, and special promotional discount codes!
          </p>
          <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter email address"
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '12px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            {status === 'error' && (
              <span style={{ fontSize: '10px', color: '#f87171', fontWeight: 600 }}>{errorMsg}</span>
            )}
            {status === 'success' && (
              <span style={{ fontSize: '10px', color: '#34d399', fontWeight: 600 }}>🎉 Subscribed successfully!</span>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                background: 'linear-gradient(135deg, var(--green), var(--green2))',
                color: '#fff',
                fontWeight: 700,
                padding: '10px',
                borderRadius: '10px',
                fontSize: '12px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
            </button>
          </form>
        </motion.div>
      </div>
      <div className="footer-bottom">
        &copy; 2026 Aurra Health Kart. All Rights Reserved. Built with Next.js
      </div>
    </footer>
  );
}
