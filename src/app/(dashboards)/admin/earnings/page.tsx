'use client';

const commissionBreakdown = [
  { label: 'Direct Referral Income', amount: '₹18.2L', percentage: '85%', color: 'linear-gradient(90deg, #3b82f6, #60a5fa)' },
  { label: 'Level Income', amount: '₹12.4L', percentage: '62%', color: 'linear-gradient(90deg, #22c55e, #86efac)' },
  { label: 'Team Matching Bonus', amount: '₹8.6L', percentage: '45%', color: 'linear-gradient(90deg, #f59e0b, #fcd34d)' },
  { label: 'Performance Bonus', amount: '₹5.2L', percentage: '30%', color: 'linear-gradient(90deg, #8b5cf6, #c4b5fd)' },
  { label: 'Leadership Pool', amount: '₹4.2L', percentage: '18%', color: 'linear-gradient(90deg, #ef4444, #fca5a5)' },
];

const chartData = [
  { val: '₹3.2L', height: '60%', lbl: 'Jan' },
  { val: '₹4.1L', height: '75%', lbl: 'Feb' },
  { val: '₹3.8L', height: '70%', lbl: 'Mar' },
  { val: '₹5.2L', height: '90%', lbl: 'Apr' },
  { val: '₹4.6L', height: '80%', lbl: 'May' },
  { val: '₹5.8L', height: '100%', lbl: 'Jun' },
  { val: '₹3.9L', height: '68%', lbl: 'Jul' },
  { val: '₹4.4L', height: '76%', lbl: 'Aug' },
];

const initialEarnings = [
  { date: '29 Jun 2025', id: 'AHK3892', name: 'Rahul Singh', type: 'Direct Referral', amount: '₹1,500', status: 'Paid' },
  { date: '29 Jun 2025', id: 'AHK3891', name: 'Priya Mehta', type: 'Level Income (L2)', amount: '₹450', status: 'Paid' },
  { date: '28 Jun 2025', id: 'AHK3890', name: 'Ankit Sharma', type: 'Team Matching Bonus', amount: '₹2,400', status: 'Pending' },
  { date: '28 Jun 2025', id: 'AHK3889', name: 'Neha Gupta', type: 'Direct Referral', amount: '₹1,000', status: 'Paid' },
  { date: '27 Jun 2025', id: 'AHK3888', name: 'Sanjay Patel', type: 'Performance Bonus', amount: '₹1,200', status: 'Paid' },
  { date: '27 Jun 2025', id: 'AHK3887', name: 'Rajesh Kumar', type: 'Level Income (L1)', amount: '₹900', status: 'Paid' },
  { date: '26 Jun 2025', id: 'AHK3886', name: 'Amit Verma', type: 'Team Matching Bonus', amount: '₹1,800', status: 'Pending' },
  { date: '26 Jun 2025', id: 'AHK3885', name: 'Sunita Devi', type: 'Direct Referral', amount: '₹1,000', status: 'Paid' },
];

export default function EarningsPage() {
  return (
    <div className="content">
      {/* STAT CARDS */}
      <div className="stats-row">
        <div className="stat-card green">
          <div className="stat-icon"><i className="fa-solid fa-indian-rupee-sign"></i></div>
          <div className="stat-num">₹48.6L</div>
          <div className="stat-label">Total Revenue</div>
          <div className="stat-change up"><i className="fa-solid fa-arrow-trend-up"></i> +12.1% this month</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-icon"><i className="fa-solid fa-money-bill-trend-up"></i></div>
          <div className="stat-num">₹5.8L</div>
          <div className="stat-label">This Month Revenue</div>
          <div className="stat-change up"><i className="fa-solid fa-circle-check"></i> Trending high</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon"><i className="fa-solid fa-wallet"></i></div>
          <div className="stat-num">₹2.4L</div>
          <div className="stat-label">Pending Payouts</div>
          <div className="stat-change down"><i className="fa-solid fa-circle-exclamation"></i> Process next batch</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon"><i className="fa-solid fa-hand-holding-dollar"></i></div>
          <div className="stat-num">₹46.2L</div>
          <div className="stat-label">Paid Out</div>
          <div className="stat-change up"><i className="fa-solid fa-check"></i> Transferred to members</div>
        </div>
      </div>

      <div className="grid-3">
        {/* COMMISSION BREAKDOWN */}
        <div className="card">
          <div className="card-head">
            <h3>Commission Breakdown</h3>
            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Cumulative distribution</span>
          </div>
          {commissionBreakdown.map((item, idx) => (
            <div className="progress-row" key={idx}>
              <div className="progress-lbl">
                <span>{item.label}</span>
                <span>{item.amount}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: item.percentage, background: item.color }}></div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: '16px', padding: '14px', background: '#f0f4f8', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Total Distributed</span>
            <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent)' }}>₹44.6L</span>
          </div>
        </div>

        {/* MONTHLY REVENUE CHART */}
        <div className="card">
          <div className="card-head">
            <h3>Monthly Revenue Trend</h3>
            <button className="btn-sm">Yearly View</button>
          </div>
          <div className="chart-bars" style={{ height: '220px', paddingTop: '20px' }}>
            {chartData.map((item, idx) => (
              <div className="bar-wrap" key={idx}>
                <div className="bar" data-val={item.val} style={{ height: item.height }}></div>
                <div className="bar-lbl">{item.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT COMMISSION ENTRIES */}
      <div className="card">
        <div className="page-header">
          <h3>Recent Commission Entries</h3>
          <div className="page-actions">
            <button className="btn-primary"><i className="fa-solid fa-file-invoice-dollar"></i> Distribute Monthly Pool</button>
            <button className="btn-outline"><i className="fa-solid fa-download"></i> Download Report</button>
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Member ID</th>
              <th>Name</th>
              <th>Commission Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialEarnings.map((item, idx) => (
              <tr key={idx}>
                <td>{item.date}</td>
                <td style={{ fontWeight: '600' }}>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td style={{ fontWeight: '600', color: 'var(--accent)' }}>{item.amount}</td>
                <td>
                  <span className={`status-pill status-${item.status === 'Paid' ? 'good' : 'pending'}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                    <button className="act-btn" title="View details"><i className="fa-solid fa-eye"></i></button>
                    <button className="act-btn" title="Hold payout"><i className="fa-solid fa-hand"></i></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <div className="pagination-info">
            Showing 1-8 of 1,248 commission entries
          </div>
          <div className="pagination-btns">
            <button className="pg-btn" disabled><i className="fa-solid fa-chevron-left"></i></button>
            <button className="pg-btn active">1</button>
            <button className="pg-btn"><i className="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
}
