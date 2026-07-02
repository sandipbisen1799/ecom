'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function MarketingHeader() {
  const [activeNav, setActiveNav] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [brochureDownloading, setBrochureDownloading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadCart = () => {
        setCartItems(JSON.parse(localStorage.getItem('ahk_cart') || '[]'));
      };
      const loadWishlist = () => {
        setWishlistItems(JSON.parse(localStorage.getItem('ahk_wishlist') || '[]'));
      };

      loadCart();
      loadWishlist();

      window.addEventListener('ahk_cart_updated', loadCart);
      window.addEventListener('ahk_wishlist_updated', loadWishlist);

      return () => {
        window.removeEventListener('ahk_cart_updated', loadCart);
        window.removeEventListener('ahk_wishlist_updated', loadWishlist);
      };
    }
  }, []);

  const updateCartQty = (id: number, delta: number) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        const newQty = (item.quantity || 1) + delta;
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem('ahk_cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('ahk_cart_updated'));
  };

  const removeFromCart = (id: number) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('ahk_cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('ahk_cart_updated'));
    showToast('❌ Item removed from cart');
  };

  const removeFromWishlist = (id: number) => {
    const updated = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updated);
    localStorage.setItem('ahk_wishlist', JSON.stringify(updated));
    window.dispatchEvent(new Event('ahk_wishlist_updated'));
    showToast('❌ Item removed from wishlist');
  };

  const moveWishlistToCart = (item: any) => {
    const updatedWishlist = wishlistItems.filter(w => w.id !== item.id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('ahk_wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event('ahk_wishlist_updated'));

    const cart = JSON.parse(localStorage.getItem('ahk_cart') || '[]');
    const existing = cart.find((c: any) => c.id === item.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem('ahk_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('ahk_cart_updated'));
    showToast('🛒 Moved item to cart!');
  };

  const handleCheckout = () => {
    setCartOpen(false);
    showToast('🎉 Order placed successfully! Thank you.');
    localStorage.setItem('ahk_cart', '[]');
    setCartItems([]);
    window.dispatchEvent(new Event('ahk_cart_updated'));
  };

  const handleDownloadBrochure = (e: React.MouseEvent) => {
    e.preventDefault();
    if (brochureDownloading) return;
    setBrochureDownloading(true);
    showToast('📥 Starting PDF brochure download...');
    setTimeout(() => {
      setBrochureDownloading(false);
      showToast('✅ Brochure PDF downloaded successfully!');
    }, 2000);
  };
  
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
          <button 
            className="hamburger" 
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
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
              <button 
                onClick={() => setWishlistOpen(true)} 
                className="icon-btn" 
                title="Wishlist"
                style={{ border: 'none', cursor: 'pointer' }}
              >
                <i className="fa-regular fa-heart" />
                {wishlistItems.length > 0 && (
                  <motion.span 
                    className="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={wishlistItems.length}
                  >
                    {wishlistItems.length}
                  </motion.span>
                )}
              </button>
            </motion.div>
            <motion.div whileHover={{ y: -3, scale: 1.05 }} whileTap={{ scale: 0.9 }}>
              <button 
                onClick={() => setCartOpen(true)} 
                className="icon-btn" 
                title="Cart"
                style={{ border: 'none', cursor: 'pointer' }}
              >
                <i className="fa-solid fa-cart-shopping" />
                {cartItems.length > 0 && (
                  <motion.span 
                    className="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={cartItems.length}
                  >
                    {cartItems.reduce((acc, curr) => acc + (curr.quantity || 1), 0)}
                  </motion.span>
                )}
              </button>
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
              <button 
                onClick={handleDownloadBrochure} 
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-lg px-5 py-2.5 text-sm shadow-md hover:shadow-lg transition border-none cursor-pointer"
                disabled={brochureDownloading}
              >
                <i className="fa-solid fa-download"></i> {brochureDownloading ? 'Downloading...' : 'Download Brochure'}
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[990] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Sliding Drawer */}
            <motion.div
              className="fixed right-0 top-0 bottom-0 w-[280px] bg-emerald-950 text-white z-[995] shadow-2xl p-6 flex flex-col md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center font-bold text-white text-lg">
                    AHK
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-tight text-white">Aurra Health</h3>
                    <span className="text-[10px] text-amber-400 uppercase font-semibold tracking-wider">MLM Site</span>
                  </div>
                </div>
                <button
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition text-white border-none"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <i className="fa-solid fa-xmark text-lg" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-2 mb-8">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setActiveNav(item.label);
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition text-sm ${
                      activeNav === item.label
                        ? 'bg-emerald-800 text-white shadow-inner'
                        : 'text-white/80 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-white/10">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl py-3 text-sm transition"
                >
                  <i className="fa-solid fa-user-circle" /> Customer Login
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl py-3 text-sm transition"
                >
                  <i className="fa-solid fa-user-tie" /> Distributor Login
                </Link>
                <button
                  onClick={handleDownloadBrochure}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl py-3 text-sm shadow-md hover:shadow-lg transition border-none cursor-pointer"
                  disabled={brochureDownloading}
                >
                  <i className="fa-solid fa-download" /> {brochureDownloading ? 'Downloading...' : 'Download Brochure'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              className="fixed right-0 top-0 bottom-0 w-full max-w-[400px] bg-white text-slate-800 z-[1010] shadow-2xl p-6 flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                <h3 className="font-extrabold text-lg flex items-center gap-2 text-emerald-800">
                  <i className="fa-solid fa-cart-shopping" /> My Shopping Cart
                </h3>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition text-slate-500 border-none cursor-pointer"
                >
                  <i className="fa-solid fa-xmark text-lg" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-4">
                  <i className="fa-solid fa-basket-shopping text-6xl text-slate-200" />
                  <p className="font-medium">Your shopping cart is empty.</p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-6 py-2 rounded-xl text-sm border-none cursor-pointer transition shadow-md"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 items-center">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ background: item.gradient }}>
                          {item.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-slate-900 truncate">{item.name}</h4>
                          <span className="text-emerald-700 font-extrabold text-sm">₹{item.price.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 p-1">
                          <button
                            onClick={() => updateCartQty(item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 rounded text-slate-500 border-none bg-transparent cursor-pointer font-bold"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-slate-800 w-4 text-center">{item.quantity || 1}</span>
                          <button
                            onClick={() => updateCartQty(item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 rounded text-slate-500 border-none bg-transparent cursor-pointer font-bold"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 border-none cursor-pointer transition"
                          title="Remove item"
                        >
                          <i className="fa-solid fa-trash-can text-xs" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex flex-col gap-3">
                    <div className="flex justify-between font-bold text-slate-800 text-lg">
                      <span>Total Amount:</span>
                      <span className="text-emerald-800 font-black">
                        ₹{cartItems.reduce((acc, curr) => acc + curr.price * (curr.quantity || 1), 0).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-extrabold py-4 rounded-xl shadow-lg hover:shadow-xl border-none cursor-pointer transition text-center"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Wishlist Drawer */}
      <AnimatePresence>
        {wishlistOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setWishlistOpen(false)}
            />
            <motion.div
              className="fixed right-0 top-0 bottom-0 w-full max-w-[400px] bg-white text-slate-800 z-[1010] shadow-2xl p-6 flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                <h3 className="font-extrabold text-lg flex items-center gap-2 text-red-600">
                  <i className="fa-regular fa-heart" /> My Wishlist
                </h3>
                <button
                  onClick={() => setWishlistOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition text-slate-500 border-none cursor-pointer"
                >
                  <i className="fa-solid fa-xmark text-lg" />
                </button>
              </div>

              {wishlistItems.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-4">
                  <i className="fa-regular fa-heart text-6xl text-slate-200" />
                  <p className="font-medium">Your wishlist is empty.</p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 items-center">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ background: item.gradient }}>
                        {item.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-slate-900 truncate">{item.name}</h4>
                        <span className="text-emerald-700 font-extrabold text-sm">₹{item.price.toLocaleString('en-IN')}</span>
                      </div>
                      <button
                        onClick={() => moveWishlistToCart(item)}
                        className="w-9 h-9 rounded-full bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center text-emerald-600 border-none cursor-pointer transition"
                        title="Add to cart"
                      >
                        <i className="fa-solid fa-cart-plus text-sm" />
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="w-9 h-9 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-slate-400 border-none cursor-pointer transition"
                        title="Remove"
                      >
                        <i className="fa-solid fa-trash-can text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            className="fixed bottom-6 left-6 bg-slate-900 text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl z-[9999] flex items-center gap-2 border border-white/10"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
