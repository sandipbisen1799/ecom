'use client';
import { useState } from 'react';

interface CatalogProduct {
  name: string;
  bv: number;
  mrp: number;
  dp: number;
  stock: number;
}

interface CartItem {
  product: CatalogProduct;
  quantity: number;
}

export default function BillingPosPage() {
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger'>('success');
  
  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [userId, setUserId] = useState('');
  const [gstNo, setGstNo] = useState('');
  const [purchaseType, setPurchaseType] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('2026-06-30');
  const [paymentMethod, setPaymentMethod] = useState('');

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);

  // Seed Product Catalog
  const initialProducts: CatalogProduct[] = [
    { name: 'Aurglow Cream', bv: 0.9267, mrp: 1699, dp: 1019, stock: 1002 },
    { name: 'Aurclear Face Serum', bv: 0.3005, mrp: 551, dp: 331, stock: 924 },
    { name: 'Aurglow Face Pack', bv: 0.6327, mrp: 1160, dp: 696, stock: 919 },
    { name: 'Aurra Tejas', bv: 0.2509, mrp: 460, dp: 276, stock: 958 },
    { name: 'Aurratri Cream', bv: 0.217273, mrp: 399, dp: 239, stock: 975 },
    { name: 'Aurratri Serum', bv: 0.264545, mrp: 485, dp: 291, stock: 1052 },
  ];

  const triggerToast = (msg: string, type: 'success' | 'danger' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Add Product to Cart POS
  const handleAddToCart = (product: CatalogProduct) => {
    const existing = cart.find(item => item.product.name === product.name);
    if (existing) {
      if (existing.quantity >= product.stock) {
        triggerToast('Cannot exceed available stock quantity!', 'danger');
        return;
      }
      setCart(cart.map(item => 
        item.product.name === product.name 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    triggerToast(`Added ${product.name} to cart!`);
  };

  // Remove Item
  const handleRemoveFromCart = (productName: string) => {
    setCart(cart.filter(item => item.product.name !== productName));
  };

  // Quantity Change
  const handleQtyChange = (productName: string, qty: number) => {
    const item = cart.find(i => i.product.name === productName);
    if (!item) return;

    if (qty < 1) qty = 1;
    if (qty > item.product.stock) {
      qty = item.product.stock;
      triggerToast(`Quantity capped at maximum stock: ${item.product.stock}`, 'danger');
    }

    setCart(cart.map(i => 
      i.product.name === productName ? { ...i, quantity: qty } : i
    ));
  };

  // Search Filter
  const filteredProducts = initialProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Totals calculations
  const totalBv = cart.reduce((sum, item) => sum + (item.quantity * item.product.bv), 0);
  const totalDp = cart.reduce((sum, item) => sum + (item.quantity * item.product.dp), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      triggerToast('Please enter User ID!', 'danger');
      return;
    }
    if (cart.length === 0) {
      triggerToast('Cart is empty. Add products on the left!', 'danger');
      return;
    }
    if (!purchaseType || !paymentMethod) {
      triggerToast('Please fill out Purchase Type and Payment Method!', 'danger');
      return;
    }

    // Process checkout
    triggerToast(`Invoice successfully created for User ${userId}! Total: ₹${totalDp.toLocaleString('en-IN')}`);
    
    // Clear state
    setCart([]);
    setUserId('');
    setGstNo('');
    setPurchaseType('');
    setPaymentMethod('');
  };

  return (
    <div className="content">
      {/* 2-column layout POS matching screenshot */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Column: Product Catalog */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input 
            type="text" 
            placeholder="Search Product Name..." 
            className="form-input" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: '4px', fontSize: '13.5px' }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '550px', overflowY: 'auto', paddingRight: '4px' }}>
            {filteredProducts.map(p => (
              <div 
                key={p.name} 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', 
                  gap: '8px', 
                  alignItems: 'center', 
                  padding: '12px 10px', 
                  border: '1px solid #eee', 
                  borderRadius: '6px', 
                  background: '#fcfcfc',
                  fontSize: '12.5px' 
                }}
              >
                {/* Product & Action */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontWeight: '600', color: '#333' }}>{p.name}</span>
                  <button 
                    onClick={() => handleAddToCart(p)}
                    style={{ background: '#ffb300', color: '#fff', border: 'none', borderRadius: '4px', padding: '6px 8px', fontSize: '11px', cursor: 'pointer', fontWeight: 600, width: 'fit-content' }}
                  >
                    Add to Cart
                  </button>
                </div>
                
                {/* Business Value */}
                <div style={{ color: '#666', fontWeight: 500 }}>
                  <div>{p.bv.toFixed(4)}</div>
                  <small style={{ fontSize: '9px', color: '#999' }}>BV</small>
                </div>

                {/* MRP */}
                <div style={{ color: '#333' }}>
                  ₹ {p.mrp}
                </div>

                {/* DP */}
                <div style={{ fontWeight: 600, color: 'var(--accent)' }}>
                  ₹ {p.dp}
                </div>

                {/* Stock badge */}
                <div>
                  <span style={{ background: '#28a745', color: '#fff', fontSize: '10px', padding: '3px 6px', borderRadius: '4px', fontWeight: 'bold', display: 'inline-block', whiteSpace: 'nowrap' }}>
                    QTY: {p.stock}
                  </span>
                </div>

              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '24px', color: '#888' }}>
                No products match search criteria.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Cart and details form */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* User ID */}
            <div className="form-group">
              <label style={{ fontWeight: '600', color: '#555', fontSize: '13px' }}>*Enter User ID :</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Enter client ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>

            {/* GST Number */}
            <div className="form-group">
              <label style={{ fontWeight: '600', color: '#555', fontSize: '13px' }}>Gst Number:</label>
              <div style={{ position: 'relative' }}>
                <i className="fa-solid fa-envelope" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888', fontSize: '12px' }}></i>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter gst_no"
                  value={gstNo}
                  onChange={(e) => setGstNo(e.target.value)}
                  style={{ paddingLeft: '36px' }}
                />
              </div>
            </div>

            {/* Purchase Type */}
            <div className="form-group">
              <label style={{ fontWeight: '600', color: '#555', fontSize: '13px' }}>* Select Purchase</label>
              <select 
                className="form-select" 
                value={purchaseType}
                onChange={(e) => setPurchaseType(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', background: '#fff' }}
                required
              >
                <option value="">--Select--</option>
                <option value="Repurchase">Repurchase</option>
                <option value="Join Activation">Joining Activation</option>
              </select>
            </div>

            {/* Invoice Date */}
            <div className="form-group">
              <label style={{ fontWeight: '600', color: '#555', fontSize: '13px' }}>* Invoice Date</label>
              <input 
                type="date" 
                className="form-input" 
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                required
              />
            </div>

            {/* Payment Method */}
            <div className="form-group">
              <label style={{ fontWeight: '600', color: '#555', fontSize: '13px' }}>Select Payment Method</label>
              <select 
                className="form-select" 
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', background: '#fff' }}
                required
              >
                <option value="">--Select Method--</option>
                <option value="Cash">Cash</option>
                <option value="Online">Online Wallet</option>
                <option value="Bank">Bank Deposit</option>
              </select>
            </div>

            {/* Cart Items Table */}
            <div style={{ overflowX: 'auto', border: '1px solid #eee', borderRadius: '6px', marginTop: '10px' }}>
              <table className="data-table" style={{ width: '100%', minWidth: '500px', fontSize: '12px' }}>
                <thead>
                  <tr style={{ background: '#212529', color: '#fff' }}>
                    <th style={{ padding: '8px' }}>Sr.No.</th>
                    <th style={{ padding: '8px' }}>Product</th>
                    <th style={{ padding: '8px', width: '70px' }}>Qty</th>
                    <th style={{ padding: '8px' }}>Total BV</th>
                    <th style={{ padding: '8px' }}>MRP</th>
                    <th style={{ padding: '8px' }}>DP</th>
                    <th style={{ padding: '8px' }}>Total</th>
                    <th style={{ padding: '8px', textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, idx) => {
                    const rowBv = item.quantity * item.product.bv;
                    const rowTotal = item.quantity * item.product.dp;
                    return (
                      <tr key={item.product.name} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '8px' }}>{idx + 1}</td>
                        <td style={{ padding: '8px', fontWeight: '500' }}>{item.product.name}</td>
                        <td style={{ padding: '8px' }}>
                          <input 
                            type="number" 
                            value={item.quantity}
                            onChange={(e) => handleQtyChange(item.product.name, Number(e.target.value))}
                            min="1"
                            style={{ width: '50px', padding: '4px', border: '1px solid #ccc', borderRadius: '4px', textAlign: 'center' }}
                          />
                        </td>
                        <td style={{ padding: '8px' }}>{rowBv.toFixed(4)}</td>
                        <td style={{ padding: '8px' }}>₹{item.product.mrp}</td>
                        <td style={{ padding: '8px' }}>₹{item.product.dp}</td>
                        <td style={{ padding: '8px', fontWeight: 600 }}>₹{rowTotal}</td>
                        <td style={{ padding: '8px', textAlign: 'center' }}>
                          <button 
                            type="button"
                            onClick={() => handleRemoveFromCart(item.product.name)}
                            style={{ background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', width: '24px', height: '24px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {cart.length === 0 && (
                    <tr>
                      <td colSpan={8} style={{ textAlign: 'center', padding: '16px', color: '#888' }}>
                        No items added to invoice cart yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Summaries */}
            {cart.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: '#fcfcfc', border: '1px solid #eee', padding: '12px 14px', borderRadius: '6px', fontSize: '13px', marginTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Total BV:</span>
                  <span style={{ fontWeight: 'bold', color: '#0d6efd' }}>{totalBv.toFixed(4)} BV</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Grand Total DP:</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>₹{totalDp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            )}

            {/* Checkout Action */}
            <button 
              type="submit" 
              className="btn-primary" 
              style={{ width: '100%', padding: '12px', fontSize: '14px', background: 'var(--accent)', border: 'none', marginTop: '10px' }}
            >
              Submit Invoice
            </button>

          </form>

        </div>

      </div>

      {/* Toast Notification */}
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
