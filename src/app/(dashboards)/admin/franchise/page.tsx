'use client';
import { useState } from 'react';

const initialFranchises = [
  { id: 'AFI13880', owner: 'Prakash Rao', location: 'Pune West, MH', type: 'District Level', members: 420, revenue: '₹4.2L', status: 'Active' },
  { id: 'AFI14002', owner: 'Rajiv Sharma', location: 'Delhi Connaught, DL', type: 'City Level', members: 580, revenue: '₹5.8L', status: 'Active' },
  { id: 'AFI14003', owner: 'Milind Soni', location: 'Mumbai Andheri, MH', type: 'District Level', members: 710, revenue: '₹6.5L', status: 'Active' },
  { id: 'AFI14004', owner: 'Aditya Birla', location: 'Bangalore South, KA', type: 'City Level', members: 310, revenue: '₹3.1L', status: 'Pending' },
  { id: 'AFI14005', owner: 'Sunil Chetri', location: 'Kolkata Saltlake, WB', type: 'City Level', members: 180, revenue: '₹1.8L', status: 'Active' },
  { id: 'AFI14006', owner: 'Nitin Gadkari', location: 'Nagpur Central, MH', type: 'District Level', members: 290, revenue: '₹2.9L', status: 'Suspended' },
  { id: 'AFI14007', owner: 'Jayesh Patel', location: 'Ahmedabad East, GJ', type: 'City Level', members: 110, revenue: '₹1.2L', status: 'Pending' },
  { id: 'AFI14008', owner: 'Suresh Raina', location: 'Lucknow Chowk, UP', type: 'City Level', members: 240, revenue: '₹2.4L', status: 'Active' },
];

export default function FranchisePage() {
  const [franchises, setFranchises] = useState(initialFranchises);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredFranchises = franchises.filter(franchise => {
    const matchesSearch = franchise.owner.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          franchise.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          franchise.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || franchise.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="content">
      {/* STAT CARDS */}
      <div className="stats-row">
        <div className="stat-card green">
          <div className="stat-icon"><i className="fa-solid fa-store"></i></div>
          <div className="stat-num">284</div>
          <div className="stat-label">Total Franchises</div>
          <div className="stat-change up"><i className="fa-solid fa-arrow-trend-up"></i> +3.2% this month</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-icon"><i className="fa-solid fa-shop"></i></div>
          <div className="stat-num">256</div>
          <div className="stat-label">Active Branches</div>
          <div className="stat-change up"><i className="fa-solid fa-check"></i> Standard outlets</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon"><i className="fa-solid fa-circle-question"></i></div>
          <div className="stat-num">12</div>
          <div className="stat-label">Pending Approval</div>
          <div className="stat-change down"><i className="fa-solid fa-circle-exclamation"></i> Approval required</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon"><i className="fa-solid fa-indian-rupee-sign"></i></div>
          <div className="stat-num">₹18.4L</div>
          <div className="stat-label">Franchise Revenue</div>
          <div className="stat-change up"><i className="fa-solid fa-arrow-trend-up"></i> +8.6% this month</div>
        </div>
      </div>

      {/* FRANCHISE TABLE */}
      <div className="card">
        <div className="page-header">
          <h3>Franchise Directory</h3>
          <div className="page-actions">
            <button className="btn-primary"><i className="fa-solid fa-plus"></i> Add New Franchise</button>
            <button className="btn-outline"><i className="fa-solid fa-download"></i> Export Records</button>
          </div>
        </div>

        <div className="filter-bar">
          <input 
            type="text" 
            placeholder="Search by ID, owner, branch location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Franchise ID</th>
              <th>Owner Name</th>
              <th>Location</th>
              <th>Level Type</th>
              <th>Total Members</th>
              <th>Monthly Revenue</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFranchises.map((franchise) => (
              <tr key={franchise.id}>
                <td style={{ fontWeight: '600' }}>{franchise.id}</td>
                <td>{franchise.owner}</td>
                <td>{franchise.location}</td>
                <td>{franchise.type}</td>
                <td>{franchise.members}</td>
                <td style={{ fontWeight: '600', color: 'var(--accent)' }}>{franchise.revenue}</td>
                <td>
                  <span className={`status-pill status-${franchise.status === 'Active' ? 'good' : franchise.status === 'Pending' ? 'pending' : 'critical'}`}>
                    {franchise.status}
                  </span>
                </td>
                <td>
                  <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                    <button className="act-btn" title="View Store Profile"><i className="fa-solid fa-eye"></i></button>
                    <button className="act-btn" title="Edit Franchise Details"><i className="fa-solid fa-pen"></i></button>
                    <button className="act-btn danger" title="Suspend Franchise"><i className="fa-solid fa-ban"></i></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredFranchises.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '24px', color: 'var(--muted)' }}>
                  No franchises found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <div className="pagination-info">
            Showing 1-{filteredFranchises.length} of {filteredFranchises.length} franchises
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
