'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import AdminCard from '@/components/admin/AdminCard';
import AdminStatCard from '@/components/admin/AdminStatCard';
import { staggerContainer, fadeUp } from '@/lib/motion';

const incomeBreakdownByPeriod: Record<string, { label: string; amount: string; width: string; gradient: string }[]> = {
  'This Month': [
    { label: 'Direct Income', amount: '₹5,200', width: '85%', gradient: 'linear-gradient(90deg,#3b82f6,#60a5fa)' },
    { label: 'Level Income', amount: '₹3,840', width: '62%', gradient: 'linear-gradient(90deg,#22c55e,#86efac)' },
    { label: 'Team Bonus', amount: '₹2,100', width: '45%', gradient: 'linear-gradient(90deg,#f59e0b,#fcd34d)' },
    { label: 'Performance Bonus', amount: '₹1,480', width: '30%', gradient: 'linear-gradient(90deg,#8b5cf6,#c4b5fd)' },
    { label: 'Leadership Pool', amount: '₹800', width: '18%', gradient: 'linear-gradient(90deg,#ef4444,#fca5a5)' },
  ],
  'Last Month': [
    { label: 'Direct Income', amount: '₹4,650', width: '78%', gradient: 'linear-gradient(90deg,#3b82f6,#60a5fa)' },
    { label: 'Level Income', amount: '₹3,120', width: '52%', gradient: 'linear-gradient(90deg,#22c55e,#86efac)' },
    { label: 'Team Bonus', amount: '₹1,890', width: '38%', gradient: 'linear-gradient(90deg,#f59e0b,#fcd34d)' },
    { label: 'Performance Bonus', amount: '₹1,150', width: '24%', gradient: 'linear-gradient(90deg,#8b5cf6,#c4b5fd)' },
    { label: 'Leadership Pool', amount: '₹640', width: '14%', gradient: 'linear-gradient(90deg,#ef4444,#fca5a5)' },
  ],
  'This Year': [
    { label: 'Direct Income', amount: '₹52,800', width: '100%', gradient: 'linear-gradient(90deg,#3b82f6,#60a5fa)' },
    { label: 'Level Income', amount: '₹38,240', width: '72%', gradient: 'linear-gradient(90deg,#22c55e,#86efac)' },
    { label: 'Team Bonus', amount: '₹21,600', width: '41%', gradient: 'linear-gradient(90deg,#f59e0b,#fcd34d)' },
    { label: 'Performance Bonus', amount: '₹14,900', width: '28%', gradient: 'linear-gradient(90deg,#8b5cf6,#c4b5fd)' },
    { label: 'Leadership Pool', amount: '₹8,750', width: '17%', gradient: 'linear-gradient(90deg,#ef4444,#fca5a5)' },
  ],
};

const incomeTotalByPeriod: Record<string, string> = {
  'This Month': '₹13,420',
  'Last Month': '₹11,450',
  'This Year': '₹136,290',
};

const quickActions = [
  { icon: 'fa-store', label: 'Shop Products', href: '/user/shop' },
  { icon: 'fa-user-plus', label: 'Add Member', href: '#' },
  { icon: 'fa-money-bill-transfer', label: 'Withdraw', href: '/user/withdrawal' },
  { icon: 'fa-chart-bar', label: 'View Report', href: '/user/income-report' },
  { icon: 'fa-share-nodes', label: 'Share Link', href: '#' },
  { icon: 'fa-headset', label: 'Get Help', href: '/user/support' },
];

const networkTree = {
  root: { name: 'Rahul Singh', id: 'AHK002 (You)', letter: 'R', gradient: 'linear-gradient(135deg,#3b82f6,#1d4ed8)' },
  level1: [
    { name: 'Priya Mehta', id: 'AHK0821', letter: 'P', gradient: 'linear-gradient(135deg,#22c55e,#16a34a)' },
    { name: 'Ankit Roy', id: 'AHK0834', letter: 'A', gradient: 'linear-gradient(135deg,#f59e0b,#d97706)' },
    { name: 'Sunita Das', id: 'AHK0847', letter: 'S', gradient: 'linear-gradient(135deg,#8b5cf6,#6d28d9)' },
  ],
  level2: [
    { name: 'Meena', id: 'AHK0902', letter: 'M', gradient: 'linear-gradient(135deg,#ec4899,#db2777)' },
    { name: 'Kiran', id: 'AHK0915', letter: 'K', gradient: 'linear-gradient(135deg,#14b8a6,#0d9488)' },
    { name: 'Vijay', id: 'AHK0928', letter: 'V', gradient: 'linear-gradient(135deg,#f97316,#ea580c)' },
    { name: 'Nitu', id: 'AHK0941', letter: 'N', gradient: 'linear-gradient(135deg,#6366f1,#4f46e5)' },
  ],
};

