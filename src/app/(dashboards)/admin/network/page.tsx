'use client';
import { useState } from 'react';

export default function NetworkTreePage() {
  const [searchId, setSearchId] = useState('');

  return (
    <div className="content">
      {/* STATS ROW */}
      <div className="stats-row">
        <div className="stat-card green">
          <div className="stat-icon"><i className="fa-solid fa-sitemap"></i></div>
          <div className="stat-num">12,480</div>
          <div className="stat-label">Network Size</div>
          <div className="stat-change up"><i className="fa-solid fa-arrow-trend-up"></i> +8.4% this month</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-icon"><i className="fa-solid fa-circle-nodes"></i></div>
          <div className="stat-num">10,842</div>
          <div className="stat-label">Active Network</div>
          <div className="stat-change up"><i className="fa-solid fa-check"></i> 87% Active rate</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon"><i className="fa-solid fa-layer-group"></i></div>
          <div className="stat-num">14</div>
          <div className="stat-label">Levels Deep</div>
          <div className="stat-change up"><i className="fa-solid fa-arrow-up-long"></i> Unilevel pattern</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon"><i className="fa-solid fa-award"></i></div>
          <div className="stat-num">2.8M</div>
          <div className="stat-label">Total Volume (BV)</div>
          <div className="stat-change up"><i className="fa-solid fa-plus"></i> High sales velocity</div>
        </div>
      </div>

      {/* GENEALOGY CARD */}
      <div className="card">
        <div className="page-header">
          <h3>Genealogy Tree Viewer</h3>
          <div className="page-actions">
            <button className="btn-outline"><i className="fa-solid fa-house-chimney"></i> Reset to Admin</button>
            <button className="btn-primary"><i className="fa-solid fa-magnifying-glass-plus"></i> Deep Zoom</button>
          </div>
        </div>

        <div className="filter-bar" style={{ marginBottom: '32px' }}>
          <input 
            type="text" 
            placeholder="Search member by ID (e.g. AHK0021)..." 
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button className="btn-primary" style={{ padding: '10px 20px' }}>Search Node</button>
        </div>

        <div className="tree-container">
          {/* LEVEL 0 */}
          <div className="tree-level">
            <div className="tree-node">
              <div className="tree-avatar" style={{ background: 'linear-gradient(135deg, var(--accent), #1e40af)' }}>A</div>
              <div className="tree-name">Admin (Root)</div>
              <div className="tree-id">AHK001</div>
              <div className="tree-bv">BV: 12,500</div>
            </div>
          </div>

          <div className="tree-connector"></div>

          {/* LEVEL 1 */}
          <div className="tree-level">
            <div className="tree-node">
              <div className="tree-avatar" style={{ background: 'linear-gradient(135deg, var(--blue), #1d4ed8)' }}>P</div>
              <div className="tree-name">Priya Sharma</div>
              <div className="tree-id">AHK0021</div>
              <div className="tree-bv">BV: 3,450</div>
            </div>
            <div className="tree-node">
              <div className="tree-avatar" style={{ background: 'linear-gradient(135deg, var(--orange), #d97706)' }}>R</div>
              <div className="tree-name">Raj Thakur</div>
              <div className="tree-id">AHK0034</div>
              <div className="tree-bv">BV: 2,120</div>
            </div>
            <div className="tree-node">
              <div className="tree-avatar" style={{ background: 'linear-gradient(135deg, var(--purple), #6d28d9)' }}>A</div>
              <div className="tree-name">Anita Verma</div>
              <div className="tree-id">AHK0058</div>
              <div className="tree-bv">BV: 5,600</div>
            </div>
          </div>

          <div className="tree-connector"></div>

          {/* LEVEL 2 */}
          <div className="tree-level" style={{ gap: '16px' }}>
            <div className="tree-node">
              <div className="tree-avatar" style={{ background: '#7c3aed' }}>S</div>
              <div className="tree-name">Suresh Kumar</div>
              <div className="tree-id">AHK0072</div>
              <div className="tree-bv">BV: 850</div>
            </div>
            <div className="tree-node">
              <div className="tree-avatar" style={{ background: '#ec4899' }}>N</div>
              <div className="tree-name">Nisha Pandey</div>
              <div className="tree-id">AHK0091</div>
              <div className="tree-bv">BV: 1,200</div>
            </div>
            <div className="tree-node">
              <div className="tree-avatar" style={{ background: '#10b981' }}>M</div>
              <div className="tree-name">Meena Roy</div>
              <div className="tree-id">AHK0104</div>
              <div className="tree-bv">BV: 950</div>
            </div>
            <div className="tree-node">
              <div className="tree-avatar" style={{ background: '#f43f5e' }}>K</div>
              <div className="tree-name">Kiran Das</div>
              <div className="tree-id">AHK0211</div>
              <div className="tree-bv">BV: 2,400</div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '12px', color: 'var(--muted)' }}>
          <i className="fa-solid fa-circle-info"></i> 47 total members visible in this branch viewport • Click any node to navigate/expand downline
        </div>
      </div>
    </div>
  );
}
