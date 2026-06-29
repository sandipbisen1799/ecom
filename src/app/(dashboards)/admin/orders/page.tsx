'use client';
import { useState } from 'react';

const initialOrders = [
  { id: '#ORD8827', member: 'Rahul Singh (AHK3892)', product: 'Immunity Booster Capsules', qty: 2, amount: 1198, date: '29 Jun 2025', payment: 'Paid', delivery: 'Processing' },
  { id: '#ORD8826', member: 'Priya Mehta (AHK3891)', product: 'Glow Face Serum', qty: 1, amount: 849, date: '29 Jun 2025', payment: 'Paid', delivery: 'Delivered' },
  { id: '#ORD8825', member: 'Ankit Sharma (AHK3890)', product: 'Protein Shake (Chocolate)', qty: 3, amount: 3747, date: '28 Jun 2025', payment: 'Pending', delivery: 'Processing' },
  { id: '#ORD8824', member: 'Neha Gupta (AHK3889)', product: 'Wild Forest Honey', qty: 2, amount: 1398, date: '28 Jun 2025', payment: 'Paid', delivery: 'Shipped' },
  { id: '#ORD8823', member: 'Sanjay Patel (AHK3888)', product: 'Ashwagandha Capsules', qty: 1, amount: 379, date: '27 Jun 2025', payment: 'Paid', delivery: 'Cancelled' },
  { id: '#ORD8822', member: 'Rajesh Kumar (AHK3887)', product: 'Kids Immunity Drops', qty: 2, amount: 898, date: '27 Jun 2025', payment: 'Paid', delivery: 'Delivered' },
  { id: '#ORD8821', member: 'Amit Verma (AHK3886)', product: 'Glow Face Serum', qty: 2, amount: 1698, date: '26 Jun 2025', payment: 'Paid', delivery: 'Shipped' },
  { id: '#ORD8820', member: 'Sunita Devi (AHK3885)', product: 'Neem Capsules', qty: 1, amount: 299, date: '26 Jun 2025', payment: 'Pending', delivery: 'Processing' },
  { id: '#ORD8819', member: 'Vikram Malhotra (AHK3884)', product: 'Protein Shake (Chocolate)', qty: 1, amount: 1249, date: '25 Jun 2025', payment: 'Paid', delivery: 'Delivered' },
  { id: '#ORD8818', member: 'Meenakshi Iyer (AHK3883)', product: 'Ashwagandha Capsules', qty: 3, amount: 1137, date: '25 Jun 2025', payment: 'Paid', delivery: 'Delivered' },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || order.delivery === activeTab || (activeTab === 'Pending' && order.payment === 'Pending');
    return matchesSearch && matchesTab;
  });

  return (
    <div className="content">
      {/* STAT CARDS */}
      <div className="stats-row">
        <div className="stat-card green">
          <div className="stat-icon"><i className="fa-solid fa-cart-shopping"></i></div>
          <div className="stat-num">3,254</div>
          <div className="stat-label">Total Orders</div>
          <div className="stat-change up"><i className="fa-solid fa-arrow-trend-up"></i> +5.7% this month</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon"><i className="fa-solid fa-clock"></i></div>
          <div className="stat-num">186</div>
          <div className="stat-label">Processing</div>
          <div className="stat-change up"><i className="fa-solid fa-circle-exclamation"></i> Action required</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-icon"><i className="fa-solid fa-truck-fast"></i></div>
          <div className="stat-num">412</div>
          <div className="stat-label">Shipped</div>
          <div className="stat-change up"><i className="fa-solid fa-truck"></i> In transit</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon"><i className="fa-solid fa-house-chimney-user"></i></div>
          <div className="stat-num">2,498</div>
          <div className="stat-label">Delivered</div>
          <div className="stat-change up"><i className="fa-solid fa-circle-check"></i> Fulfilled orders</div>
        </div>
      </div>

      {/* ORDERS DIRECTORY */}
      <div className="card">
        <div className="page-header">
          <h3>Orders Registry</h3>
          <div className="page-actions">
            <button className="btn-primary"><i className="fa-solid fa-file-invoice"></i> Bulk Invoice</button>
            <button className="btn-outline"><i className="fa-solid fa-download"></i> Export Orders</button>
          </div>
        </div>

        {/* TAB NAV */}
        <div className="tab-nav">
          <button className={`tab-btn ${activeTab === 'All' ? 'active' : ''}`} onClick={() => setActiveTab('All')}>
            All <span className="tab-count">{orders.length}</span>
          </button>
          <button className={`tab-btn ${activeTab === 'Pending' ? 'active' : ''}`} onClick={() => setActiveTab('Pending')}>
            Pending <span className="tab-count">{orders.filter(o => o.payment === 'Pending').length}</span>
          </button>
          <button className={`tab-btn ${activeTab === 'Processing' ? 'active' : ''}`} onClick={() => setActiveTab('Processing')}>
            Processing <span className="tab-count">{orders.filter(o => o.delivery === 'Processing').length}</span>
          </button>
          <button className={`tab-btn ${activeTab === 'Shipped' ? 'active' : ''}`} onClick={() => setActiveTab('Shipped')}>
            Shipped <span className="tab-count">{orders.filter(o => o.delivery === 'Shipped').length}</span>
          </button>
          <button className={`tab-btn ${activeTab === 'Delivered' ? 'active' : ''}`} onClick={() => setActiveTab('Delivered')}>
            Delivered <span className="tab-count">{orders.filter(o => o.delivery === 'Delivered').length}</span>
          </button>
          <button className={`tab-btn ${activeTab === 'Cancelled' ? 'active' : ''}`} onClick={() => setActiveTab('Cancelled')}>
            Cancelled <span className="tab-count">{orders.filter(o => o.delivery === 'Cancelled').length}</span>
          </button>
        </div>

        <div className="filter-bar">
          <input 
            type="text" 
            placeholder="Search by Order ID, member, product..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Member Details</th>
              <th>Product Details</th>
              <th>Qty</th>
              <th>Amount (₹)</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Delivery Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td style={{ fontWeight: '600' }}>{order.id}</td>
                <td>{order.member}</td>
                <td>{order.product}</td>
                <td>{order.qty}</td>
                <td style={{ fontWeight: '600' }}>₹{order.amount}</td>
                <td>{order.date}</td>
                <td>
                  <span className={`status-pill status-${order.payment === 'Paid' ? 'good' : 'pending'}`}>
                    {order.payment}
                  </span>
                </td>
                <td>
                  <span className={`status-pill status-${order.delivery.toLowerCase() === 'delivered' ? 'good' : order.delivery.toLowerCase() === 'shipped' ? 'shipped' : order.delivery.toLowerCase() === 'processing' ? 'processing' : 'critical'}`}>
                    {order.delivery}
                  </span>
                </td>
                <td>
                  <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                    <button className="act-btn" title="View details"><i className="fa-solid fa-eye"></i></button>
                    <button className="act-btn" title="Print Invoice"><i className="fa-solid fa-print"></i></button>
                    <button className="act-btn danger" title="Cancel order"><i className="fa-solid fa-xmark"></i></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '24px', color: 'var(--muted)' }}>
                  No orders found for the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <div className="pagination-info">
            Showing 1-{filteredOrders.length} of {filteredOrders.length} orders
          </div>
          <div className="pagination-btns">
            <button className="pg-btn" disabled><i className="fa-solid fa-chevron-left"></i></button>
            <button className="pg-btn active">1</button>
            <button className="pg-btn" disabled><i className="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
}
