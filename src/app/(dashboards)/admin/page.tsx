'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import AdminStatCard from '@/components/admin/AdminStatCard';
import AdminCard from '@/components/admin/AdminCard';
import AdminButton from '@/components/admin/AdminButton';
import { staggerContainer, fadeUp } from '@/lib/motion';

const chartData = [
  { val: '₹3.2L', height: '60%', month: 'Jan' },
  { val: '₹4.1L', height: '75%', month: 'Feb' },
  { val: '₹3.8L', height: '70%', month: 'Mar' },
  { val: '₹5.2L', height: '90%', month: 'Apr' },
  { val: '₹4.6L', height: '80%', month: 'May' },
  { val: '₹5.8L', height: '100%', month: 'Jun' },
  { val: '₹3.9L', height: '68%', month: 'Jul' },
  { val: '₹4.4L', height: '76%', month: 'Aug' },
];

const activities = [
  { emoji: '🎉', bg: '#e8f5e9', title: 'New member joined', desc: 'Rahul Singh – AHK3892', time: '2m ago' },
  { emoji: '📦', bg: '#fff3e0', title: 'Order placed', desc: 'Order #ORD8827 – ₹1,850', time: '14m ago' },
  { emoji: '💰', bg: '#fef9c3', title: 'Payout processed', desc: '₹12,400 to 38 members', time: '1h ago' },
  { emoji: '🏪', bg: '#f3e5f5', title: 'Franchise approved', desc: 'AFI14002 – Pune West', time: '3h ago' },
  { emoji: '📢', bg: '#e3f2fd', title: 'Announcement sent', desc: 'New product launch notice', time: '5h ago' },
];

const members = [
  { id: 'AHK3892', name: 'Rahul Singh', pkg: 'Gold', status: 'Active', statusClass: 'status-active', bv: 500 },
  { id: 'AHK3891', name: 'Priya Mehta', pkg: 'Silver', status: 'Active', statusClass: 'status-active', bv: 250 },
  { id: 'AHK3890', name: 'Ankit Sharma', pkg: 'Diamond', status: 'Pending', statusClass: 'status-pending', bv: 1000 },
  { id: 'AHK3889', name: 'Neha Gupta', pkg: 'Basic', status: 'Active', statusClass: 'status-active', bv: 100 },
  { id: 'AHK3888', name: 'Sanjay Patel', pkg: 'Gold', status: 'Inactive', statusClass: 'status-inactive', bv: 500 },
];

const distributors = [
  { rank: '🥇', letter: 'P', name: 'Priya Sharma', id: 'AHK0021 – Delhi', width: '100%', amount: '₹92K', gradient: 'linear-gradient(135deg,#f59e0b,#fbbf24)' },
  { rank: '🥈', letter: 'R', name: 'Raj Thakur', id: 'AHK0034 – Mumbai', width: '80%', amount: '₹74K', gradient: 'linear-gradient(135deg,#6b7280,#9ca3af)' },
  { rank: '🥉', letter: 'A', name: 'Anita Verma', id: 'AHK0058 – Pune', width: '65%', amount: '₹61K', gradient: 'linear-gradient(135deg,#92400e,#b45309)' },
  { rank: '4', letter: 'S', name: 'Suresh Kumar', id: 'AHK0072 – Jaipur', width: '52%', amount: '₹48K', gradient: 'linear-gradient(135deg,#1D6435,#81CE29)' },
  { rank: '5', letter: 'N', name: 'Nisha Pandey', id: 'AHK0091 – Lucknow', width: '40%', amount: '₹37K', gradient: 'linear-gradient(135deg,#3b82f6,#60a5fa)' },
];

const orders = [
  { id: '#ORD8827', member: 'Rahul Singh', product: 'Immunity Booster x2', amount: '₹1,198', date: '29 Jun 2025', status: 'Paid', statusClass: 'status-paid' },
  { id: '#ORD8826', member: 'Priya Mehta', product: 'Glow Serum x1', amount: '₹849', date: '29 Jun 2025', status: 'Delivered', statusClass: 'status-active' },
  { id: '#ORD8825', member: 'Ankit Sharma', product: 'Protein Shake x3', amount: '₹3,747', date: '28 Jun 2025', status: 'Processing', statusClass: 'status-pending' },
  { id: '#ORD8824', member: 'Neha Gupta', product: 'Wild Honey x2', amount: '₹1,398', date: '28 Jun 2025', status: 'Paid', statusClass: 'status-paid' },
  { id: '#ORD8823', member: 'Sanjay Patel', product: 'Ashwagandha x1', amount: '₹379', date: '27 Jun 2025', status: 'Cancelled', statusClass: 'status-inactive' },
];

