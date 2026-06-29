'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PurchaseItem {
  productName: string;
  mrp: number;
  quantity: number;
  rate: number;
  gstPercent: number;
  total: number;
}

interface Purchase {
  srNo: number;
  supplierName: string;
  totalAmount: number;
  billNo: string;
  description: string;
  date: string;
  items: PurchaseItem[];
}

export default function PurchaseListPage() {
  const router = useRouter();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesCount, setEntriesCount] = useState(10);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger'>('success');

  // Modal State for viewing products
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  
  // Edit Description Modal State
  const [editingPurchase, setEditingPurchase] = useState<Purchase | null>(null);
  const [editDescription, setEditDescription] = useState('');

  // Initial Seed
  useEffect(() => {
    const saved = localStorage.getItem('swa_purchases');
    if (saved) {
      setPurchases(JSON.parse(saved));
    } else {
      const defaultPurchases: Purchase[] = [
        {
          srNo: 1,
          supplierName: 'RSA HERBAL PHARMACEUTICALS PVT LTD',
          totalAmount: 1015434.00,
          billNo: 'PUR-000004',
          description: '-',
          date: '21-Feb-2026 04:40 PM',
          items: [
            { productName: 'Aurglow Cream', mrp: 250, quantity: 2000, rate: 180, gstPercent: 18, total: 424800.00 },
            { productName: 'Aurclear Face Serum', mrp: 320, quantity: 1500, rate: 220, gstPercent: 18, total: 389400.00 },
            { productName: 'Aurglow Face Pack', mrp: 150, quantity: 1200, rate: 100, gstPercent: 18, total: 141600.00 },
            { productName: 'Aurra Tejas', mrp: 450, quantity: 200, rate: 250, gstPercent: 18, total: 59634.00 }
          ]
        },
        {
          srNo: 2,
          supplierName: 'NEW SALASAR HERBOTECH',
          totalAmount: 707353.50,
          billNo: 'PUR-000003',
          description: 'goods',
          date: '17-Feb-2026 12:06 PM',
          items: [
            { productName: 'Aurglow Facewash', mrp: 180, quantity: 3000, rate: 120, gstPercent: 18, total: 424800.00 },
            { productName: 'Aurratri Cream', mrp: 280, quantity: 1200, rate: 200, gstPercent: 18, total: 282553.50 }
          ]
        },
        {
          srNo: 3,
          supplierName: 'NEW SALASAR HERBOTECH',
          totalAmount: 1576783.95,
          billNo: 'PUR-000002',
          description: '-',
          date: '29-Jan-2026 02:13 PM',
          items: [
            { productName: 'Aurkesha Shampoo', mrp: 240, quantity: 5000, rate: 150, gstPercent: 18, total: 885000.00 },
            { productName: 'Aurratri Serum', mrp: 350, quantity: 2500, rate: 235, gstPercent: 18, total: 691783.95 }
          ]
        },
        {
          srNo: 4,
          supplierName: 'NEW SALASAR HERBOTECH',
          totalAmount: 483512.40,
          billNo: 'PUR-000001',
          description: '-',
          date: '24-Jan-2026 12:32 PM',
          items: [
            { productName: 'Aurra Foot Cream', mrp: 160, quantity: 4000, rate: 100, gstPercent: 18, total: 472000.00 },
            { productName: 'Aurglow Face Pack', mrp: 150, quantity: 115, rate: 85, gstPercent: 18, total: 11512.40 }
          ]
        }
      ];
      setPurchases(defaultPurchases);
      localStorage.setItem('swa_purchases', JSON.stringify(defaultPurchases));
    }
  }, []);

  const triggerToast = (msg: string, type: 'success' | 'danger' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleDelete = (billNo: string) => {
    if (confirm(`Are you sure you want to delete purchase order ${billNo}?`)) {
      const updated = purchases.filter(p => p.billNo !== billNo);
      setPurchases(updated);
      localStorage.setItem('swa_purchases', JSON.stringify(updated));
      triggerToast(`Purchase order ${billNo} deleted successfully!`, 'danger');
    }
  };

  const handleOpenEditModal = (p: Purchase) => {
    setEditingPurchase(p);
    setEditDescription(p.description);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPurchase) return;

    const updated = purchases.map(p => 
      p.billNo === editingPurchase.billNo ? { ...p, description: editDescription } : p
    );
    setPurchases(updated);
    localStorage.setItem('swa_purchases', JSON.stringify(updated));

    setEditingPurchase(null);
    triggerToast('Description updated successfully!');
  };

  const handleExcelExport = () => {
    triggerToast('📊 Exporting purchase orders to Excel...');
  };

  const filteredPurchases = purchases.filter(p => 
    p.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content">
      <div className="card">
        {/* Top Header Row */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '18px' }}>
          <button 
            className="btn-primary" 
            onClick={() => router.push('/admin/addpurchase')}
            style={{ background: '#0d6efd', border: 'none', borderRadius: '4px', padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <i className="fa-solid fa-plus"></i> Add
          </button>
        </div>

        {/* Filters and search info */}
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

        {/* Purchase Orders Table */}
        <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
          <table className="data-table" style={{ width: '100%', minWidth: '950px' }}>
            <thead>
              <tr>
                <th>Sr.No <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Supplier Name <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Total Amount <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Bill No <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Description <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th>Date <i className="fa-solid fa-sort" style={{ fontSize: '10px', marginLeft: '4px', opacity: 0.5 }}></i></th>
                <th style={{ textAlign: 'center' }}>View</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchases.slice(0, entriesCount).map((p, index) => (
                <tr key={p.billNo}>
                  <td>{index + 1}</td>
                  <td style={{ fontWeight: '500' }}>{p.supplierName}</td>
                  <td style={{ color: 'var(--accent)', fontWeight: 'bold' }}>
                    ₹{p.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ color: '#0d6efd', fontWeight: '500' }}>{p.billNo}</td>
                  <td>{p.description}</td>
                  <td style={{ fontSize: '12.5px', color: '#555' }}>{p.date}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      onClick={() => setSelectedPurchase(p)}
                      style={{ background: '#17a2b8', color: '#fff', border: 'none', borderRadius: '4px', padding: '6px 12px', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}
                    >
                      View Products
                    </button>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn-action-edit" title="Edit Description" onClick={() => handleOpenEditModal(p)}>
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button className="btn-action-delete" title="Delete Purchase" onClick={() => handleDelete(p.billNo)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPurchases.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '24px', color: '#888' }}>
                    No matching purchase orders found.
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
            Showing 1 to {Math.min(filteredPurchases.length, entriesCount)} of {filteredPurchases.length} entries
          </div>
          <div className="pagination-btns">
            <button className="pg-btn" disabled>Prev</button>
            <button className="pg-btn active">1</button>
            <button className="pg-btn" disabled>Next</button>
          </div>
        </div>
      </div>

      {/* View Products Modal */}
      {selectedPurchase && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '800px', margin: '20px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
            <div className="card-head" style={{ borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#333', margin: 0 }}>Items Purchased – Bill No: {selectedPurchase.billNo}</h3>
                <small style={{ color: '#666', marginTop: '4px' }}>Supplier: {selectedPurchase.supplierName} | Date: {selectedPurchase.date}</small>
              </div>
              <button 
                onClick={() => setSelectedPurchase(null)}
                style={{ background: 'none', border: 'none', fontSize: '18px', color: '#888', cursor: 'pointer' }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <div style={{ overflowY: 'auto', flex: 1, marginBottom: '20px' }}>
              <table className="data-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Sr.No</th>
                    <th>Product Name</th>
                    <th>MRP</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>GST %</th>
                    <th style={{ textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPurchase.items && selectedPurchase.items.length > 0 ? (
                    selectedPurchase.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td style={{ fontWeight: '500' }}>{item.productName}</td>
                        <td>₹{item.mrp.toFixed(2)}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.rate.toFixed(2)}</td>
                        <td>{item.gstPercent}%</td>
                        <td style={{ textAlign: 'right', fontWeight: '500', color: 'var(--accent)' }}>
                          ₹{item.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '16px', color: '#888' }}>
                        No product item details recorded for this order.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '16px' }}>
              <div style={{ fontSize: '15px', fontWeight: 'bold' }}>
                Total Order Value: <span style={{ color: 'var(--accent)' }}>₹{selectedPurchase.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <button 
                className="btn-outline" 
                onClick={() => setSelectedPurchase(null)}
                style={{ padding: '8px 20px', fontSize: '13px' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Description Modal */}
      {editingPurchase && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '450px', margin: '20px' }}>
            <div className="card-head" style={{ borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>Edit Purchase Description</h3>
              <button 
                onClick={() => setEditingPurchase(null)}
                style={{ background: 'none', border: 'none', fontSize: '18px', color: '#888', cursor: 'pointer' }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  className="form-input" 
                  value={editDescription} 
                  onChange={(e) => setEditDescription(e.target.value)} 
                  placeholder="Enter purchase note..."
                  style={{ minHeight: '100px', padding: '10px' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn-outline" onClick={() => setEditingPurchase(null)} style={{ padding: '8px 16px', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px', background: 'var(--accent)', border: 'none' }}>Save Changes</button>
              </div>
            </form>
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
            background: toastType === 'success' ? '#28a745' : '#dc3545', 
            color: '#fff', 
            padding: '12px 24px', 
            borderRadius: '4px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 9999,
            fontSize: '14px',
            fontWeight: 500,
            transition: 'opacity 0.3s'
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
