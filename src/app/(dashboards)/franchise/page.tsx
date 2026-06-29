'use client';

export default function FranchiseDashboard() {
  return (
    <div className="content">
      <div className="inv-warn">
        <div className="inv-icon"><i className="fa-solid fa-triangle-exclamation"></i></div>
        <div className="inv-text">
          <h4>Low Stock Alert</h4>
          <p>You have 3 products running low on stock. Please request stock to avoid unfulfilled local orders.</p>
        </div>
        <button className="btn-sm fill" style={{marginLeft:'auto', background:'#b45309', borderColor:'#b45309', color:'#fff'}}>Request Stock</button>
      </div>

      {/* STAT CARDS */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon" style={{background:'#fff3e0', color:'#f59e0b'}}><i className="fa-solid fa-indian-rupee-sign"></i></div>
          <div className="stat-num">₹1.2L</div>
          <div className="stat-lbl">Today's Sales</div>
          <div className="stat-change up"><i className="fa-solid fa-arrow-trend-up"></i> +12% from yesterday</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{background:'#dcfce7', color:'#16a34a'}}><i className="fa-solid fa-boxes-stacked"></i></div>
          <div className="stat-num">4,520</div>
          <div className="stat-lbl">Items in Stock</div>
          <div className="stat-change up"><i className="fa-solid fa-check"></i> Stock updated</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{background:'#dbeafe', color:'#1d4ed8'}}><i className="fa-solid fa-cart-shopping"></i></div>
          <div className="stat-num">48</div>
          <div className="stat-lbl">Orders Today</div>
          <div className="stat-change up"><i className="fa-solid fa-arrow-trend-up"></i> +5 from yesterday</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{background:'#fef9c3', color:'#ca8a04'}}><i className="fa-solid fa-clock"></i></div>
          <div className="stat-num">4</div>
          <div className="stat-lbl">Pending Pickups</div>
          <div className="stat-change down"><i className="fa-solid fa-circle-exclamation"></i> Needs attention</div>
        </div>
      </div>

      <div className="grid-2">
        {/* LOW STOCK TABLE */}
        <div className="card">
          <div className="card-head"><h3>Inventory Alerts</h3><button className="btn-sm">View Inventory</button></div>
          <table className="data-table">
            <thead><tr><th>Product Name</th><th>SKU</th><th>Current Stock</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>Immunity Booster</td><td>AHK-IM-01</td><td>12</td><td><span className="pill p-red">Critical</span></td></tr>
              <tr><td>Glow Serum</td><td>AHK-SK-05</td><td>18</td><td><span className="pill p-yellow">Low</span></td></tr>
              <tr><td>Ashwagandha</td><td>AHK-AY-02</td><td>24</td><td><span className="pill p-yellow">Low</span></td></tr>
              <tr><td>Protein Shake</td><td>AHK-NU-08</td><td>150</td><td><span className="pill p-green">Good</span></td></tr>
            </tbody>
          </table>
        </div>

        {/* LOCAL ORDERS */}
        <div className="card">
          <div className="card-head"><h3>Recent Local Orders</h3><button className="btn-sm fill">New Bill</button></div>
          <table className="data-table">
            <thead><tr><th>Order ID</th><th>Customer / ID</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>#LOC-4581</td><td>Ravi (Walk-in)</td><td>₹1,450</td><td><span className="pill p-green">Completed</span></td></tr>
              <tr><td>#LOC-4580</td><td>AHK0084</td><td>₹2,800</td><td><span className="pill p-green">Completed</span></td></tr>
              <tr><td>#ONL-8827</td><td>AHK0021</td><td>₹1,198</td><td><span className="pill p-yellow">Pending Pickup</span></td></tr>
              <tr><td>#ONL-8824</td><td>AHK0034</td><td>₹3,500</td><td><span className="pill p-yellow">Pending Pickup</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
