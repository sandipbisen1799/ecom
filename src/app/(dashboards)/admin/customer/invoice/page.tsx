'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BillingInvoicePage() {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState('');

  const handlePrint = () => {
    setToastMessage('🖨️ Initializing PDF export print dialog...');
    setTimeout(() => {
      window.print();
      setToastMessage('');
    }, 1000);
  };

  return (
    <div className="content" style={{ padding: '20px 0' }}>
      
      {/* Printable Invoice Container */}
      <div 
        id="printable-invoice"
        style={{ 
          background: '#fff', 
          border: '4px double #333', 
          padding: '30px', 
          maxWidth: '850px', 
          margin: '0 auto', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}
      >
        {/* Logo and Company Details Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '20px', alignItems: 'start', borderBottom: '1px solid #ddd', paddingBottom: '20px' }}>
          
          {/* Logo block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Simulated SWA logo styling */}
              <span style={{ fontSize: '38px', fontWeight: 900, color: '#f36f21', letterSpacing: '-1px', display: 'flex', alignItems: 'center' }}>
                S<span style={{ color: '#0056b3' }}>W</span>A
              </span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#555', borderLeft: '1px solid #ccc', paddingLeft: '8px', lineHeight: '1.2' }}>
                MLM<br />SOFTWARE
              </span>
            </div>
            <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', margin: '14px 0 0 0', letterSpacing: '0.5px' }}>Billing Invoice</h4>
          </div>

          {/* Company Details Block */}
          <div style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '12px 16px', fontSize: '12.5px', color: '#444', lineHeight: '1.5' }}>
            <strong style={{ fontSize: '13.5px', color: '#000', display: 'block', marginBottom: '6px' }}>Company Details:</strong>
            <strong>Company Name:</strong> Swa Ecommerce<br />
            <strong>Registered Address:</strong> Lucknow uttar pradesh Lucknow Uttar Pradesh 226030<br />
            <strong>GSTIN:</strong> <br />
            <strong>Whatsapp No:</strong> 9100000000<br />
            <strong>Email:</strong> swaecommerce@gmail.com
          </div>

        </div>

        {/* Invoice Meta information columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', padding: '20px 0', fontSize: '13px', color: '#444', borderBottom: '1px solid #ddd', lineHeight: '1.6' }}>
          
          {/* Left: Invoice attributes */}
          <div>
            <strong>Invoice No:</strong> AHKO-000001<br />
            <strong>Invoice Date:</strong> 23/01/2026<br />
            <strong>Amount to be collected:</strong> ₹1,019.37<br />
            <strong>Shipping Charge:</strong> ₹0.00<br />
            <strong>Payment Method:</strong> Cash On Delivery
          </div>

          {/* Right: Shipped To details */}
          <div>
            <strong>Shipped To:</strong> faiz<br />
            <strong>Mobile:</strong> 8090389688<br />
            <strong>Address:</strong> 49, Lucknow, Uttar Pradesh - 226030<br />
            <strong>Landmark:</strong> lulu<br />
            <strong>Alternate Number:</strong> Not provided
          </div>

        </div>

        {/* Invoice Itemized products table */}
        <div style={{ margin: '20px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
                <th style={{ padding: '10px' }}>Product</th>
                <th style={{ padding: '10px' }}>HSN Code</th>
                <th style={{ padding: '10px' }}>Total Qty</th>
                <th style={{ padding: '10px' }}>MRP (Qty)</th>
                <th style={{ padding: '10px' }}>Total Amount</th>
                <th style={{ padding: '10px' }}>Total Tax</th>
                <th style={{ padding: '10px' }}>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px 10px', fontWeight: '500' }}>Aurglow Cream</td>
                <td style={{ padding: '12px 10px', color: '#666' }}>HSN001</td>
                <td style={{ padding: '12px 10px' }}>1</td>
                <td style={{ padding: '12px 10px' }}>₹1,699.00</td>
                <td style={{ padding: '12px 10px' }}>₹1,019.00</td>
                <td style={{ padding: '12px 10px' }}>₹0</td>
                <td style={{ padding: '12px 10px', fontWeight: '600' }}>₹1,019.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', fontSize: '13px', borderTop: '1px solid #eee', paddingTop: '14px', marginRight: '10px' }}>
          <div style={{ color: '#666' }}>Shipping Charge: ₹0.00</div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#000' }}>
            Total: ₹1,019.37
          </div>
        </div>

        {/* Signature Line */}
        <div style={{ marginTop: '60px', display: 'flex', flexDirection: 'column', width: '200px', fontSize: '13px', color: '#555' }}>
          <span style={{ borderBottom: '1px dotted #888', height: '24px', marginBottom: '6px' }}></span>
          <span style={{ fontStyle: 'italic', fontSize: '11px', textAlign: 'center' }}>Authorised Signatory</span>
        </div>

      </div>

      {/* Action Buttons Container */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '28px' }}>
        <button 
          onClick={() => router.back()}
          style={{ background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 24px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
        >
          Back
        </button>
        <button 
          onClick={handlePrint}
          style={{ background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 24px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
        >
          Download PDF
        </button>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div 
          style={{ 
            position: 'fixed', 
            bottom: '24px', 
            right: '24px', 
            background: '#ffc107', 
            color: '#000', 
            padding: '12px 24px', 
            borderRadius: '4px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 9999,
            fontSize: '14px',
            fontWeight: 600
          }}
        >
          {toastMessage}
        </div>
      )}
      
      {/* Printable CSS adjustments */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-invoice, #printable-invoice * {
            visibility: visible;
          }
          #printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none;
            box-shadow: none;
            padding: 0;
          }
        }
      `}</style>

    </div>
  );
}