const recentOrders = [
  { id: '#8821', product: 'Immunity Booster', amount: '₹599', status: 'Delivered', statusClass: 'p-green' },
  { id: '#8789', product: 'Glow Serum', amount: '₹849', status: 'Shipped', statusClass: 'p-blue' },
  { id: '#8755', product: 'Ashwagandha', amount: '₹379', status: 'Delivered', statusClass: 'p-green' },
  { id: '#8721', product: 'Wild Honey x2', amount: '₹1,398', status: 'Delivered', statusClass: 'p-green' },
  { id: '#8698', product: 'Protein Shake', amount: '₹1,249', status: 'Processing', statusClass: 'p-yellow' },
];

const withdrawalHistory = [
  { date: '25 Jun', amount: '₹3,200', method: 'UPI', status: 'Paid', statusClass: 'p-green' },
  { date: '10 Jun', amount: '₹2,800', method: 'Bank', status: 'Paid', statusClass: 'p-green' },
  { date: '28 May', amount: '₹1,500', method: 'UPI', status: 'Paid', statusClass: 'p-green' },
];

export default function UserDashboard() {
  const [toastMsg, setToastMsg] = useState('');
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberMobile, setNewMemberMobile] = useState('');
  
  const [treeData, setTreeData] = useState(networkTree);

  const [incomePeriod, setIncomePeriod] = useState('This Month');
  const [showIncomeDropdown, setShowIncomeDropdown] = useState(false);
  const incomeBreakdown = incomeBreakdownByPeriod[incomePeriod];
  
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([
    { id: 1, text: 'Hello! I am your AHK support assistant. How can I help you today?', sender: 'bot' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName) return;
    
    setToastMsg(`✅ Member ${newMemberName} registered successfully!`);
    setAddMemberOpen(false);
    
    const updatedLevel2 = [...treeData.level2, {
      name: newMemberName,
      id: `AHK0${Math.floor(950 + Math.random() * 50)}`,
      letter: newMemberName.charAt(0).toUpperCase(),
      gradient: 'linear-gradient(135deg,#14b8a6,#0d9488)'
    }];
    setTreeData({ ...treeData, level2: updatedLevel2 });
    
    setNewMemberName('');
    setNewMemberEmail('');
    setNewMemberMobile('');
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { id: Date.now(), text: chatInput, sender: 'user' };
    setChatMessages(prev => [...prev, userMsg]);
    const currentInput = chatInput;
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = 'Thanks for your query! A support representative will get back to you shortly.';
      const msg = currentInput.toLowerCase();
      if (msg.includes('withdraw') || msg.includes('money') || msg.includes('payout')) {
        replyText = 'Payouts are processed every Monday. You can submit withdrawal requests via the "Withdraw" section if your balance is above ₹500.';
      } else if (msg.includes('product') || msg.includes('shop') || msg.includes('order')) {
        replyText = 'You can shop for wellness items under the "Shop Products" menu. Active orders are shipped via DHL/FedEx within 48 hours.';
      } else if (msg.includes('member') || msg.includes('add') || msg.includes('network')) {
        replyText = 'To expand your network, use the "Invite Members" button to add downline partners. Your BV points will increase automatically!';
      }
      setChatMessages(prev => [...prev, { id: Date.now(), text: replyText, sender: 'bot' }]);
    }, 1200);
  };

  useEffect(() => {
    document.querySelectorAll('.user-progress-fill').forEach((el) => {
      const e = el as HTMLElement;
      const w = e.dataset.w;
      if (w) {
        e.style.width = '0%';
        setTimeout(() => (e.style.width = w), 50);
      }
    });
  }, [incomePeriod]);

  const copyRef = () => {
    navigator.clipboard?.writeText('https://aurrahealthkart.in/ref/AHK002').catch(() => {});
    setToastMsg('✅ Referral link copied!');
    setTimeout(() => setToastMsg(''), 2500);
  };

  return (
    <div className="content">
      {/* ── WELCOME BANNER ── */}
      <motion.div
        className="user-welcome-banner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="user-welcome-text">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Welcome back, Rahul! 👋
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: 0.35 }}
          >
            Your network is growing steadily. Keep building!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button onClick={() => setAddMemberOpen(true)} className="user-btn-invite" style={{ border: 'none', cursor: 'pointer' }}>
              <i className="fa-solid fa-user-plus" style={{ marginRight: 6 }} />
              Invite Members
            </button>
          </motion.div>
        </div>
        <div className="user-welcome-stats">
          {[
            { num: '₹18,420', lbl: 'Total Earned' },
            { num: '47', lbl: 'Team Members' },
            { num: 'Gold', lbl: 'My Rank' },
          ].map((stat, i) => (
            <motion.div
              key={stat.lbl}
              className="user-w-stat"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.12 }}
            >
              <div className="user-w-num">{stat.num}</div>
              <div className="user-w-lbl">{stat.lbl}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── STAT CARDS ── */}
      <motion.div
        className="stats-row"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <AdminStatCard icon="fa-wallet" value={18420} prefix="₹" label="Total Income" change="+₹2,400 this week" trend="up" variant="blue" index={0} />
        <AdminStatCard icon="fa-users" value={47} label="Team Members" change="+3 this week" trend="up" variant="green" index={1} />
        <AdminStatCard icon="fa-star" value={2800} label="My BV Points" change="+450 this month" trend="up" variant="orange" index={2} />
        <AdminStatCard icon="fa-arrow-down-to-line" value={6200} prefix="₹" label="Withdrawable" change="Ready to withdraw" trend="up" variant="purple" index={3} />
      </motion.div>

      {/* ── INCOME BREAKDOWN + QUICK ACTIONS ── */}
      <motion.div
        className="grid-3"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} custom={0}>
          <AdminCard>
            <div className="card-head" style={{ position: 'relative' }}>
              <h3>Income Breakdown</h3>
              <button className="btn-sm flex items-center gap-1.5" onClick={() => setShowIncomeDropdown((v) => !v)}>
                {incomePeriod} <i className="fa-solid fa-chevron-down" style={{ fontSize: '10px' }} />
              </button>
              <AnimatePresence>
                {showIncomeDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute w-36 bg-white border border-gray-150 rounded-lg shadow-lg z-50 overflow-hidden py-1"
                    style={{ top: '34px', right: 0 }}
                  >
                    {Object.keys(incomeBreakdownByPeriod).map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          setIncomePeriod(p);
                          setShowIncomeDropdown(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 transition border-none bg-transparent cursor-pointer font-medium"
                      >
                        {p}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {incomeBreakdown.map((item, i) => (
              <motion.div
                key={item.label}
                className="user-progress-row"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                <div className="user-progress-lbl">
                  <span>{item.label}</span>
                  <span>{item.amount}</span>
                </div>
                <div className="user-progress-track">
                  <div
                    className="user-progress-fill"
                    data-w={item.width}
                    style={{ background: item.gradient }}
                  />
                </div>
              </motion.div>
            ))}
            <motion.div
              className="user-income-total"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <span>Total {incomePeriod}</span>
              <span className="user-income-total-amount">{incomeTotalByPeriod[incomePeriod]}</span>
            </motion.div>
          </AdminCard>
        </motion.div>

        <motion.div variants={fadeUp} custom={1}>
          <AdminCard>
            <div className="card-head"><h3>Quick Actions</h3></div>
            <div className="user-quick-grid">
              {quickActions.map((action, i) => {
                const isAddMember = action.label === 'Add Member';
                const isShareLink = action.label === 'Share Link';
                const isGetHelp = action.label === 'Get Help';

                const handleClick = (e: React.MouseEvent) => {
                  if (isAddMember) {
                    e.preventDefault();
                    setAddMemberOpen(true);
                  } else if (isShareLink) {
                    e.preventDefault();
                    copyRef();
                  } else if (isGetHelp) {
                    e.preventDefault();
                    setChatOpen(true);
                  }
                };

                if (isAddMember || isShareLink || isGetHelp) {
                  return (
                    <motion.div
                      key={action.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.06 }}
                    >
                      <button onClick={handleClick} className="user-quick-btn w-full border-none text-left" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <i className={`fa-solid ${action.icon}`} />
                        <span>{action.label}</span>
                      </button>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.06 }}
                  >
                    <Link href={action.href} className="user-quick-btn">
                      <i className={`fa-solid ${action.icon}`} />
                      <span>{action.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="user-referral-box"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="user-referral-label">My Referral Link</div>
              <div className="user-referral-url">aurrahealthkart.in/ref/AHK002</div>
              <motion.button
                className="user-referral-copy-btn"
                onClick={copyRef}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <i className="fa-solid fa-copy" style={{ marginRight: 5 }} /> Copy Referral Link
              </motion.button>
            </motion.div>
          </AdminCard>
        </motion.div>
      </motion.div>

      {/* ── NETWORK TREE + RECENT ORDERS ── */}
      <motion.div
        className="grid-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        <motion.div variants={fadeUp} custom={0}>
          <AdminCard>
             <div className="user-tree-wrap">
              {/* Level 0 — Me */}
              <div className="user-tree-level">
                <motion.div
                  className="user-tree-node"
                  whileHover={{ scale: 1.06 }}
                >
                  <div className="user-tree-avatar" style={{ background: treeData.root.gradient, color: '#fff' }}>
                    {treeData.root.letter}
                  </div>
                  <div className="user-tree-name">{treeData.root.name}</div>
                  <div className="user-tree-id">{treeData.root.id}</div>
                </motion.div>
              </div>
              <div className="user-tree-connector" />

              {/* Level 1 */}
              <div className="user-tree-level">
                {treeData.level1.map((member, i) => (
                  <motion.div
                    key={member.id}
                    className="user-tree-node"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    whileHover={{ scale: 1.06 }}
                  >
                    <div className="user-tree-avatar" style={{ background: member.gradient, color: '#fff' }}>
                      {member.letter}
                    </div>
                    <div className="user-tree-name">{member.name}</div>
                    <div className="user-tree-id">{member.id}</div>
                  </motion.div>
                ))}
              </div>
              <div className="user-tree-connector" />

              {/* Level 2 */}
              <div className="user-tree-level">
                {treeData.level2.map((member, i) => (
                  <motion.div
                    key={member.id}
                    className="user-tree-node"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ scale: 1.06 }}
                  >
                    <div className="user-tree-avatar" style={{ background: member.gradient, color: '#fff' }}>
                      {member.letter}
                    </div>
                    <div className="user-tree-name">{member.name}</div>
                    <div className="user-tree-id">{member.id}</div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="user-tree-total"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <i className="fa-solid fa-users" style={{ marginRight: 5 }} />
                {47 + (treeData.level2.length - networkTree.level2.length)} total members in your network
              </motion.div>
            </div>
          </AdminCard>
        </motion.div>

        <motion.div variants={fadeUp} custom={1}>
          <AdminCard>
            <div className="card-head">
              <h3>My Recent Orders</h3>
              <button className="btn-sm fill">All Orders</button>
            </div>
            <table className="data-table">
              <thead>
                <tr><th>Order</th><th>Product</th><th>Amt</th><th>Status</th></tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                  >
                    <td>{order.id}</td>
                    <td>{order.product}</td>
                    <td>{order.amount}</td>
                    <td><span className={`user-pill ${order.statusClass}`}>{order.status}</span></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: 16 }}>
              <div className="card-head" style={{ marginBottom: 10 }}><h3>Withdrawal History</h3></div>
              <table className="data-table">
                <thead>
                  <tr><th>Date</th><th>Amount</th><th>Method</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {withdrawalHistory.map((entry, i) => (
                    <motion.tr
                      key={entry.date}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                    >
                      <td>{entry.date}</td>
                      <td>{entry.amount}</td>
                      <td>{entry.method}</td>
                      <td><span className={`user-pill ${entry.statusClass}`}>{entry.status}</span></td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AdminCard>
        </motion.div>
      </motion.div>

      {/* ── TOAST NOTIFICATION ── */}
      {toastMsg && (
        <motion.div
          className="user-toast"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
        >
          {toastMsg}
        </motion.div>
      )}
    </div>
  );
}
