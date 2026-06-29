'use client';
import { useEffect } from 'react';

export default function AdminDashboard() {
  
  useEffect(() => {
    // Animate bars on load
    document.querySelectorAll('.bar').forEach(b => {
      const el = b as HTMLElement;
      const h = el.style.height;
      el.style.height = '0%';
      setTimeout(() => el.style.height = h, 300);
    });

    // Animate dist bars
    document.querySelectorAll('.dist-bar-fill').forEach(b => {
      const el = b as HTMLElement;
      const w = el.style.width;
      el.style.width = '0%';
      setTimeout(() => el.style.width = w, 400);
    });
  }, []);

  return (
    <div className="content">
      {/* STAT CARDS */}
      <div className="stats-row">
        <div className="stat-card green">
          <div className="stat-icon"><i className="fa-solid fa-users"></i></div>
          <div className="stat-num">12,480</div>
          <div className="stat-label">Total Members</div>
          <div className="stat-change up"><i className="fa-solid fa-arrow-trend-up"></i> +8.4% this month</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon"><i className="fa-solid fa-indian-rupee-sign"></i></div>
          <div className="stat-num">₹48.6L</div>
          <div className="stat-label">Total Revenue</div>
          <div className="stat-change up"><i className="fa-solid fa-arrow-trend-up"></i> +12.1% this month</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-icon"><i className="fa-solid fa-cart-shopping"></i></div>
          <div className="stat-num">3,254</div>
          <div className="stat-label">Total Orders</div>
          <div className="stat-change up"><i className="fa-solid fa-arrow-trend-up"></i> +5.7% this month</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon"><i className="fa-solid fa-store"></i></div>
          <div className="stat-num">284</div>
          <div className="stat-label">Active Franchises</div>
          <div className="stat-change up"><i className="fa-solid fa-arrow-trend-up"></i> +3.2% this month</div>
        </div>
      </div>

      {/* REVENUE CHART + ACTIVITY */}
      <div className="grid-3">
        <div className="card">
          <div className="card-head">
            <h3>Monthly Revenue</h3>
            <button className="btn-sm">View Report</button>
          </div>
          <div className="chart-bars">
            <div className="bar-wrap"><div className="bar" data-val="₹3.2L" style={{height:'60%'}}></div><div className="bar-lbl">Jan</div></div>
            <div className="bar-wrap"><div className="bar" data-val="₹4.1L" style={{height:'75%'}}></div><div className="bar-lbl">Feb</div></div>
            <div className="bar-wrap"><div className="bar" data-val="₹3.8L" style={{height:'70%'}}></div><div className="bar-lbl">Mar</div></div>
            <div className="bar-wrap"><div className="bar" data-val="₹5.2L" style={{height:'90%'}}></div><div className="bar-lbl">Apr</div></div>
            <div className="bar-wrap"><div className="bar" data-val="₹4.6L" style={{height:'80%'}}></div><div className="bar-lbl">May</div></div>
            <div className="bar-wrap"><div className="bar" data-val="₹5.8L" style={{height:'100%'}}></div><div className="bar-lbl">Jun</div></div>
            <div className="bar-wrap"><div className="bar" data-val="₹3.9L" style={{height:'68%'}}></div><div className="bar-lbl">Jul</div></div>
            <div className="bar-wrap"><div className="bar" data-val="₹4.4L" style={{height:'76%'}}></div><div className="bar-lbl">Aug</div></div>
          </div>
        </div>
        <div className="card">
          <div className="card-head"><h3>Recent Activity</h3></div>
          <ul className="activity-list">
            <li className="activity-item">
              <div className="act-dot" style={{background:'#e8f5e9'}}>🎉</div>
              <div className="act-text"><h4>New member joined</h4><p>Rahul Singh – AHK3892</p></div>
              <div className="act-time">2m ago</div>
            </li>
            <li className="activity-item">
              <div className="act-dot" style={{background:'#fff3e0'}}>📦</div>
              <div className="act-text"><h4>Order placed</h4><p>Order #ORD8827 – ₹1,850</p></div>
              <div className="act-time">14m ago</div>
            </li>
            <li className="activity-item">
              <div className="act-dot" style={{background:'#fef9c3'}}>💰</div>
              <div className="act-text"><h4>Payout processed</h4><p>₹12,400 to 38 members</p></div>
              <div className="act-time">1h ago</div>
            </li>
            <li className="activity-item">
              <div className="act-dot" style={{background:'#f3e5f5'}}>🏪</div>
              <div className="act-text"><h4>Franchise approved</h4><p>AFI14002 – Pune West</p></div>
              <div className="act-time">3h ago</div>
            </li>
            <li className="activity-item">
              <div className="act-dot" style={{background:'#e3f2fd'}}>📢</div>
              <div className="act-text"><h4>Announcement sent</h4><p>New product launch notice</p></div>
              <div className="act-time">5h ago</div>
            </li>
          </ul>
        </div>
      </div>

      {/* MEMBERS TABLE + TOP DISTRIBUTORS */}
      <div className="grid-2">
        <div className="card">
          <div className="card-head">
            <h3>Recent Members</h3>
            <button className="btn-sm fill">View All</button>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>ID</th><th>Name</th><th>Package</th><th>Status</th><th>BV</th></tr>
            </thead>
            <tbody>
              <tr><td>AHK3892</td><td>Rahul Singh</td><td>Gold</td><td><span className="status-pill status-active">Active</span></td><td>500</td></tr>
              <tr><td>AHK3891</td><td>Priya Mehta</td><td>Silver</td><td><span className="status-pill status-active">Active</span></td><td>250</td></tr>
              <tr><td>AHK3890</td><td>Ankit Sharma</td><td>Diamond</td><td><span className="status-pill status-pending">Pending</span></td><td>1000</td></tr>
              <tr><td>AHK3889</td><td>Neha Gupta</td><td>Basic</td><td><span className="status-pill status-active">Active</span></td><td>100</td></tr>
              <tr><td>AHK3888</td><td>Sanjay Patel</td><td>Gold</td><td><span className="status-pill status-inactive">Inactive</span></td><td>500</td></tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-head"><h3>Top Distributors</h3><button className="btn-sm">This Month</button></div>
          <ul className="dist-list">
            <li className="dist-item">
              <span className="dist-rank">🥇</span>
              <div className="dist-av" style={{background:'linear-gradient(135deg,#f59e0b,#fbbf24)'}}>P</div>
              <div className="dist-info"><h4>Priya Sharma</h4><p>AHK0021 – Delhi</p></div>
              <div className="dist-bar-wrap"><div className="dist-bar-track"><div className="dist-bar-fill" style={{width:'100%'}}></div></div></div>
              <div className="dist-amount">₹92K</div>
            </li>
            <li className="dist-item">
              <span className="dist-rank">🥈</span>
              <div className="dist-av" style={{background:'linear-gradient(135deg,#6b7280,#9ca3af)'}}>R</div>
              <div className="dist-info"><h4>Raj Thakur</h4><p>AHK0034 – Mumbai</p></div>
              <div className="dist-bar-wrap"><div className="dist-bar-track"><div className="dist-bar-fill" style={{width:'80%'}}></div></div></div>
              <div className="dist-amount">₹74K</div>
            </li>
            <li className="dist-item">
              <span className="dist-rank">🥉</span>
              <div className="dist-av" style={{background:'linear-gradient(135deg,#92400e,#b45309)'}}>A</div>
              <div className="dist-info"><h4>Anita Verma</h4><p>AHK0058 – Pune</p></div>
              <div className="dist-bar-wrap"><div className="dist-bar-track"><div className="dist-bar-fill" style={{width:'65%'}}></div></div></div>
              <div className="dist-amount">₹61K</div>
            </li>
            <li className="dist-item">
              <span className="dist-rank">4</span>
              <div className="dist-av" style={{background:'linear-gradient(135deg,#1D6435,#81CE29)'}}>S</div>
              <div className="dist-info"><h4>Suresh Kumar</h4><p>AHK0072 – Jaipur</p></div>
              <div className="dist-bar-wrap"><div className="dist-bar-track"><div className="dist-bar-fill" style={{width:'52%'}}></div></div></div>
              <div className="dist-amount">₹48K</div>
            </li>
            <li className="dist-item">
              <span className="dist-rank">5</span>
              <div className="dist-av" style={{background:'linear-gradient(135deg,#3b82f6,#60a5fa)'}}>N</div>
              <div className="dist-info"><h4>Nisha Pandey</h4><p>AHK0091 – Lucknow</p></div>
              <div className="dist-bar-wrap"><div className="dist-bar-track"><div className="dist-bar-fill" style={{width:'40%'}}></div></div></div>
              <div className="dist-amount">₹37K</div>
            </li>
          </ul>
        </div>
      </div>

      {/* ORDERS TABLE */}
      <div className="card">
        <div className="card-head">
          <h3>Recent Orders</h3>
          <div style={{display:'flex', gap:'8px'}}>
            <button className="btn-sm">Filter</button>
            <button className="btn-sm fill">View All Orders</button>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>Order ID</th><th>Member</th><th>Product</th><th>Amount</th><th>Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr><td>#ORD8827</td><td>Rahul Singh</td><td>Immunity Booster x2</td><td>₹1,198</td><td>29 Jun 2025</td><td><span className="status-pill status-paid">Paid</span></td></tr>
            <tr><td>#ORD8826</td><td>Priya Mehta</td><td>Glow Serum x1</td><td>₹849</td><td>29 Jun 2025</td><td><span className="status-pill status-active">Delivered</span></td></tr>
            <tr><td>#ORD8825</td><td>Ankit Sharma</td><td>Protein Shake x3</td><td>₹3,747</td><td>28 Jun 2025</td><td><span className="status-pill status-pending">Processing</span></td></tr>
            <tr><td>#ORD8824</td><td>Neha Gupta</td><td>Wild Honey x2</td><td>₹1,398</td><td>28 Jun 2025</td><td><span className="status-pill status-paid">Paid</span></td></tr>
            <tr><td>#ORD8823</td><td>Sanjay Patel</td><td>Ashwagandha x1</td><td>₹379</td><td>27 Jun 2025</td><td><span className="status-pill status-inactive">Cancelled</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
