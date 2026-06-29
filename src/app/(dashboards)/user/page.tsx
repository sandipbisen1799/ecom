'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function UserDashboard() {
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    // Animate progress bars
    document.querySelectorAll('.progress-fill').forEach(el => {
      const e = el as HTMLElement;
      const w = e.dataset.w;
      if (w) {
        e.style.width = '0%';
        setTimeout(() => e.style.width = w, 400);
      }
    });
  }, []);

  const copyRef = () => {
    navigator.clipboard?.writeText('https://aurrahealthkart.in/ref/AHK002').catch(()=>{});
    setToastMsg('✅ Referral link copied!');
    setTimeout(()=> setToastMsg(''), 2500);
  };

  return (
    <div className="content">
      {/* WELCOME BANNER */}
      <div className="welcome-banner">
        <div className="welcome-text">
          <h2>Welcome back, Rahul! 👋</h2>
          <p>Your network is growing steadily. Keep building!</p>
          <Link href="#" className="btn-white">Invite Members</Link>
        </div>
        <div className="welcome-stats">
          <div className="w-stat"><div className="num">₹18,420</div><div className="lbl">Total Earned</div></div>
          <div className="w-stat"><div className="num">47</div><div className="lbl">Team Members</div></div>
          <div className="w-stat"><div className="num">Gold</div><div className="lbl">My Rank</div></div>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon" style={{background:'#dbeafe', color:'#1d4ed8'}}><i className="fa-solid fa-wallet"></i></div>
          <div className="stat-num">₹18,420</div>
          <div className="stat-lbl">Total Income</div>
          <div className="stat-change up"><i className="fa-solid fa-arrow-trend-up"></i> +₹2,400 this week</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{background:'#dcfce7', color:'#16a34a'}}><i className="fa-solid fa-users"></i></div>
          <div className="stat-num">47</div>
          <div className="stat-lbl">Team Members</div>
          <div className="stat-change up"><i className="fa-solid fa-arrow-trend-up"></i> +3 this week</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{background:'#fef9c3', color:'#ca8a04'}}><i className="fa-solid fa-star"></i></div>
          <div className="stat-num">2,800</div>
          <div className="stat-lbl">My BV Points</div>
          <div className="stat-change up"><i className="fa-solid fa-arrow-trend-up"></i> +450 this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{background:'#fce7f3', color:'#db2777'}}><i className="fa-solid fa-arrow-down-to-line"></i></div>
          <div className="stat-num">₹6,200</div>
          <div className="stat-lbl">Withdrawable</div>
          <div className="stat-change up"><i className="fa-solid fa-circle-check"></i> Ready to withdraw</div>
        </div>
      </div>

      {/* INCOME BREAKDOWN + QUICK ACTIONS */}
      <div className="grid-3">
        <div className="card">
          <div className="card-head"><h3>Income Breakdown</h3><button className="btn-sm">This Month</button></div>
          <div className="progress-row">
            <div className="progress-lbl"><span>Direct Income</span><span>₹5,200</span></div>
            <div className="progress-track"><div className="progress-fill" data-w="85%" style={{background:'linear-gradient(90deg,#3b82f6,#60a5fa)'}}></div></div>
          </div>
          <div className="progress-row">
            <div className="progress-lbl"><span>Level Income</span><span>₹3,840</span></div>
            <div className="progress-track"><div className="progress-fill" data-w="62%" style={{background:'linear-gradient(90deg,#22c55e,#86efac)'}}></div></div>
          </div>
          <div className="progress-row">
            <div className="progress-lbl"><span>Team Bonus</span><span>₹2,100</span></div>
            <div className="progress-track"><div className="progress-fill" data-w="45%" style={{background:'linear-gradient(90deg,#f59e0b,#fcd34d)'}}></div></div>
          </div>
          <div className="progress-row">
            <div className="progress-lbl"><span>Performance Bonus</span><span>₹1,480</span></div>
            <div className="progress-track"><div className="progress-fill" data-w="30%" style={{background:'linear-gradient(90deg,#8b5cf6,#c4b5fd)'}}></div></div>
          </div>
          <div className="progress-row">
            <div className="progress-lbl"><span>Leadership Pool</span><span>₹800</span></div>
            <div className="progress-track"><div className="progress-fill" data-w="18%" style={{background:'linear-gradient(90deg,#ef4444,#fca5a5)'}}></div></div>
          </div>
          <div style={{marginTop:'16px', padding:'14px', background:'#f0f4f8', borderRadius:'10px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <span style={{fontSize:'13px', fontWeight:600}}>Total This Month</span>
            <span style={{fontSize:'18px', fontWeight:800, color:'#3b82f6'}}>₹13,420</span>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><h3>Quick Actions</h3></div>
          <div className="quick-grid">
            <Link href="#" className="quick-btn"><i className="fa-solid fa-store"></i><span>Shop Products</span></Link>
            <Link href="#" className="quick-btn"><i className="fa-solid fa-user-plus"></i><span>Add Member</span></Link>
            <Link href="#" className="quick-btn"><i className="fa-solid fa-money-bill-transfer"></i><span>Withdraw</span></Link>
            <Link href="#" className="quick-btn"><i className="fa-solid fa-chart-bar"></i><span>View Report</span></Link>
            <Link href="#" className="quick-btn"><i className="fa-solid fa-share-nodes"></i><span>Share Link</span></Link>
            <Link href="#" className="quick-btn"><i className="fa-solid fa-headset"></i><span>Get Help</span></Link>
          </div>

          <div style={{marginTop:'16px', background:'linear-gradient(135deg,#1a1a2e,#2d2d4e)', borderRadius:'12px', padding:'16px', color:'#fff'}}>
            <div style={{fontSize:'11px', opacity:0.6, marginBottom:'6px', textTransform:'uppercase', letterSpacing:'1px'}}>My Referral Link</div>
            <div style={{fontSize:'11px', wordBreak:'break-all', opacity:0.8, marginBottom:'10px'}}>aurrahealthkart.in/ref/AHK002</div>
            <button onClick={copyRef} style={{width:'100%', padding:'9px', background:'rgba(255,255,255,.15)', border:'1px solid rgba(255,255,255,.2)', borderRadius:'8px', color:'#fff', fontFamily:'Poppins', fontSize:'12px', cursor:'pointer', fontWeight:600, transition:'all .2s'}} onMouseOver={(e)=>e.currentTarget.style.background='rgba(255,255,255,.25)'} onMouseOut={(e)=>e.currentTarget.style.background='rgba(255,255,255,.15)'}>
              <i className="fa-solid fa-copy" style={{marginRight:'5px'}}></i> Copy Referral Link
            </button>
          </div>
        </div>
      </div>

      {/* NETWORK TREE + RECENT ORDERS */}
      <div className="grid-2">
        <div className="card">
          <div className="card-head"><h3>My Network Tree</h3><button className="btn-sm fill">Full View</button></div>
          <div className="tree-wrap">
            {/* Level 0: Me */}
            <div className="tree-level">
              <div className="tree-node">
                <div className="tree-avatar" style={{background:'linear-gradient(135deg,#3b82f6,#1d4ed8)', color:'#fff'}}>R</div>
                <div className="tree-name">Rahul Singh</div>
                <div className="tree-id">AHK002 (You)</div>
              </div>
            </div>
            <div className="tree-line"></div>
            {/* Level 1 */}
            <div className="tree-level">
              <div className="tree-node">
                <div className="tree-avatar" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)', color:'#fff'}}>P</div>
                <div className="tree-name">Priya Mehta</div>
                <div className="tree-id">AHK0821</div>
              </div>
              <div className="tree-node">
                <div className="tree-avatar" style={{background:'linear-gradient(135deg,#f59e0b,#d97706)', color:'#fff'}}>A</div>
                <div className="tree-name">Ankit Roy</div>
                <div className="tree-id">AHK0834</div>
              </div>
              <div className="tree-node">
                <div className="tree-avatar" style={{background:'linear-gradient(135deg,#8b5cf6,#6d28d9)', color:'#fff'}}>S</div>
                <div className="tree-name">Sunita Das</div>
                <div className="tree-id">AHK0847</div>
              </div>
            </div>
            <div className="tree-line"></div>
            {/* Level 2 */}
            <div className="tree-level">
              <div className="tree-node">
                <div className="tree-avatar" style={{background:'linear-gradient(135deg,#ec4899,#db2777)', color:'#fff'}}>M</div>
                <div className="tree-name">Meena</div>
                <div className="tree-id">AHK0902</div>
              </div>
              <div className="tree-node">
                <div className="tree-avatar" style={{background:'linear-gradient(135deg,#14b8a6,#0d9488)', color:'#fff'}}>K</div>
                <div className="tree-name">Kiran</div>
                <div className="tree-id">AHK0915</div>
              </div>
              <div className="tree-node">
                <div className="tree-avatar" style={{background:'linear-gradient(135deg,#f97316,#ea580c)', color:'#fff'}}>V</div>
                <div className="tree-name">Vijay</div>
                <div className="tree-id">AHK0928</div>
              </div>
              <div className="tree-node">
                <div className="tree-avatar" style={{background:'linear-gradient(135deg,#6366f1,#4f46e5)', color:'#fff'}}>N</div>
                <div className="tree-name">Nitu</div>
                <div className="tree-id">AHK0941</div>
              </div>
            </div>
            <div style={{textAlign:'center', marginTop:'12px', fontSize:'12px', color:'var(--muted)'}}>
              <i className="fa-solid fa-users" style={{marginRight:'5px'}}></i> 47 total members in your network
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><h3>My Recent Orders</h3><button className="btn-sm fill">All Orders</button></div>
          <table className="data-table">
            <thead><tr><th>Order</th><th>Product</th><th>Amt</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>#8821</td><td>Immunity Booster</td><td>₹599</td><td><span className="pill p-green">Delivered</span></td></tr>
              <tr><td>#8789</td><td>Glow Serum</td><td>₹849</td><td><span className="pill p-blue">Shipped</span></td></tr>
              <tr><td>#8755</td><td>Ashwagandha</td><td>₹379</td><td><span className="pill p-green">Delivered</span></td></tr>
              <tr><td>#8721</td><td>Wild Honey x2</td><td>₹1,398</td><td><span className="pill p-green">Delivered</span></td></tr>
              <tr><td>#8698</td><td>Protein Shake</td><td>₹1,249</td><td><span className="pill p-yellow">Processing</span></td></tr>
            </tbody>
          </table>

          <div style={{marginTop:'16px'}}>
            <div className="card-head" style={{marginBottom:'10px'}}><h3>Withdrawal History</h3></div>
            <table className="data-table">
              <thead><tr><th>Date</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td>25 Jun</td><td>₹3,200</td><td>UPI</td><td><span className="pill p-green">Paid</span></td></tr>
                <tr><td>10 Jun</td><td>₹2,800</td><td>Bank</td><td><span className="pill p-green">Paid</span></td></tr>
                <tr><td>28 May</td><td>₹1,500</td><td>UPI</td><td><span className="pill p-green">Paid</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {toastMsg && (
        <div style={{position:'fixed', bottom:'20px', right:'20px', background:'#1D6435', color:'#fff', padding:'11px 18px', borderRadius:'9px', fontSize:'12px', fontFamily:'Poppins', zIndex:9999, boxShadow:'0 6px 20px rgba(0,0,0,.15)'}}>
          {toastMsg}
        </div>
      )}
    </div>
  );
}
