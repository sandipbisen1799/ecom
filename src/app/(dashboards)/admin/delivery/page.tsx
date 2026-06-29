'use client';
import { useState } from 'react';

const initialDeliveries = [
  { tracking: 'TRK-98382', order: '#ORD8827', customer: 'Rahul Singh', city: 'Delhi', courier: 'Delhivery', status: 'Pending Pickup', eta: '02 Jul 2025' },
  { tracking: 'TRK-98381', order: '#ORD8826', customer: 'Priya Mehta', city: 'Mumbai', courier: 'BlueDart', status: 'Delivered', eta: '29 Jun 2025' },
  { tracking: 'TRK-98380', order: '#ORD8825', customer: 'Ankit Sharma', city: 'Pune', courier: 'Express', status: 'Pending Pickup', eta: '03 Jul 2025' },
  { tracking: 'TRK-98379', order: '#ORD8824', customer: 'Neha Gupta', city: 'Jaipur', courier: 'Ecom Express', status: 'In Transit', eta: '01 Jul 2025' },
  { tracking: 'TRK-98378', order: '#ORD8823', customer: 'Sanjay Patel', city: 'Nagpur', courier: 'SpeedPost', status: 'Failed', eta: 'Failed attempt' },
  { tracking: 'TRK-98377', order: '#ORD8822', customer: 'Rajesh Kumar', city: 'Delhi', courier: 'Delhivery', status: 'Delivered', eta: '28 Jun 2025' },
  { tracking: 'TRK-98376', order: '#ORD8821', customer: 'Amit Verma', city: 'Mumbai', courier: 'BlueDart', status: 'In Transit', eta: '30 Jun 2025' },
  { tracking: 'TRK-98375', order: '#ORD8820', customer: 'Sunita Devi', city: 'Bangalore', courier: 'BlueDart', status: 'In Transit', eta: '30 Jun 2025' },
];

export default function DeliveryPage() {
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = delivery.tracking.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          delivery.order.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          delivery.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || delivery.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="content">
      {/* ALERT BANNER */}
      <div className="alert-banner warn">
        <div className="alert-icon"><i className="fa-solid fa-triangle-exclamation"></i></div>
        <div className="alert-text">
          <h4>Courier Assignment Required</h4>
          <p>You have 8 orders pending pickup. Please assign couriers to avoid delivery delays.</p>
        </div>
        <button className="btn-sm fill" style={{ marginLeft: 'auto', background: '#b45309', borderColor: '#b45309', color: '#fff' }}>Assign Now</button>
      </div>

      {/* STAT CARDS */}
      <div className="stats-row">
        <div className="stat-card blue">
          <div className="stat-icon"><i className="fa-solid fa-truck-ramp-box"></i></div>
          <div className="stat-num">186</div>
          <div className="stat-label">In Transit</div>
          <div className="stat-change up"><i className="fa-solid fa-arrow-trend-up"></i> +8.4% this month</div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon"><i className="fa-solid fa-circle-check"></i></div>
          <div className="stat-num">48</div>
          <div className="stat-label">Delivered Today</div>
          <div className="stat-change up"><i className="fa-solid fa-check"></i> Standard timing</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon"><i className="fa-solid fa-boxes-packing"></i></div>
          <div className="stat-num">8</div>
          <div className="stat-label">Pending Pickup</div>
          <div className="stat-change down"><i className="fa-solid fa-circle-exclamation"></i> Awaiting courier</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon"><i className="fa-solid fa-circle-xmark"></i></div>
          <div className="stat-num">3</div>
          <div className="stat-label">Failed Deliveries</div>
          <div className="stat-change down"><i className="fa-solid fa-circle-exclamation"></i> Needs re-attempt</div>
        </div>
      </div>

      {/* DELIVERY CARD */}
      <div className="card">
        <div className="page-header">
          <h3>Logistics & Shipments</h3>
          <div className="page-actions">
            <button className="btn-primary"><i className="fa-solid fa-truck"></i> Ship Manifest</button>
            <button className="btn-outline"><i className="fa-solid fa-location-dot"></i> Real-time Map</button>
          </div>
        </div>

        {/* TAB NAV */}
        <div className="tab-nav">
          <button className={`tab-btn ${activeTab === 'All' ? 'active' : ''}`} onClick={() => setActiveTab('All')}>
            All <span className="tab-count">{deliveries.length}</span>
          </button>
          <button className={`tab-btn ${activeTab === 'In Transit' ? 'active' : ''}`} onClick={() => setActiveTab('In Transit')}>
            In Transit <span className="tab-count">{deliveries.filter(d => d.status === 'In Transit').length}</span>
          </button>
          <button className={`tab-btn ${activeTab === 'Delivered' ? 'active' : ''}`} onClick={() => setActiveTab('Delivered')}>
            Delivered <span className="tab-count">{deliveries.filter(d => d.status === 'Delivered').length}</span>
          </button>
          <button className={`tab-btn ${activeTab === 'Pending Pickup' ? 'active' : ''}`} onClick={() => setActiveTab('Pending Pickup')}>
            Pending Pickup <span className="tab-count">{deliveries.filter(d => d.status === 'Pending Pickup').length}</span>
          </button>
          <button className={`tab-btn ${activeTab === 'Failed' ? 'active' : ''}`} onClick={() => setActiveTab('Failed')}>
            Failed <span className="tab-count">{deliveries.filter(d => d.status === 'Failed').length}</span>
          </button>
        </div>

        <div className="filter-bar">
          <input 
            type="text" 
            placeholder="Search by Tracking ID, Order ID, customer..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>City</th>
              <th>Courier Partner</th>
              <th>Status</th>
              <th>ETA / Delivered Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeliveries.map((delivery) => (
              <tr key={delivery.tracking}>
                <td style={{ fontWeight: '600' }}>{delivery.tracking}</td>
                <td>{delivery.order}</td>
                <td>{delivery.customer}</td>
                <td>{delivery.city}</td>
                <td>{delivery.courier}</td>
                <td>
                  <span className={`status-pill status-${delivery.status === 'Delivered' ? 'good' : delivery.status === 'In Transit' ? 'shipped' : delivery.status === 'Pending Pickup' ? 'low' : 'critical'}`}>
                    {delivery.status}
                  </span>
                </td>
                <td>{delivery.eta}</td>
                <td>
                  <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                    <button className="act-btn" title="Track Live Location"><i className="fa-solid fa-location-dot"></i></button>
                    <button className="act-btn" title="Update status"><i className="fa-solid fa-pen"></i></button>
                    <button className="act-btn" title="Assign Courier"><i className="fa-solid fa-truck"></i></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredDeliveries.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '24px', color: 'var(--muted)' }}>
                  No shipments found matching filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <div className="pagination-info">
            Showing 1-{filteredDeliveries.length} of {filteredDeliveries.length} shipments
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
