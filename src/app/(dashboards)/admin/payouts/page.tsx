'use client';
import { useState } from 'react';

const initialPendingRequests = [
  { id: 'REQ-1092', member: 'Rahul Singh (AHK3892)', amount: '₹6,200', tds: '₹310', net: '₹5,890', method: 'UPI', date: '29 Jun 2025' },
  { id: 'REQ-1091', member: 'Priya Mehta (AHK3891)', amount: '₹12,400', tds: '₹620', net: '₹11,780', method: 'Bank Transfer', date: '29 Jun 2025' },
  { id: 'REQ-1090', member: 'Ankit Sharma (AHK3890)', amount: '₹4,500', tds: '₹225', net: '₹4,275', method: 'UPI', date: '28 Jun 2025' },
  { id: 'REQ-1089', member: 'Neha Gupta (AHK3889)', amount: '₹8,900', tds: '₹445', net: '₹8,455', method: 'Bank Transfer', date: '27 Jun 2025' },
  { id: 'REQ-1088', member: 'Sanjay Patel (AHK3888)', amount: '₹3,200', tds: '₹160', net: '₹3,040', method: 'UPI', date: '26 Jun 2025' },
];

const completedPayouts = [
  { txn: 'TXN-90210', member: 'Amit Verma (AHK3886)', amount: '₹3,200', method: 'UPI', date: '25 Jun 2025', ref: 'UPI-98382718' },
  { txn: 'TXN-90209', member: 'Sunita Devi (AHK3885)', status: 'Success', amount: '₹2,800', method: 'Bank Transfer', date: '10 Jun 2025', ref: 'NEFT-83920192' },
  { txn: 'TXN-90208', member: 'Vikram Malhotra (AHK3884)', amount: '₹1,500', method: 'UPI', date: '28 May 2025', ref: 'UPI-72819201' },
  { txn: 'TXN-90207', member: 'Meenakshi Iyer (AHK3883)', amount: '₹12,400', method: 'Bank Transfer', date: '25 May 2025', ref: 'NEFT-82019208' },
  { txn: 'TXN-90206', member: 'Rajesh Kumar (AHK3887)', amount: '₹8,600', method: 'UPI', date: '15 May 2025', ref: 'UPI-38291029' },
];

export default function PayoutsPage() {
  const [pending, setPending] = useState(initialPendingRequests);

  const handleApprove = (id: string) => {
    setPending(prev => prev.filter(req => req.id !== id));
  };

  return (
    <div className="content">
      {/* STAT CARDS */}
      <div className="stats-row">
        <div className="stat-card orange">
          <div className="stat-icon"><i className="fa-solid fa-money-bill-transfer"></i></div>
          <div className="stat-num">₹2.4L</div>
          <div className="stat-label">Pending Requests</div>
          <div className="stat-change up"><i className="fa-solid fa-circle-exclamation"></i> 3 pending review</div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon"><i className="fa-solid fa-square-check"></i></div>
          <div className="stat-num">₹82K</div>
          <div className="stat-label">Approved Today</div>
          <div className="stat-change up"><i className="fa-solid fa-check"></i> Automated transfer ready</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-icon"><i className="fa-solid fa-hand-holding-dollar"></i></div>
          <div className="stat-num">₹46.2L</div>
          <div className="stat-label">Total Disbursed</div>
          <div className="stat-change up"><i className="fa-solid fa-arrow-trend-up"></i> +14.2% overall</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon"><i className="fa-solid fa-vault"></i></div>
          <div className="stat-num">₹5.8L</div>
          <div className="stat-label">Wallet Balance</div>
          <div className="stat-change up"><i className="fa-solid fa-check"></i> Reserve funds active</div>
        </div>
      </div>

      <div className="grid-2">
        {/* PENDING WITHDRAWALS */}
        <div className="card">
          <div className="card-head">
            <h3>Pending Withdrawal Requests</h3>
            <span className="nav-badge" style={{ background: 'var(--orange)' }}>{pending.length} pending</span>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Member</th>
                <th>Gross</th>
                <th>TDS (5%)</th>
                <th>Net Payout</th>
                <th>Method</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((req) => (
                <tr key={req.id}>
                  <td style={{ fontWeight: '600' }}>{req.id}</td>
                  <td>{req.member}</td>
                  <td>{req.amount}</td>
                  <td>{req.tds}</td>
                  <td style={{ fontWeight: '600', color: 'var(--accent)' }}>{req.net}</td>
                  <td>{req.method}</td>
                  <td>
                    <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                      <button className="act-btn" onClick={() => handleApprove(req.id)} style={{ color: 'var(--accent)' }} title="Approve"><i className="fa-solid fa-check"></i></button>
                      <button className="act-btn danger" onClick={() => handleApprove(req.id)} title="Reject"><i className="fa-solid fa-xmark"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
              {pending.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '24px', color: 'var(--muted)' }}>
                    No pending withdrawal requests.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* COMPLETED PAYOUT HISTORY */}
        <div className="card">
          <div className="card-head">
            <h3>Recent Payouts</h3>
            <button className="btn-sm">History Log</button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Txn ID</th>
                <th>Member</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Paid Date</th>
                <th>Reference #</th>
              </tr>
            </thead>
            <tbody>
              {completedPayouts.map((pay) => (
                <tr key={pay.txn}>
                  <td style={{ fontWeight: '600' }}>{pay.txn}</td>
                  <td>{pay.member}</td>
                  <td style={{ fontWeight: '600', color: 'var(--accent)' }}>{pay.amount}</td>
                  <td>{pay.method}</td>
                  <td>{pay.date}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--muted)' }}>{pay.ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* BATCH PROCESSING */}
      <div className="card" style={{ marginTop: '24px' }}>
        <div className="page-header" style={{ marginBottom: '0' }}>
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '700' }}>Batch Processing & Transfer</h4>
            <p style={{ margin: '0', fontSize: '12px', color: 'var(--muted)' }}>Execute bulk automated NEFT/UPI payouts for all approved withdrawal requests.</p>
          </div>
          <div className="page-actions">
            <button className="btn-outline"><i className="fa-solid fa-file-export"></i> Export Bank File</button>
            <button className="btn-primary" disabled={pending.length === 0}><i className="fa-solid fa-circle-play"></i> Process All Approved</button>
          </div>
        </div>
      </div>
    </div>
  );
}
