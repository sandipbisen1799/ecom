import Link from 'next/link';
import './marketing.css';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* TOPBAR */}
      <div className="topbar">
        <div className="inner">
          <Link href="/login"><i className="fa-solid fa-user-circle"></i> Customer Login</Link>
          <Link href="/login"><i className="fa-solid fa-user-tie"></i> Distributor Login</Link>
        </div>
      </div>

      {/* HEADER */}
      <header>
        <div className="header-inner">
          <button className="hamburger"><i className="fa-solid fa-bars"></i></button>
          <Link href="/" className="logo-area">
            <div className="logo-box">AHK</div>
            <div className="logo-txt">
              <h1>Aurra Health Kart</h1>
              <span>MLM Software</span>
            </div>
          </Link>
          <div className="search-bar">
            <input type="text" placeholder="Search for products, categories..." />
            <button><i className="fa-solid fa-magnifying-glass"></i></button>
          </div>
          <div className="header-actions">
            <Link href="#" className="icon-btn" title="Wishlist"><i className="fa-regular fa-heart"></i><span className="badge">3</span></Link>
            <Link href="#" className="icon-btn" title="Cart"><i className="fa-solid fa-cart-shopping"></i><span className="badge">5</span></Link>
            <Link href="/login" className="btn-login-hdr">Login</Link>
          </div>
        </div>
      </header>

      {/* NAV */}
      <nav id="mainNav">
        <div className="nav-inner">
          <Link href="/" className="nav-link active">Home</Link>
          <Link href="#about" className="nav-link">About Us</Link>
          <Link href="#products" className="nav-link">Shopping Mall</Link>
          <Link href="#gallery" className="nav-link">Event Gallery</Link>
          <Link href="#contact" className="nav-link">Contact Us</Link>
          <Link href="#" className="nav-link"><span className="blink">Download Brochure</span></Link>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      {children}

      {/* FOOTER */}
      <footer id="contact">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo-box-sm">AHK</div>
            <p>Aurra Health Kart is a leading wellness brand dedicated to providing high-quality, natural health products directly to your doorstep.</p>
            <div className="footer-social">
              <Link href="#" className="social-link"><i className="fa-brands fa-facebook-f"></i></Link>
              <Link href="#" className="social-link"><i className="fa-brands fa-instagram"></i></Link>
              <Link href="#" className="social-link"><i className="fa-brands fa-youtube"></i></Link>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link href="/">Home</Link>
            <Link href="#about">About Us</Link>
            <Link href="#products">Shop Products</Link>
            <Link href="#testimonials">Testimonials</Link>
          </div>
          <div className="footer-col">
            <h4>Business</h4>
            <Link href="/login">Customer Login</Link>
            <Link href="/login">Distributor Login</Link>
            <Link href="/login">Franchise Login</Link>
            <Link href="#">Compensation Plan</Link>
          </div>
          <div className="footer-col">
            <h4>Contact Info</h4>
            <a href="tel:+919876543210"><i className="fa-solid fa-phone" style={{marginRight: '8px'}}></i> +91 98765 43210</a>
            <a href="mailto:support@aurrahealthkart.in"><i className="fa-solid fa-envelope" style={{marginRight: '8px'}}></i> support@aurrahealth.in</a>
            <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '8px', lineHeight: '1.6'}}>
              <i className="fa-solid fa-location-dot" style={{marginRight: '8px'}}></i> 123 Health Avenue, Business Park, New Delhi, 110001
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2026 Aurra Health Kart. All Rights Reserved. Built with Next.js
        </div>
      </footer>
    </>
  );
}
