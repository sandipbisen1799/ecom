'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  mrp: number;
  stock: number;
}

interface Batch {
  id: string;
  name: string;
  expiryDate: string;
}

interface PurchaseRow {
  productId: string;
  stock: number;
  mrp: number;
  quantity: number;
  rate: number;
  gstPercent: number;
  gstAmount: number;
  totalWithGst: number;
}

export default function AddPurchasePage() {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger'>('success');

  // Seed Data
  const products: Product[] = [
    { id: 249, name: 'Aurglow Cream', mrp: 250, stock: 120 },
    { id: 250, name: 'Aurclear Face Serum', mrp: 320, stock: 80 },
    { id: 251, name: 'Aurglow Face Pack', mrp: 150, stock: 200 },
    { id: 252, name: 'Aurra Tejas', mrp: 450, stock: 50 },
    { id: 253, name: 'Aurratri Cream', mrp: 280, stock: 110 },
    { id: 254, name: 'Aurratri Serum', mrp: 350, stock: 90 },
    { id: 255, name: 'Aurglow Facewash', mrp: 180, stock: 150 },
    { id: 256, name: 'Aurra Foot Cream', mrp: 160, stock: 70 },
  ];

  // State
  const [supplierId, setSupplierId] = useState('');
  const [batchId, setBatchId] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('2026-06-29');
  const [description, setDescription] = useState('');
  
  const [batches, setBatches] = useState<Batch[]>([]);
  const [rows, setRows] = useState<PurchaseRow[]>([
    { productId: '', stock: 0, mrp: 0, quantity: 1, rate: 0, gstPercent: 0, gstAmount: 0, totalWithGst: 0 }
  ]);

  // Modal State for Add Batch
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [newBatchName, setNewBatchName] = useState('');
  const [newBatchExpiry, setNewBatchExpiry] = useState('');

  // Initial Load
  useEffect(() => {
    // Initial Batches from localStorage or seed
    const savedBatches = localStorage.getItem('swa_batches');
    if (savedBatches) {
      setBatches(JSON.parse(savedBatches));
    } else {
      const initial = [
        { id: 'b1', name: 'BAT-2026-01', expiryDate: '2028-12-31' },
        { id: 'b2', name: 'BAT-2026-02', expiryDate: '2029-06-30' },
      ];
      setBatches(initial);
      localStorage.setItem('swa_batches', JSON.stringify(initial));
    }
  }, []);

  const triggerToast = (msg: string, type: 'success' | 'danger' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Sync expiry date when batch selection changes
  const handleBatchChange = (id: string) => {
    setBatchId(id);
    const selected = batches.find(b => b.id === id);
    if (selected) {
      setExpiryDate(selected.expiryDate);
    } else {
      setExpiryDate('');
    }
  };

  // Handle Add Batch Submission
  const handleAddBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatchName || !newBatchExpiry) {
      triggerToast('Please fill all batch details', 'danger');
      return;
    }

    const newBatch: Batch = {
      id: 'b_' + Date.now(),
      name: newBatchName,
      expiryDate: newBatchExpiry
    };

    const updated = [...batches, newBatch];
    setBatches(updated);
    localStorage.setItem('swa_batches', JSON.stringify(updated));

    // Auto select new batch
    setBatchId(newBatch.id);
    setExpiryDate(newBatch.expiryDate);

    // Reset Form
    setNewBatchName('');
    setNewBatchExpiry('');
    setShowBatchModal(false);
    triggerToast('Batch added successfully!');
  };

  // Row Manipulation
  const handleRowChange = (index: number, field: keyof PurchaseRow, value: any) => {
    const updated = [...rows];
    const row = updated[index];

    if (field === 'productId') {
      const prodId = value;
      row.productId = prodId;
      const product = products.find(p => p.id === Number(prodId));
      if (product) {
        row.mrp = product.mrp;
        row.stock = product.stock;
      } else {
        row.mrp = 0;
        row.stock = 0;
      }
    } else {
      (row as any)[field] = value;
    }

    // Calculations
    const qty = Number(row.quantity) || 0;
    const rate = Number(row.rate) || 0;
    const gstPercent = Number(row.gstPercent) || 0;

    const baseAmount = qty * rate;
    const gstAmt = baseAmount * (gstPercent / 100);
    row.gstAmount = Number(gstAmt.toFixed(2));
    row.totalWithGst = Number((baseAmount + gstAmt).toFixed(2));

    setRows(updated);
  };

  const handleAddRow = () => {
    setRows([...rows, { productId: '', stock: 0, mrp: 0, quantity: 1, rate: 0, gstPercent: 0, gstAmount: 0, totalWithGst: 0 }]);
  };

  const handleRemoveRow = (index: number) => {
    if (rows.length === 1) {
      triggerToast('At least one item row is required', 'danger');
      return;
    }
    setRows(rows.filter((_, i) => i !== index));
  };

  // Grand Total Calculation
  const grandTotal = rows.reduce((sum, row) => sum + (row.totalWithGst || 0), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplierId || !batchId || !purchaseDate) {
      triggerToast('Please select Supplier, Batch and Dates', 'danger');
      return;
    }

    // Check if any product is unselected
    const hasUnselected = rows.some(r => !r.productId || r.rate <= 0);
    if (hasUnselected) {
      triggerToast('Please select valid products and rates for all rows', 'danger');
      return;
    }

    // Get Supplier Name
    const suppliers: Record<string, string> = {
      '5': 'NEW SALASAR HERBOTECH',
      '6': 'RSA HERBAL PHARMACEUTICALS PVT LTD'
    };
    const supplierName = suppliers[supplierId] || 'Unknown Supplier';

    // Retrieve purchases database
    const saved = localStorage.getItem('swa_purchases');
    let purchaseList = [];
    if (saved) {
      purchaseList = JSON.parse(saved);
    } else {
      purchaseList = [
        { srNo: 1, supplierName: 'RSA HERBAL PHARMACEUTICALS PVT LTD', totalAmount: 1015434.00, billNo: 'PUR-000004', description: '-', date: '21-Feb-2026 04:40 PM', items: [] },
        { srNo: 2, supplierName: 'NEW SALASAR HERBOTECH', totalAmount: 707353.50, billNo: 'PUR-000003', description: 'goods', date: '17-Feb-2026 12:06 PM', items: [] },
        { srNo: 3, supplierName: 'NEW SALASAR HERBOTECH', totalAmount: 1576783.95, billNo: 'PUR-000002', description: '-', date: '29-Jan-2026 02:13 PM', items: [] },
        { srNo: 4, supplierName: 'NEW SALASAR HERBOTECH', totalAmount: 483512.40, billNo: 'PUR-000001', description: '-', date: '24-Jan-2026 12:32 PM', items: [] },
      ];
    }

    const nextSrNo = purchaseList.length > 0 ? Math.max(...purchaseList.map((p: any) => p.srNo)) + 1 : 1;
    const billNo = `PUR-00000${nextSrNo}`;

    // Itemized details to save
    const items = rows.map(r => {
      const prod = products.find(p => p.id === Number(r.productId));
      return {
        productName: prod ? prod.name : 'Unknown Product',
        mrp: r.mrp,
        quantity: r.quantity,
        rate: r.rate,
        gstPercent: r.gstPercent,
        total: r.totalWithGst
      };
    });

    const newPurchase = {
      srNo: nextSrNo,
      supplierName,
      totalAmount: grandTotal,
      billNo,
      description: description || '-',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      items
    };

    purchaseList.unshift(newPurchase); // Add to top of list
    localStorage.setItem('swa_purchases', JSON.stringify(purchaseList));

    triggerToast('Purchase saved successfully!');
    setTimeout(() => {
      router.push('/admin/purchase-list');
    }, 800);
  };

  return (
    <div className="content">
      {/* Top Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#333' }}>Add Purchase</h3>
        <Link 
          href="/admin/purchase-list" 
          style={{ background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}
        >
          <i className="fa-solid fa-list"></i> Purchase List
        </Link>
      </div>

      {/* Main Form Block */}
      <div className="card">
        <form onSubmit={handleSubmit}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            
            {/* Supplier Selection */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: '600', color: '#555' }}>Supplier *</label>
              <select 
                className="form-select" 
                value={supplierId} 
                onChange={(e) => setSupplierId(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #ccc', borderRadius: '4px' }}
                required
              >
                <option value="">Select Supplier</option>
                <option value="5">NEW SALASAR HERBOTECH</option>
                <option value="6">RSA HERBAL PHARMACEUTICALS PVT LTD</option>
              </select>
            </div>

            {/* Batch Number & Add Batch */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="form-label" style={{ fontWeight: '600', color: '#555', margin: 0 }}>Batch Number *</label>
                <button 
                  type="button" 
                  onClick={() => setShowBatchModal(true)}
                  style={{ background: 'none', border: 'none', color: '#0d6efd', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <i className="fa-solid fa-plus-circle"></i> Add Batch
                </button>
              </div>
              <select 
                className="form-select" 
                value={batchId} 
                onChange={(e) => handleBatchChange(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #ccc', borderRadius: '4px' }}
                required
              >
                <option value="">Select Batch</option>
                {batches.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

            {/* Expiry Date */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: '600', color: '#555' }}>Expiry Date *</label>
              <input 
                type="date" 
                className="form-input" 
                value={expiryDate} 
                onChange={(e) => setExpiryDate(e.target.value)}
                style={{ padding: '8px 12px' }}
                required
              />
            </div>

            {/* Purchase Date */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: '600', color: '#555' }}>Purchase Date *</label>
              <input 
                type="date" 
                className="form-input" 
                value={purchaseDate} 
                onChange={(e) => setPurchaseDate(e.target.value)}
                style={{ padding: '8px 12px' }}
                required
              />
            </div>

          </div>

          {/* Description */}
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label" style={{ fontWeight: '600', color: '#555' }}>Description</label>
            <textarea 
              className="form-input" 
              placeholder="Enter purchase details..." 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ minHeight: '80px', padding: '10px 12px' }}
            />
          </div>

          {/* Items Table */}
          <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
            <table className="data-table" style={{ width: '100%', minWidth: '950px' }}>
              <thead>
                <tr>
                  <th style={{ width: '22%' }}>Product</th>
                  <th style={{ width: '9%' }}>Stock</th>
                  <th style={{ width: '9%' }}>MRP</th>
                  <th style={{ width: '9%' }}>Qty</th>
                  <th style={{ width: '11%' }}>Cost Price</th>
                  <th style={{ width: '11%' }}>GST %</th>
                  <th style={{ width: '11%' }}>GST Amount</th>
                  <th style={{ width: '11%' }}>Total</th>
                  <th style={{ width: '7%', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <select 
                        value={row.productId} 
                        onChange={(e) => handleRowChange(index, 'productId', e.target.value)}
                        style={{ width: '100%', padding: '6px 10px', border: '1px solid #ccc', borderRadius: '4px', background: '#fff' }}
                      >
                        <option value="">Select Product</option>
                        {products.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input 
                        type="number" 
                        className="form-input" 
                        value={row.stock || ''} 
                        readOnly 
                        style={{ padding: '6px 10px', background: '#f5f5f5', textAlign: 'center' }} 
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        className="form-input" 
                        value={row.mrp || ''} 
                        readOnly 
                        style={{ padding: '6px 10px', background: '#f5f5f5', textAlign: 'center' }} 
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        className="form-input" 
                        min="1" 
                        value={row.quantity} 
                        onChange={(e) => handleRowChange(index, 'quantity', Number(e.target.value))}
                        style={{ padding: '6px 10px', textAlign: 'center' }} 
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        className="form-input" 
                        step="0.01" 
                        placeholder="0.00"
                        value={row.rate || ''} 
                        onChange={(e) => handleRowChange(index, 'rate', Number(e.target.value))}
                        style={{ padding: '6px 10px' }} 
                      />
                    </td>
                    <td>
                      <select 
                        value={row.gstPercent} 
                        onChange={(e) => handleRowChange(index, 'gstPercent', Number(e.target.value))}
                        style={{ width: '100%', padding: '6px 10px', border: '1px solid #ccc', borderRadius: '4px', background: '#fff' }}
                      >
                        <option value={0}>0%</option>
                        <option value={5}>5%</option>
                        <option value={18}>18%</option>
                        <option value={28}>28%</option>
                      </select>
                    </td>
                    <td>
                      <input 
                        type="number" 
                        className="form-input" 
                        value={row.gstAmount || ''} 
                        readOnly 
                        style={{ padding: '6px 10px', background: '#f5f5f5' }} 
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        className="form-input" 
                        value={row.totalWithGst || ''} 
                        readOnly 
                        style={{ padding: '6px 10px', background: '#f5f5f5' }} 
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button 
                        type="button" 
                        className="btn-action-delete" 
                        title="Remove row" 
                        onClick={() => handleRemoveRow(index)}
                        style={{ height: '32px', width: '60px', background: '#dc3545', color: '#fff', borderRadius: '4px', border: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                      >
                        Close
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Grand Total & Action row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <button 
              type="button" 
              className="btn-outline" 
              onClick={handleAddRow}
              style={{ padding: '8px 18px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <i className="fa-solid fa-plus"></i> Add Product Row
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontWeight: '600', color: '#333' }}>Grand Total:</span>
              <input 
                type="text" 
                className="form-input" 
                value={`₹ ${grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`} 
                readOnly 
                style={{ width: '180px', padding: '8px 12px', background: '#f8f9fa', fontWeight: 'bold', fontSize: '15px', border: '1px solid #ddd', textAlign: 'right' }} 
              />
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '28px' }}>
            <button 
              type="button" 
              className="btn-outline" 
              onClick={() => router.push('/admin/purchase-list')}
              style={{ padding: '10px 24px', fontSize: '14px' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary" 
              style={{ padding: '10px 30px', fontSize: '14px', background: 'var(--accent)', border: 'none' }}
            >
              Submit Order
            </button>
          </div>

        </form>
      </div>

      {/* Add Batch Modal */}
      {showBatchModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '400px', margin: '20px' }}>
            <div className="card-head" style={{ borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>Create New Batch</h3>
              <button 
                onClick={() => setShowBatchModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '18px', color: '#888', cursor: 'pointer' }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form onSubmit={handleAddBatch}>
              <div className="form-group">
                <label>Batch Name/Number *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. BAT-2026-03"
                  value={newBatchName} 
                  onChange={(e) => setNewBatchName(e.target.value)} 
                  required
                />
              </div>
              <div className="form-group" style={{ marginTop: '14px' }}>
                <label>Expiry Date *</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={newBatchExpiry} 
                  onChange={(e) => setNewBatchExpiry(e.target.value)} 
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="btn-outline" onClick={() => setShowBatchModal(false)} style={{ padding: '8px 16px', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px', background: '#0d6efd', border: 'none' }}>Save Batch</button>
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
