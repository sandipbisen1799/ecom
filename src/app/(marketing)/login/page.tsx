'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './login.css';

export default function LoginPage() {
  const router = useRouter();
  const [panel, setPanel] = useState('admin');
  const [userId, setUserId] = useState('AHK001');
  const [password, setPassword] = useState('123456');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastColor, setToastColor] = useState('#1D6435');
  const [shake, setShake] = useState(false);

  const showToast = (msg: string, color = '#1D6435') => {
    setToastMsg(msg);
    setToastColor(color);
    setTimeout(() => setToastMsg(''), 2800);
  };

  const handleSetPanel = (newPanel: string, id: string) => {
    setPanel(newPanel);
    setUserId(id);
    setPassword('123456');
    showToast(`✅ Credentials filled for ${newPanel}`);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const validCreds: Record<string, { pwd: string; page: string }> = {
      'AHK001': { pwd: '123456', page: '/admin' },
      'AHK002': { pwd: '123456', page: '/user' },
      'AFI13880': { pwd: '123456', page: '/franchise' },
    };

    setTimeout(() => {
      setLoading(false);
      const user = validCreds[userId];
      if (user && user.pwd === password) {
        showToast('🎉 Login successful! Redirecting...');
        setTimeout(() => router.push(user.page), 900);
      } else {
        showToast('❌ Invalid User ID or Password', '#ef4444');
        setShake(true);
        setTimeout(() => setShake(false), 400);
      }
    }, 1200);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* LEFT PANEL */}
        <div className="left-panel">
          <div className="brand-logo">
            <div className="logo-badge">AHK</div>
            <div className="brand-text">
              <h2>Aurra Health Kart</h2>
              <span>MLM Software</span>
            </div>
          </div>

          <h1 className="login-heading">User Login</h1>
          <p className="login-sub">Select your panel and sign in to continue</p>

          <div className="panel-tabs">
            <button 
              className={`panel-tab ${panel === 'admin' ? 'active-admin' : ''}`}
              onClick={() => handleSetPanel('admin', 'AHK001')}
            >👑 Admin</button>
            <button 
              className={`panel-tab ${panel === 'user' ? 'active-user' : ''}`}
              onClick={() => handleSetPanel('user', 'AHK002')}
            >👤 User</button>
            <button 
              className={`panel-tab ${panel === 'franchise' ? 'active-fran' : ''}`}
              onClick={() => handleSetPanel('franchise', 'AFI13880')}
            >🏪 Franchise</button>
          </div>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <i className="fa-solid fa-fingerprint field-icon"></i>
              <input 
                type="text" 
                placeholder="User ID" 
                value={userId} 
                onChange={(e) => setUserId(e.target.value)} 
                required 
              />
            </div>

            <div className="input-group">
              <i className="fa-solid fa-lock field-icon" style={{zIndex:1}}></i>
              <input 
                type={showPwd ? "text" : "password"} 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <button type="button" className="eye-btn" onClick={() => setShowPwd(!showPwd)}>
                <i className={`fa-solid ${showPwd ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>

            <div className="forgot-link">
              <a href="#">Forgot password?</a>
            </div>

            <button 
              className="btn-login" 
              type="submit" 
              style={{ animation: shake ? 'shake .4s' : '' }}
            >
              {!loading && <span>Log In</span>}
              {loading && <div className="spinner" style={{display: 'block'}}></div>}
            </button>
          </form>

          <p className="signup-text">Don't have an account? <a href="#">Sign up.</a></p>

          <div className="creds-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Panel</th>
                  <th>UserID</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                <tr onClick={() => handleSetPanel('admin', 'AHK001')} title="Click to auto-fill">
                  <td><span className="panel-badge badge-admin">Admin</span></td>
                  <td>AHK001</td>
                  <td>123456</td>
                </tr>
                <tr onClick={() => handleSetPanel('user', 'AHK002')} title="Click to auto-fill">
                  <td><span className="panel-badge badge-user">User</span></td>
                  <td>AHK002</td>
                  <td>123456</td>
                </tr>
                <tr onClick={() => handleSetPanel('franchise', 'AFI13880')} title="Click to auto-fill">
                  <td><span className="panel-badge badge-fran">Franchise</span></td>
                  <td>AFI13880</td>
                  <td>123456</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <div className="right-illustration">
            <i className="fa-solid fa-leaf"></i>
          </div>
          <h2 className="right-title">Welcome to<br/>Swa Ecommerce</h2>
          <p className="right-subtitle">Journey start's today!<br/>Your health &amp; wellness business awaits.</p>
          <div className="feature-pills">
            <span className="pill"><i className="fa-solid fa-shield-halved"></i> Secure</span>
            <span className="pill"><i className="fa-solid fa-chart-line"></i> Track Earnings</span>
            <span className="pill"><i className="fa-solid fa-users"></i> Team Network</span>
            <span className="pill"><i className="fa-solid fa-box"></i> Products</span>
            <span className="pill"><i className="fa-solid fa-truck-fast"></i> Fast Orders</span>
          </div>
        </div>
      </div>

      <div className={`toast ${toastMsg ? 'show' : ''}`} style={{background: toastColor}}>
        {toastMsg}
      </div>
      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          25%{transform:translateX(-6px)}
          75%{transform:translateX(6px)}
        }
      `}</style>
    </div>
  );
}
