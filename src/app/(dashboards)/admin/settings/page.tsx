'use client';
import { useState } from 'react';

const loginHistory = [
  { date: '29 Jun 2025, 08:34 PM', ip: '192.168.1.12', device: 'Chrome / Windows', location: 'Delhi, IN', status: 'Success' },
  { date: '28 Jun 2025, 10:12 AM', ip: '103.88.22.41', device: 'Safari / iPhone', location: 'Mumbai, IN', status: 'Success' },
  { date: '27 Jun 2025, 04:45 PM', ip: '49.207.18.239', device: 'Chrome / Android', location: 'Pune, IN', status: 'Success' },
  { date: '25 Jun 2025, 11:20 AM', ip: '115.99.12.180', device: 'Firefox / Windows', location: 'Delhi, IN', status: 'Failed' },
  { date: '24 Jun 2025, 09:15 AM', ip: '192.168.1.12', device: 'Chrome / Windows', location: 'Delhi, IN', status: 'Success' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [razorpay, setRazorpay] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="content">
      {/* SETTINGS TABS */}
      <div className="settings-tabs">
        <button className={`settings-tab ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>
          <i className="fa-solid fa-gear"></i> General
        </button>
        <button className={`settings-tab ${activeTab === 'company' ? 'active' : ''}`} onClick={() => setActiveTab('company')}>
          <i className="fa-solid fa-building"></i> Company Info
        </button>
        <button className={`settings-tab ${activeTab === 'commission' ? 'active' : ''}`} onClick={() => setActiveTab('commission')}>
          <i className="fa-solid fa-sitemap"></i> Commission Plans
        </button>
        <button className={`settings-tab ${activeTab === 'payment' ? 'active' : ''}`} onClick={() => setActiveTab('payment')}>
          <i className="fa-solid fa-credit-card"></i> Payment Gateway
        </button>
        <button className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
          <i className="fa-solid fa-shield-halved"></i> Security & Logs
        </button>
      </div>

      {/* GENERAL TAB */}
      {activeTab === 'general' && (
        <div className="card">
          <div className="card-head"><h3>General System Configurations</h3></div>
          <div className="form-group">
            <label>Website Name / Title</label>
            <input type="text" className="form-input" defaultValue="Aurra Health Kart" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>System Currency</label>
              <select className="form-select" defaultValue="INR">
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Standard G.S.T Rate (%)</label>
              <input type="number" className="form-input" defaultValue="18" />
            </div>
          </div>
          <div className="form-group">
            <label>Site Maintenance Mode</label>
            <div className="form-toggle" onClick={() => setMaintenanceMode(!maintenanceMode)}>
              <div className={`toggle-track ${maintenanceMode ? 'on' : ''}`}></div>
              <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
                {maintenanceMode ? 'On (Only administrators can access)' : 'Off (Publicly accessible)'}
              </span>
            </div>
          </div>
          <button className="btn-primary" style={{ marginTop: '16px' }}><i className="fa-solid fa-floppy-disk"></i> Save Configurations</button>
        </div>
      )}

      {/* COMPANY INFO TAB */}
      {activeTab === 'company' && (
        <div className="card">
          <div className="card-head"><h3>Corporate Details</h3></div>
          <div className="form-group">
            <label>Official Company Name</label>
            <input type="text" className="form-input" defaultValue="Aurra Health Kart Private Limited" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Official Mobile Phone</label>
              <input type="text" className="form-input" defaultValue="+91 98765 43210" />
            </div>
            <div className="form-group">
              <label>Support Email Address</label>
              <input type="email" className="form-input" defaultValue="support@aurrahealth.in" />
            </div>
          </div>
          <div className="form-group">
            <label>Corporate G.S.T.I.N.</label>
            <input type="text" className="form-input" defaultValue="07AAAAA1111A1Z1" />
          </div>
          <div className="form-group">
            <label>Registered Office Address</label>
            <textarea className="form-input" defaultValue="123 Health Avenue, Business Park, New Delhi, 110001"></textarea>
          </div>
          <button className="btn-primary" style={{ marginTop: '16px' }}><i className="fa-solid fa-floppy-disk"></i> Save Details</button>
        </div>
      )}

      {/* COMMISSION PLANS TAB */}
      {activeTab === 'commission' && (
        <div className="card">
          <div className="card-head"><h3>Downline Compensation Configurations</h3></div>
          <div className="form-row">
            <div className="form-group">
              <label>Direct Referral Bonus (%)</label>
              <input type="number" className="form-input" defaultValue="10" />
            </div>
            <div className="form-group">
              <label>Team Bonus BV Threshold</label>
              <input type="number" className="form-input" defaultValue="5000" />
            </div>
          </div>

          <h4 style={{ margin: '24px 0 12px', fontSize: '13px', fontWeight: '700' }}>Unilevel Structure Setup</h4>
          <table className="data-table">
            <thead>
              <tr>
                <th>Generation Level</th>
                <th>BV Commission Payout (%)</th>
                <th>Minimum Active Directs Needed</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Level 1 (Directs)</td><td><input type="number" className="form-input" style={{ width: '100px', padding: '6px' }} defaultValue="10" /></td><td>0</td></tr>
              <tr><td>Level 2</td><td><input type="number" className="form-input" style={{ width: '100px', padding: '6px' }} defaultValue="5" /></td><td>1</td></tr>
              <tr><td>Level 3</td><td><input type="number" className="form-input" style={{ width: '100px', padding: '6px' }} defaultValue="3" /></td><td>2</td></tr>
              <tr><td>Level 4</td><td><input type="number" className="form-input" style={{ width: '100px', padding: '6px' }} defaultValue="2" /></td><td>3</td></tr>
              <tr><td>Level 5</td><td><input type="number" className="form-input" style={{ width: '100px', padding: '6px' }} defaultValue="1" /></td><td>4</td></tr>
            </tbody>
          </table>
          <button className="btn-primary" style={{ marginTop: '16px' }}><i className="fa-solid fa-floppy-disk"></i> Update Compensation Setup</button>
        </div>
      )}

      {/* PAYMENT GATEWAY TAB */}
      {activeTab === 'payment' && (
        <div className="card">
          <div className="card-head"><h3>Settlement Accounts</h3></div>
          <div className="form-group">
            <label>Corporate UPI Handle</label>
            <input type="text" className="form-input" defaultValue="aurrahealth@ybl" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Corporate Bank Name</label>
              <input type="text" className="form-input" defaultValue="HDFC Bank" />
            </div>
            <div className="form-group">
              <label>Bank Account Number</label>
              <input type="text" className="form-input" defaultValue="5020008372810" />
            </div>
          </div>
          <div className="form-group">
            <label>IFSC Routing Code</label>
            <input type="text" className="form-input" defaultValue="HDFC0000102" />
          </div>
          <div className="form-group">
            <label>Enable Razorpay Integration</label>
            <div className="form-toggle" onClick={() => setRazorpay(!razorpay)}>
              <div className={`toggle-track ${razorpay ? 'on' : ''}`}></div>
              <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
                {razorpay ? 'Active (Card, Netbanking, Wallet payments enabled)' : 'Disabled'}
              </span>
            </div>
          </div>
          <button className="btn-primary" style={{ marginTop: '16px' }}><i className="fa-solid fa-floppy-disk"></i> Save Gateways</button>
        </div>
      )}

      {/* SECURITY TAB */}
      {activeTab === 'security' && (
        <div>
          <div className="card" style={{ marginBottom: '24px' }}>
            <div className="card-head"><h3>Security Settings</h3></div>
            <div className="form-group">
              <label>Require Two-Factor Authentication (2FA)</label>
              <div className="form-toggle" onClick={() => setTwoFactor(!twoFactor)}>
                <div className={`toggle-track ${twoFactor ? 'on' : ''}`}></div>
                <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
                  {twoFactor ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Admin Session Timeout</label>
                <select className="form-select" defaultValue="30">
                  <option value="30">30 Minutes</option>
                  <option value="60">1 Hour</option>
                  <option value="120">2 Hours</option>
                </select>
              </div>
              <div className="form-group">
                <label>Max Failed Login Retries</label>
                <input type="number" className="form-input" defaultValue="5" />
              </div>
            </div>
            <button className="btn-primary" style={{ marginTop: '16px' }}><i className="fa-solid fa-floppy-disk"></i> Save Policy</button>
          </div>

          <div className="card">
            <div className="card-head"><h3>Recent Admin Login Sessions</h3></div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>IP Address</th>
                  <th>Device / browser</th>
                  <th>Approximate Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loginHistory.map((log, idx) => (
                  <tr key={idx}>
                    <td>{log.date}</td>
                    <td style={{ fontFamily: 'monospace' }}>{log.ip}</td>
                    <td>{log.device}</td>
                    <td>{log.location}</td>
                    <td>
                      <span className={`status-pill status-${log.status === 'Success' ? 'good' : 'critical'}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
