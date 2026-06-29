'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import './marketing.css'; // Just in case, though it's imported in layout

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % 3);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + 3) % 3);

  return (
    <main>
      {/* HERO SLIDER */}
      <section className="hero" aria-label="Hero Banner">
        <div className={`slide slide-1 ${currentSlide === 0 ? 'active' : ''}`}>
          <div className="slide-content">
            <div className="slide-tag">🌿 Natural &amp; Organic</div>
            <h2>Health is Your<br/>Greatest Wealth</h2>
            <p>Discover premium health &amp; wellness products crafted with nature's best ingredients for you and your family.</p>
            <div className="slide-btns">
              <Link href="#products" className="btn-primary">Shop Now</Link>
              <Link href="/login" className="btn-outline">Join Network</Link>
            </div>
          </div>
          <div className="slide-image"><i className="fa-solid fa-leaf"></i></div>
        </div>
        <div className={`slide slide-2 ${currentSlide === 1 ? 'active' : ''}`}>
          <div className="slide-content">
            <div className="slide-tag">💰 MLM Opportunity</div>
            <h2>Earn While You<br/>Build Health</h2>
            <p>Join thousands of successful distributors building financial freedom through our proven MLM network.</p>
            <div className="slide-btns">
              <Link href="/login" className="btn-primary">Start Earning</Link>
              <Link href="#about" className="btn-outline">Learn More</Link>
            </div>
          </div>
          <div className="slide-image"><i className="fa-solid fa-hand-holding-dollar"></i></div>
        </div>
        <div className={`slide slide-3 ${currentSlide === 2 ? 'active' : ''}`}>
          <div className="slide-content">
            <div className="slide-tag">🏆 Award Winning</div>
            <h2>Trusted by<br/>50,000+ Families</h2>
            <p>Award-winning health solutions trusted by over 50,000 happy customers across India.</p>
            <div className="slide-btns">
              <Link href="#testimonials" className="btn-primary">See Reviews</Link>
              <Link href="#products" className="btn-outline">Browse Products</Link>
            </div>
          </div>
          <div className="slide-image"><i className="fa-solid fa-trophy"></i></div>
        </div>

        <button className="hero-arrow prev" onClick={prevSlide}><i className="fa-solid fa-chevron-left"></i></button>
        <button className="hero-arrow next" onClick={nextSlide}><i className="fa-solid fa-chevron-right"></i></button>
        <div className="hero-dots">
          <div className={`dot ${currentSlide === 0 ? 'active' : ''}`} onClick={() => setCurrentSlide(0)}></div>
          <div className={`dot ${currentSlide === 1 ? 'active' : ''}`} onClick={() => setCurrentSlide(1)}></div>
          <div className={`dot ${currentSlide === 2 ? 'active' : ''}`} onClick={() => setCurrentSlide(2)}></div>
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <div className="category-strip">
        <div className="cat-inner">
          <div className="cat-item">
            <div className="cat-icon" style={{background: 'linear-gradient(135deg,#e8f5e9,#c8e6c9)'}}>💊</div>
            <span>Supplements</span>
          </div>
          <div className="cat-item">
            <div className="cat-icon" style={{background: 'linear-gradient(135deg,#fce4ec,#f8bbd0)'}}>🌸</div>
            <span>Skincare</span>
          </div>
          <div className="cat-item">
            <div className="cat-icon" style={{background: 'linear-gradient(135deg,#fff3e0,#ffe0b2)'}}>🥤</div>
            <span>Nutrition</span>
          </div>
          <div className="cat-item">
            <div className="cat-icon" style={{background: 'linear-gradient(135deg,#e3f2fd,#bbdefb)'}}>💧</div>
            <span>Immunity</span>
          </div>
          <div className="cat-item">
            <div className="cat-icon" style={{background: 'linear-gradient(135deg,#f3e5f5,#e1bee7)'}}>🧴</div>
            <span>Personal Care</span>
          </div>
          <div className="cat-item">
            <div className="cat-icon" style={{background: 'linear-gradient(135deg,#e8eaf6,#c5cae9)'}}>🏋️</div>
            <span>Fitness</span>
          </div>
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <div id="products">
        <section className="section">
          <div className="section-head">
            <h2>Featured Products</h2>
            <p>Handpicked health &amp; wellness essentials for you</p>
            <div className="line"></div>
          </div>
          <div className="product-grid">
            <div className="product-card">
              <div className="product-img" style={{background: 'linear-gradient(135deg,#e8f5e9,#c8e6c9)'}}>
                🌿
                <span className="product-discount">20% OFF</span>
                <button className="wishlist-btn"><i className="fa-regular fa-heart"></i></button>
              </div>
              <div className="product-body">
                <div className="product-cat">Supplements</div>
                <div className="product-name">Aurra Immunity Booster Capsules</div>
                <div className="product-stars">★★★★★ <span>(248)</span></div>
                <div className="product-price">
                  <span className="price-now">₹599</span>
                  <span className="price-old">₹749</span>
                </div>
                <button className="add-cart">Add to Cart</button>
              </div>
            </div>
            
            <div className="product-card">
              <div className="product-img" style={{background: 'linear-gradient(135deg,#fce4ec,#f8bbd0)'}}>
                🌸
                <span className="product-discount">15% OFF</span>
                <button className="wishlist-btn"><i className="fa-regular fa-heart"></i></button>
              </div>
              <div className="product-body">
                <div className="product-cat">Skincare</div>
                <div className="product-name">Glow Face Serum with Vitamin C</div>
                <div className="product-stars">★★★★☆ <span>(182)</span></div>
                <div className="product-price">
                  <span className="price-now">₹849</span>
                  <span className="price-old">₹999</span>
                </div>
                <button className="add-cart">Add to Cart</button>
              </div>
            </div>

            <div className="product-card">
              <div className="product-img" style={{background: 'linear-gradient(135deg,#fff3e0,#ffe0b2)'}}>
                🥤
                <span className="product-discount">25% OFF</span>
                <button className="wishlist-btn"><i className="fa-regular fa-heart"></i></button>
              </div>
              <div className="product-body">
                <div className="product-cat">Nutrition</div>
                <div className="product-name">Protein Shake – Chocolate 500g</div>
                <div className="product-stars">★★★★★ <span>(316)</span></div>
                <div className="product-price">
                  <span className="price-now">₹1,249</span>
                  <span className="price-old">₹1,649</span>
                </div>
                <button className="add-cart">Add to Cart</button>
              </div>
            </div>

            <div className="product-card">
              <div className="product-img" style={{background: 'linear-gradient(135deg,#e3f2fd,#bbdefb)'}}>
                💧
                <span className="product-discount">30% OFF</span>
                <button className="wishlist-btn"><i className="fa-regular fa-heart"></i></button>
              </div>
              <div className="product-body">
                <div className="product-cat">Immunity</div>
                <div className="product-name">AHK Immunity Drops – Kids Formula</div>
                <div className="product-stars">★★★★★ <span>(524)</span></div>
                <div className="product-price">
                  <span className="price-now">₹449</span>
                  <span className="price-old">₹649</span>
                </div>
                <button className="add-cart">Add to Cart</button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* STATS BANNER */}
      <div className="stats-banner">
        <div className="stats-inner">
          <div className="stat-item">
            <div className="ico">👥</div>
            <div className="num">50,000+</div>
            <div className="lbl">Happy Customers</div>
          </div>
          <div className="stat-item">
            <div className="ico">📦</div>
            <div className="num">200+</div>
            <div className="lbl">Products Available</div>
          </div>
          <div className="stat-item">
            <div className="ico">🏪</div>
            <div className="num">5,000+</div>
            <div className="lbl">Distributors</div>
          </div>
          <div className="stat-item">
            <div className="ico">🌍</div>
            <div className="num">28</div>
            <div className="lbl">States Covered</div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div id="testimonials" style={{background:'#f0f4f8', padding: '10px 0'}}>
        <section className="section">
          <div className="section-head">
            <h2>What Our Community Says</h2>
            <p>Real stories from real people who transformed their health and wealth</p>
            <div className="line"></div>
          </div>
          <div className="testi-grid">
            <div className="testi-card">
              <p className="testi-text">"I joined Aurra Health Kart 8 months ago and within 3 months I was earning enough to quit my job. The products actually work and sell themselves!"</p>
              <div className="testi-author">
                <div className="testi-avatar" style={{background:'linear-gradient(135deg,#1D6435,#81CE29)'}}>👩</div>
                <div>
                  <div className="testi-name">Priya Sharma</div>
                  <div className="testi-role">Gold Distributor, Delhi</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <p className="testi-text">"The Immunity Booster literally saved my family during the pandemic. Now I recommend these products to everyone I know. Quality is unmatched."</p>
              <div className="testi-author">
                <div className="testi-avatar" style={{background:'linear-gradient(135deg,#f38b2d,#f5c842)'}}>👨</div>
                <div>
                  <div className="testi-name">Rajesh Kumar</div>
                  <div className="testi-role">Diamond Member, Mumbai</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
