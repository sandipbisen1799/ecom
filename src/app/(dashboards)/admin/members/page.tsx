'use client';
import { useState } from 'react';

const initialMembers = [
  { id: 'AHK3892', name: 'Rahul Singh', sponsor: 'AHK0012', package: 'Gold', date: '29 Jun 2025', kyc: 'Verified', status: 'Active', bv: 500 },
  { id: 'AHK3891', name: 'Priya Mehta', sponsor: 'AHK0104', package: 'Silver', date: '29 Jun 2025', kyc: 'Verified', status: 'Active', bv: 250 },
  { id: 'AHK3890', name: 'Ankit Sharma', sponsor: 'AHK0211', package: 'Diamond', date: '28 Jun 2025', kyc: 'Pending', status: 'Pending', bv: 1000 },
  { id: 'AHK3889', name: 'Neha Gupta', sponsor: 'AHK0084', package: 'Basic', date: '28 Jun 2025', kyc: 'Verified', status: 'Active', bv: 100 },
  { id: 'AHK3888', name: 'Sanjay Patel', sponsor: 'AHK0344', package: 'Gold', date: '27 Jun 2025', kyc: 'Failed', status: 'Inactive', bv: 500 },
  { id: 'AHK3887', name: 'Rajesh Kumar', sponsor: 'AHK0104', package: 'Diamond', date: '27 Jun 2025', kyc: 'Verified', status: 'Active', bv: 1000 },
  { id: 'AHK3886', name: 'Amit Verma', sponsor: 'AHK0021', package: 'Silver', date: '26 Jun 2025', kyc: 'Verified', status: 'Active', bv: 250 },
  { id: 'AHK3885', name: 'Sunita Devi', sponsor: 'AHK0581', package: 'Basic', date: '26 Jun 2025', kyc: 'Pending', status: 'Pending', bv: 100 },
  { id: 'AHK3884', name: 'Vikram Malhotra', sponsor: 'AHK0091', package: 'Gold', date: '25 Jun 2025', kyc: 'Verified', status: 'Active', bv: 500 },
  { id: 'AHK3883', name: 'Meenakshi Iyer', sponsor: 'AHK0072', package: 'Diamond', date: '25 Jun 2025', kyc: 'Verified', status: 'Inactive', bv: 1000 },
];

export default function MembersPage() {
  const [members, setMembers] = useState(initialMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [packageFilter, setPackageFilter] = useState('All');

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.sponsor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || member.status === statusFilter;
    const matchesPackage = packageFilter === 'All' || member.package === packageFilter;
    return matchesSearch && matchesStatus && matchesPackage;
  });

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
        <div className="stat-card blue">
          <div className="stat-icon"><i className="fa-solid fa-user-check"></i></div>
          <div className="stat-num">10,842</div>
          <div className="stat-label">Active Members</div>
          <div className="stat-change up"><i className="fa-solid fa-arrow-trend-up"></i> +6.2% this month</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon"><i className="fa-solid fa-address-card"></i></div>
          <div className="stat-num">348</div>
          <div className="stat-label">Pending KYC</div>
          <div className="stat-change down"><i className="fa-solid fa-circle-exclamation"></i> Needs review</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon"><i className="fa-solid fa-user-plus"></i></div>
          <div className="stat-num">1,024</div>
          <div className="stat-label">New This Month</div>
          <div className="stat-change up"><i className="fa-solid fa-arrow-trend-up"></i> +11.5% from last month</div>
        </div>
      </div>

      {/* FILTER BAR & TABLE */}
      <div className="card">
        <div className="page-header">
          <h3>Members Directory</h3>
          <div className="page-actions">
            <button className="btn-primary"><i className="fa-solid fa-plus"></i> Add New Member</button>
            <button className="btn-outline"><i className="fa-solid fa-file-export"></i> Export CSV</button>
          </div>
        </div>

        <div className="filter-bar">
          <input 
            type="text" 
            placeholder="Search by ID, name, sponsor..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select value={packageFilter} onChange={(e) => setPackageFilter(e.target.value)}>
            <option value="All">All Packages</option>
            <option value="Basic">Basic</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Diamond">Diamond</option>
          </select>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Member ID</th>
              <th>Name</th>
              <th>Sponsor ID</th>
              <th>Package</th>
              <th>Join Date</th>
              <th>KYC Status</th>
              <th>Status</th>
              <th>BV</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id}>
                <td style={{ fontWeight: '600' }}>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.sponsor}</td>
                <td>
                  <span className={`status-pill status-${member.package.toLowerCase() === 'diamond' ? 'paid' : member.package.toLowerCase() === 'gold' ? 'active' : member.package.toLowerCase() === 'silver' ? 'processing' : 'inactive'}`}>
                    {member.package}
                  </span>
                </td>
                <td>{member.date}</td>
                <td>
                  <span className={`status-pill status-${member.kyc === 'Verified' ? 'good' : member.kyc === 'Pending' ? 'low' : 'critical'}`}>
                    {member.kyc}
                  </span>
                </td>
                <td>
                  <span className={`status-pill status-${member.status === 'Active' ? 'active' : member.status === 'Pending' ? 'pending' : 'inactive'}`}>
                    {member.status}
                  </span>
                </td>
                <td style={{ fontWeight: '600' }}>{member.bv}</td>
                <td>
                  <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                    <button className="act-btn" title="View"><i className="fa-solid fa-eye"></i></button>
                    <button className="act-btn" title="Edit"><i className="fa-solid fa-pen"></i></button>
                    <button className="act-btn danger" title="Block"><i className="fa-solid fa-ban"></i></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredMembers.length === 0 && (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '24px', color: 'var(--muted)' }}>
                  No members found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <div className="pagination-info">
            Showing 1-{filteredMembers.length} of {filteredMembers.length} members
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
