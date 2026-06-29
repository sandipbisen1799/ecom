'use client';
import { useState } from 'react';

const reportTypes = [
  { title: 'Sales Report', icon: 'fa-chart-line', desc: 'Track sales volume, orders, and total revenue trends.', color: '#e8f5e9', txt: 'var(--accent)' },
  { title: 'Member Growth Report', icon: 'fa-users', desc: 'Monitor active networks, tree structures, and registrations.', color: '#e3f2fd', txt: 'var(--blue)' },
  { title: 'Commission Report', icon: 'fa-indian-rupee-sign', desc: 'Overview of direct, level, matching, and leadership commissions.', color: '#fff3e0', txt: 'var(--orange)' },
  { title: 'Payout Report', icon: 'fa-money-bill-transfer', desc: 'Summary of withdrawal requests, bank listings, and processed transfers.', color: '#f3e5f5', txt: 'var(--purple)' },
  { title: 'Order Report', icon: 'fa-receipt', desc: 'Categorized orders, delivery statistics, and tax structures.', color: '#e0f2fe', txt: '#0284c7' },
  { title: 'Franchise Performance', icon: 'fa-store', desc: 'Stock reports, local walk-in revenues, and franchise commissions.', color: '#fce7f3', txt: '#db2777' },
];

const initialDownloads = [
  { name: 'Monthly_Sales_Report_Jun_2025', date: '29 Jun 2025', format: 'PDF', size: '2.4 MB' },
  { name: 'Commission_Summary_Q2', date: '28 Jun 2025', format: 'EXCEL', size: '4.8 MB' },
  { name: 'Members_Active_Genealogy', date: '25 Jun 2025', format: 'EXCEL', size: '1.2 MB' },
  { name: 'Payout_Manifest_June_Batch_2', date: '15 Jun 2025', format: 'PDF', size: '920 KB' },
  { name: 'Franchise_Revenue_Audit_May', date: '01 Jun 2025', format: 'PDF', size: '3.1 MB' },
];

export default function ReportsPage() {
  const [downloads, setDownloads] = useState(initialDownloads);
  const [search, setSearch] = useState('');

  return (
    <div className="content">
      {/* FILTER DATE RANGE & EXPORT */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="page-header" style={{ marginBottom: '16px' }}>
          <h3>Reports & Analytics Console</h3>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Generate customized business statements</span>
        </div>

        <div className="filter-bar">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '11px', fontWeight: '600', color: 'var(--muted)' }}>From Date</label>
            <input type="date" defaultValue="2025-06-01" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '11px', fontWeight: '600', color: 'var(--muted)' }}>To Date</label>
            <input type="date" defaultValue="2025-06-30" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '11px', fontWeight: '600', color: 'var(--muted)' }}>Report Type</label>
            <select>
              <option>All Reports</option>
              <option>Sales Reports</option>
              <option>Member Reports</option>
              <option>Commission Reports</option>
            </select>
          </div>
          <button className="btn-primary" style={{ marginTop: 'auto', padding: '10px 20px' }}><i className="fa-solid fa-arrows-rotate"></i> Run Query</button>
        </div>
      </div>

      {/* REPORT CATEGORIES */}
      <div className="report-grid">
        {reportTypes.map((rep, idx) => (
          <div className="report-card" key={idx}>
            <div className="rc-icon" style={{ backgroundColor: rep.color, color: rep.txt }}>
              <i className={`fa-solid ${rep.icon}`}></i>
            </div>
            <h4>{rep.title}</h4>
            <p>{rep.desc}</p>
            <button className="btn-sm fill" style={{ marginTop: '16px', background: rep.txt, borderColor: rep.txt, color: '#fff' }}>
              <i className="fa-solid fa-file-export"></i> Generate
            </button>
          </div>
        ))}
      </div>

      {/* RECENT DOWNLOADS */}
      <div className="card">
        <div className="page-header">
          <h3>Recent Generated Archives</h3>
          <button className="btn-outline"><i className="fa-solid fa-trash-can"></i> Purge All Logs</button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Report File Name</th>
              <th>Generated Date</th>
              <th>Format</th>
              <th>File Size</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {downloads.map((item, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: '600', fontFamily: 'monospace' }}>{item.name}</td>
                <td>{item.date}</td>
                <td>
                  <span className={`status-pill status-${item.format === 'PDF' ? 'critical' : 'good'}`}>
                    {item.format}
                  </span>
                </td>
                <td>{item.size}</td>
                <td>
                  <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                    <button className="act-btn" title="Download File"><i className="fa-solid fa-download"></i></button>
                    <button className="act-btn danger" title="Delete Archive"><i className="fa-solid fa-trash"></i></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
