'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface OrderItem {
  srNo: number;
  orderId: string;
  name: string;
  userId: string;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  deliveryStatus: 'Delivered' | 'Pending' | 'Shipped';
  date: string;
}

export default function CustomerOrderListPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesCount, setEntriesCount] = useState(10);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Seeded Order matching Screenshot 2
  const orders: OrderItem[] = [
    {
      srNo: 1,
      orderId: 'AHKO-000001',
      name: 'faiz abbas',
      userId: 'AHK24220',
      total: 1019.37,
      paymentMethod: 'cod',
      paymentStatus: 'success',
      deliveryStatus: 'Delivered',
      date: '23-Jan-2026'
    }
  ];

  const handleExcelExport = () => {
    triggerToast('📊 Exporting orders report to Excel...');
  };

  const filteredOrders = orders.filter(o => 
    o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmountSum = filteredOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="content">
      <div className="card">
        {/* Entries and Search row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#555' }}>
            Show 
            <select 
              value={entriesCount} 
              onChange={(e) => setEntriesCount(Number(e.target.value))}
              style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff' }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select> 
            entries
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              onClick={handleExcelExport}
              style={{ padding: '6px 14px', border: '1px solid #ccc', borderRadius: '4px', background: '#fff', fontSize: '13px', color: '#333', cursor: 'pointer', fontWeight: 500 }}
            >
              Excel
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '14px', color: '#555' }}>Search:</span>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search orders..." 
                style={{ padding: '6px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px', outline: 'none', background: '#fff' }}
              />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
          <table className="data-table" style={{ width: '100%', minWidth: '1000px' }}>
            <thead>
              <tr>
                <th>Sr.No <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Order Id <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Name <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Total <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Payment Method <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Payment Status <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Delivery Status <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Order Date <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th style={{ textAlign: 'center' }}>View Details</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.slice(0, entriesCount).map((o, idx) => (
                <tr key={o.orderId}>
                  <td>{idx + 1}</td>
                  <td style={{ fontWeight: '600' }}>{o.orderId}</td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: '500' }}>{o.name}</span>
                      <span style={{ background: '#28a745', color: '#fff', fontSize: '9px', padding: '1px 6px', borderRadius: '3px', width: 'fit-content', marginTop: '2px', fontWeight: 'bold' }}>
                        {o.userId}
                      </span>
                    </div>
                  </td>
                  <td style={{ fontWeight: 'bold' }}>₹{o.total.toFixed(2)}</td>
                  <td style={{ textTransform: 'uppercase', fontSize: '12px' }}>{o.paymentMethod}</td>
                  <td>
                    <span style={{ color: o.paymentStatus === 'success' ? '#28a745' : '#dc3545', fontWeight: '600', textTransform: 'capitalize' }}>
                      {o.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <span style={{ background: '#28a745', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', display: 'inline-block' }}>
                      {o.deliveryStatus}
                    </span>
                  </td>
                  <td style={{ fontSize: '13px', color: '#666' }}>{o.date}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      onClick={() => setShowDetailsModal(true)}
                      style={{ background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: 500 }}
                    >
                      View Details
                    </button>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      onClick={() => router.push('/admin/customer/invoice')}
                      title="Print Invoice"
                      style={{ background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', width: '28px', height: '28px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <i className="fa-solid fa-file-invoice"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length > 0 && (
                <tr style={{ background: '#fcfcfc', fontWeight: 'bold' }}>
                  <td colSpan={3} style={{ textAlign: 'right', paddingRight: '20px' }}>Total Amount:</td>
                  <td colSpan={7}>₹{totalAmountSum.toFixed(2)}</td>
                </tr>
              )}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={10} style={{ textAlign: 'center', padding: '24px', color: '#888' }}>
                    No customer orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Separator line representing scroll track */}
        <div style={{ height: '8px', background: '#ccc', borderRadius: '4px', margin: '14px 0 20px' }}></div>

        {/* Footer info & Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '13px', color: '#666' }}>
            Showing 1 to {Math.min(filteredOrders.length, entriesCount)} of {filteredOrders.length} entries
          </div>
          <div className="pagination-btns">
            <button className="pg-btn" disabled>Prev</button>
            <button className="pg-btn active">1</button>
            <button className="pg-btn" disabled>Next</button>
          </div>
        </div>
      </div>

      {/* Order Details Modal matching Screenshot 3 */}
      {showDetailsModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '650px', margin: '20px' }}>
            <div className="card-head" style={{ borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#333', margin: 0 }}>Order Id :- AHKO-000001</h3>
                <span style={{ background: '#28a745', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>DELIVERED</span>
              </div>
              <button onClick={() => setShowDetailsModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', color: '#888', cursor: 'pointer' }}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Shipping Address Container */}
            <div style={{ border: '1px solid #00c0ef', borderRadius: '4px', background: '#f4fdff', padding: '14px', marginBottom: '18px', fontSize: '13.5px' }}>
              <div style={{ fontWeight: 'bold', color: '#0097bc', borderBottom: '1px solid #e0f7fc', paddingBottom: '6px', marginBottom: '8px', textAlign: 'center' }}>Shipping Address</div>
              <div style={{ textAlign: 'center', color: '#333' }}>
                49, Lucknow, Uttar Pradesh, india, 226030 <br />
                <strong>8090389688</strong>
              </div>
            </div>

            {/* Product Table Container */}
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', right: 0, top: '-24px', background: '#ffc107', color: '#000', fontSize: '11px', padding: '2px 8px', borderRadius: '3px', fontWeight: 'bold' }}>
                Total:- ₹1019
              </span>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', border: '1px solid #eee' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px', background: '#f9f9f9', fontWeight: '600', width: '25%' }}>Product Name</td>
                    <td style={{ padding: '10px', width: '25%' }}>Aurglow Cream</td>
                    <td style={{ padding: '10px', background: '#f9f9f9', fontWeight: '600', width: '25%' }}>Quantity</td>
                    <td style={{ padding: '10px', width: '25%' }}>1</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px', background: '#f9f9f9', fontWeight: '600' }}>Discount</td>
                    <td style={{ padding: '10px' }}>₹1019</td>
                    <td style={{ padding: '10px', background: '#f9f9f9', fontWeight: '600' }}>MRP</td>
                    <td style={{ padding: '10px' }}>₹1699</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', background: '#f9f9f9', fontWeight: '600' }}>Payment Methods</td>
                    <td style={{ padding: '10px' }}>Cash On Delivery</td>
                    <td style={{ padding: '10px', background: '#f9f9f9', fontWeight: '600' }}>Category</td>
                    <td style={{ padding: '10px' }}>None</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Grand Total area */}
            <div style={{ textAlign: 'center', marginTop: '20px', padding: '12px 0', borderTop: '1px dashed #ddd' }}>
              <div style={{ color: '#666', fontSize: '13px' }}>Shipping Charge : ₹0</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginTop: '4px' }}>
                Grand Total:- ₹1019.37
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button 
                onClick={() => setShowDetailsModal(false)}
                style={{ padding: '8px 24px', fontSize: '13px', background: '#fff', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', color: '#555' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Alert */}
      {toastMessage && (
        <div 
          style={{ 
            position: 'fixed', 
            bottom: '24px', 
            right: '24px', 
            background: '#28a745', 
            color: '#fff', 
            padding: '12px 24px', 
            borderRadius: '4px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 9999,
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
