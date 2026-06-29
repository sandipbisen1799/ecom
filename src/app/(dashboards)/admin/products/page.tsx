'use client';
import { useState } from 'react';

const initialProducts = [
  { emoji: '🌿', name: 'Immunity Booster Capsules', sku: 'AHK-IM-01', category: 'Immunity', price: 599, mrp: 749, stock: 120, bv: 50, status: 'In Stock' },
  { emoji: '🌸', name: 'Glow Face Serum', sku: 'AHK-SK-05', category: 'Skincare', price: 849, mrp: 999, stock: 18, bv: 70, status: 'Low Stock' },
  { emoji: '🥤', name: 'Protein Shake (Chocolate)', sku: 'AHK-NU-08', category: 'Nutrition', price: 1249, mrp: 1649, stock: 150, bv: 100, status: 'In Stock' },
  { emoji: '💊', name: 'Ashwagandha Capsules', sku: 'AHK-AY-02', category: 'Health', price: 379, mrp: 449, stock: 24, bv: 30, status: 'Low Stock' },
  { emoji: '🍯', name: 'Wild Forest Honey', sku: 'AHK-NU-11', category: 'Nutrition', price: 699, mrp: 799, stock: 0, bv: 55, status: 'Out of Stock' },
  { emoji: '🍃', name: 'Neem Capsules', sku: 'AHK-AY-05', category: 'Health', price: 299, mrp: 349, stock: 85, bv: 25, status: 'In Stock' },
  { emoji: '🧴', name: 'Aloe Vera Gel', sku: 'AHK-SK-12', category: 'Skincare', price: 199, mrp: 249, stock: 0, bv: 15, status: 'Out of Stock' },
  { emoji: '💧', name: 'Kids Immunity Drops', sku: 'AHK-IM-04', category: 'Immunity', price: 449, mrp: 649, stock: 210, bv: 40, status: 'In Stock' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="content">
      {/* STAT CARDS */}
      <div className="stats-row">
        <div className="stat-card green">
          <div className="stat-icon"><i className="fa-solid fa-box"></i></div>
          <div className="stat-num">48</div>
          <div className="stat-label">Total Products</div>
          <div className="stat-change up"><i className="fa-solid fa-check"></i> Catalog active</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-icon"><i className="fa-solid fa-boxes-stacked"></i></div>
          <div className="stat-num">42</div>
          <div className="stat-label">In Stock</div>
          <div className="stat-change up"><i className="fa-solid fa-circle-check"></i> Healthy supply</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon"><i className="fa-solid fa-triangle-exclamation"></i></div>
          <div className="stat-num">6</div>
          <div className="stat-label">Out of Stock</div>
          <div className="stat-change down"><i className="fa-solid fa-arrow-trend-up"></i> Needs reorder</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon"><i className="fa-solid fa-list"></i></div>
          <div className="stat-num">8</div>
          <div className="stat-label">Categories</div>
          <div className="stat-change up"><i className="fa-solid fa-plus"></i> Standard categories</div>
        </div>
      </div>

      {/* PRODUCTS DIRECTORY */}
      <div className="card">
        <div className="page-header">
          <h3>Product Catalog</h3>
          <div className="page-actions">
            <button className="btn-primary"><i className="fa-solid fa-plus"></i> Add New Product</button>
            <button className="btn-outline"><i className="fa-solid fa-download"></i> Export Catalog</button>
          </div>
        </div>

        <div className="filter-bar">
          <input 
            type="text" 
            placeholder="Search by SKU or product name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Health">Health</option>
            <option value="Skincare">Skincare</option>
            <option value="Nutrition">Nutrition</option>
            <option value="Immunity">Immunity</option>
          </select>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>MRP (₹)</th>
              <th>Stock</th>
              <th>BV</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.sku}>
                <td>
                  <div className="product-thumb">{product.emoji}</div>
                </td>
                <td style={{ fontWeight: '600' }}>{product.name}</td>
                <td>{product.sku}</td>
                <td>{product.category}</td>
                <td style={{ fontWeight: '600' }}>₹{product.price}</td>
                <td style={{ textDecoration: 'line-through', color: 'var(--muted)' }}>₹{product.mrp}</td>
                <td>{product.stock}</td>
                <td style={{ fontWeight: '600', color: 'var(--accent)' }}>{product.bv} BV</td>
                <td>
                  <span className={`status-pill status-${product.status === 'In Stock' ? 'good' : product.status === 'Low Stock' ? 'low' : 'critical'}`}>
                    {product.status}
                  </span>
                </td>
                <td>
                  <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                    <button className="act-btn" title="View Details"><i className="fa-solid fa-eye"></i></button>
                    <button className="act-btn" title="Edit Product"><i className="fa-solid fa-pen"></i></button>
                    <button className="act-btn danger" title="Delete Product"><i className="fa-solid fa-trash"></i></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={10} style={{ textAlign: 'center', padding: '24px', color: 'var(--muted)' }}>
                  No products found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <div className="pagination-info">
            Showing 1-{filteredProducts.length} of {filteredProducts.length} products
          </div>
          <div className="pagination-btns">
            <button className="pg-btn" disabled><i className="fa-solid fa-chevron-left"></i></button>
            <button className="pg-btn active">1</button>
            <button className="pg-btn" disabled><i className="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
}