export default function AdminDashboard() {
  const [distributorPeriod, setDistributorPeriod] = useState('This Month');
  const [distributorList, setDistributorList] = useState(distributors);
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);

  const [orderStatusFilter, setOrderStatusFilter] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const [reportGenerating, setReportGenerating] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handlePeriodChange = (period: string) => {
    setDistributorPeriod(period);
    setShowPeriodDropdown(false);

    if (period === 'Last Quarter') {
      setDistributorList([
        { rank: '🥇', letter: 'R', name: 'Raj Thakur', id: 'AHK0034 – Mumbai', width: '100%', amount: '₹245K', gradient: 'linear-gradient(135deg,#6b7280,#9ca3af)' },
        { rank: '🥈', letter: 'P', name: 'Priya Sharma', id: 'AHK0021 – Delhi', width: '85%', amount: '₹210K', gradient: 'linear-gradient(135deg,#f59e0b,#fbbf24)' },
        { rank: '🥉', letter: 'S', name: 'Suresh Kumar', id: 'AHK0072 – Jaipur', width: '70%', amount: '₹180K', gradient: 'linear-gradient(135deg,#1D6435,#81CE29)' },
        { rank: '4', letter: 'A', name: 'Anita Verma', id: 'AHK0058 – Pune', width: '55%', amount: '₹140K', gradient: 'linear-gradient(135deg,#92400e,#b45309)' },
        { rank: '5', letter: 'N', name: 'Nisha Pandey', id: 'AHK0091 – Lucknow', width: '40%', amount: '₹102K', gradient: 'linear-gradient(135deg,#3b82f6,#60a5fa)' },
      ]);
      showToast('📊 Top list updated for Last Quarter');
    } else if (period === 'All Time') {
      setDistributorList([
        { rank: '🥇', letter: 'A', name: 'Anita Verma', id: 'AHK0058 – Pune', width: '100%', amount: '₹840K', gradient: 'linear-gradient(135deg,#92400e,#b45309)' },
        { rank: '🥈', letter: 'P', name: 'Priya Sharma', id: 'AHK0021 – Delhi', width: '90%', amount: '₹760K', gradient: 'linear-gradient(135deg,#f59e0b,#fbbf24)' },
        { rank: '🥉', letter: 'R', name: 'Raj Thakur', id: 'AHK0034 – Mumbai', width: '78%', amount: '₹680K', gradient: 'linear-gradient(135deg,#6b7280,#9ca3af)' },
        { rank: '4', letter: 'S', name: 'Suresh Kumar', id: 'AHK0072 – Jaipur', width: '62%', amount: '₹520K', gradient: 'linear-gradient(135deg,#1D6435,#81CE29)' },
        { rank: '5', letter: 'N', name: 'Nisha Pandey', id: 'AHK0091 – Lucknow', width: '50%', amount: '₹410K', gradient: 'linear-gradient(135deg,#3b82f6,#60a5fa)' },
      ]);
      showToast('📊 Top list updated for All Time');
    } else {
      setDistributorList(distributors);
      showToast('📊 Top list updated for This Month');
    }
  };

  const handleGenerateReport = () => {
    if (reportGenerating) return;
    setReportGenerating(true);
    showToast('⚙️ Generating revenue report...');
    setTimeout(() => {
      setReportGenerating(false);
      showToast('✅ Report AHK-Revenue-2026.pdf downloaded!');
    }, 2000);
  };

  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter === 'All') return true;
    return o.status.toLowerCase() === orderStatusFilter.toLowerCase();
  });

  return (
    <div className="content">
      <motion.div
        className="stats-row"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <AdminStatCard icon="fa-users" value={12480} label="Total Members" change="+8.4% this month" trend="up" variant="green" index={0} />
        <AdminStatCard icon="fa-indian-rupee-sign" value={0} label="Total Revenue" change="+12.1% this month" trend="up" variant="orange" index={1} isNumeric={false} displayValue="₹48.6L" />
        <AdminStatCard icon="fa-cart-shopping" value={3254} label="Total Orders" change="+5.7% this month" trend="up" variant="blue" index={2} />
        <AdminStatCard icon="fa-store" value={284} label="Active Franchises" change="+3.2% this month" trend="up" variant="purple" index={3} />
      </motion.div>

      <motion.div
        className="grid-3"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} custom={0}>
          <AdminCard>
            <div className="card-head">
              <h3>Monthly Revenue</h3>
              <button 
                onClick={handleGenerateReport} 
                className="btn-sm" 
                style={{ border: '1px solid var(--border)', background: '#fff', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontFamily: 'Poppins, sans-serif', color: 'var(--muted)', fontWeight: 600 }} 
                disabled={reportGenerating}
              >
                {reportGenerating ? 'Generating...' : 'View Report'}
              </button>
            </div>
            <div className="chart-bars">
              {chartData.map((bar, i) => (
                <div className="bar-wrap" key={bar.month}>
                  <motion.div
                    className="bar"
                    data-val={bar.val}
                    initial={{ height: 0 }}
                    animate={{ height: bar.height }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scaleY: 1.05, opacity: 0.9 }}
                  />
                  <div className="bar-lbl">{bar.month}</div>
                </div>
              ))}
            </div>
          </AdminCard>
        </motion.div>

        <motion.div variants={fadeUp} custom={1}>
          <AdminCard>
            <div className="card-head"><h3>Recent Activity</h3></div>
            <ul className="activity-list">
              {activities.map((act, i) => (
                <motion.li
                  key={act.title}
                  className="activity-item"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  whileHover={{ x: 4, backgroundColor: 'rgba(0,0,0,0.02)' }}
                >
                  <motion.div
                    className="act-dot"
                    style={{ background: act.bg }}
                    whileHover={{ scale: 1.15, rotate: 10 }}
                  >
                    {act.emoji}
                  </motion.div>
                  <div className="act-text"><h4>{act.title}</h4><p>{act.desc}</p></div>
                  <div className="act-time">{act.time}</div>
                </motion.li>
              ))}
            </ul>
          </AdminCard>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        <motion.div variants={fadeUp} custom={0}>
          <AdminCard>
            <div className="card-head">
              <h3>Recent Members</h3>
              <AdminButton variant="sm-fill">View All</AdminButton>
            </div>
            <table className="data-table">
              <thead>
                <tr><th>ID</th><th>Name</th><th>Package</th><th>Status</th><th>BV</th></tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <motion.tr
                    key={m.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                  >
                    <td>{m.id}</td>
                    <td>{m.name}</td>
                    <td>{m.pkg}</td>
                    <td><span className={`status-pill ${m.statusClass}`}>{m.status}</span></td>
                    <td>{m.bv}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </AdminCard>
        </motion.div>

        <motion.div variants={fadeUp} custom={1}>
          <AdminCard>
            <div className="card-head" style={{ position: 'relative' }}>
              <h3>Top Distributors</h3>
              <button 
                onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
                className="btn-sm flex items-center gap-1.5"
                style={{ border: '1px solid var(--border)', background: '#fff', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontFamily: 'Poppins, sans-serif', color: 'var(--muted)', fontWeight: 600 }}
              >
                {distributorPeriod} <i className="fa-solid fa-chevron-down" style={{ fontSize: '10px' }}></i>
              </button>

              <AnimatePresence>
                {showPeriodDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute w-36 bg-white border border-gray-150 rounded-lg shadow-lg z-50 overflow-hidden py-1"
                    style={{ top: '34px', right: 0 }}
                  >
                    {['This Month', 'Last Quarter', 'All Time'].map((p) => (
                      <button
                        key={p}
                        onClick={() => handlePeriodChange(p)}
                        className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 transition border-none bg-transparent cursor-pointer font-medium"
                      >
                        {p}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <ul className="dist-list">
              {distributorList.map((d, i) => (
                <motion.li
                  key={d.name}
                  className="dist-item"
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: 4 }}
                >
                  <span className="dist-rank">{d.rank}</span>
                  <div className="dist-av" style={{ background: d.gradient }}>{d.letter}</div>
                  <div className="dist-info"><h4>{d.name}</h4><p>{d.id}</p></div>
                  <div className="dist-bar-wrap">
                    <div className="dist-bar-track">
                      <motion.div
                        className="dist-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: d.width }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                  <div className="dist-amount">{d.amount}</div>
                </motion.li>
              ))}
            </ul>
          </AdminCard>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <AdminCard>
          <div className="card-head" style={{ position: 'relative' }}>
            <h3>Recent Orders</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ position: 'relative' }}>
                <button 
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="btn-sm flex items-center gap-1.5"
                  style={{ border: '1px solid var(--border)', background: '#fff', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontFamily: 'Poppins, sans-serif', color: 'var(--muted)', fontWeight: 600 }}
                >
                  Status: {orderStatusFilter} <i className="fa-solid fa-chevron-down" style={{ fontSize: '10px' }}></i>
                </button>

                <AnimatePresence>
                  {showFilterDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 w-36 bg-white border border-gray-150 rounded-lg shadow-lg z-50 overflow-hidden py-1"
                      style={{ top: '34px', right: 0 }}
                    >
                      {['All', 'Paid', 'Delivered', 'Processing', 'Cancelled'].map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            setOrderStatusFilter(status);
                            setShowFilterDropdown(false);
                            showToast(`🔍 Filtered: ${status}`);
                          }}
                          className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 transition border-none bg-transparent cursor-pointer font-medium"
                        >
                          {status}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link 
                href="/admin/orders" 
                className="btn-sm fill" 
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', fontSize: '12px', fontFamily: 'Poppins, sans-serif', border: 'none' }}
              >
                View All Orders
              </Link>
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>Order ID</th><th>Member</th><th>Product</th><th>Amount</th><th>Date</th><th>Status</th></tr>
            </thead>
            <tbody>
              {filteredOrders.map((o, i) => (
                <motion.tr
                  key={o.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                >
                  <td>{o.id}</td>
                  <td>{o.member}</td>
                  <td>{o.product}</td>
                  <td>{o.amount}</td>
                  <td>{o.date}</td>
                  <td><span className={`status-pill ${o.statusClass}`}>{o.status}</span></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </AdminCard>
      </motion.div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl z-[9999] flex items-center gap-2 border border-white/10"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
