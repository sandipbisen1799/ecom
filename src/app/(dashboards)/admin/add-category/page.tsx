'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger'>('success');

  const triggerToast = (msg: string, type: 'success' | 'danger' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      triggerToast('Please enter category name!', 'danger');
      return;
    }

    // Read existing categories from localStorage
    const saved = localStorage.getItem('swa_categories');
    let categoriesList = [];
    if (saved) {
      categoriesList = JSON.parse(saved);
    } else {
      // Default initial categories list if empty
      categoriesList = [
        { srNo: 1, name: 'Skin Care', date: '18-Mar-2024', timestamp: '2024-03-18 05:05:07', status: true, image: '🌸' },
        { srNo: 2, name: 'Hair Care', date: '18-Mar-2024', timestamp: '2024-03-18 05:05:51', status: true, image: '🌿' },
        { srNo: 3, name: 'Energy & Fitness', date: '25-Mar-2024', timestamp: '2024-03-25 15:38:09', status: true, image: '🥤' },
        { srNo: 4, name: 'Ayurveda', date: '09-Sep-2024', timestamp: '2024-09-09 05:09:31', status: true, image: '🍯' },
        { srNo: 5, name: 'Face Care', date: '07-Nov-2025', timestamp: '2025-11-07 11:26:38', status: true, image: '🧴' },
      ];
    }

    const nextSrNo = categoriesList.length > 0 ? Math.max(...categoriesList.map((c: any) => c.srNo)) + 1 : 1;
    
    // Add the new category
    const newCategory = {
      srNo: nextSrNo,
      name,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-'),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: true,
      image: imagePreview || '📦' // Use preview URL as image source or default emoji
    };

    categoriesList.push(newCategory);
    localStorage.setItem('swa_categories', JSON.stringify(categoriesList));

    triggerToast('Category added successfully!');
    setTimeout(() => {
      router.push('/admin/category-list');
    }, 800);
  };

  return (
    <div className="content">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card-head" style={{ borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#333' }}>Add Category</h3>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Image Input */}
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: '600', color: '#555', marginBottom: '8px', display: 'block' }}>Image:</label>
            <input 
              type="file" 
              className="form-input" 
              accept="image/*"
              onChange={handleImageChange}
              style={{ padding: '8px' }}
            />
            {imagePreview && (
              <div style={{ marginTop: '14px', textAlign: 'center' }}>
                <span style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '6px' }}>Image Preview:</span>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  style={{ maxWidth: '180px', maxHeight: '180px', borderRadius: '8px', border: '1px solid #ccc', objectFit: 'contain' }}
                />
              </div>
            )}
          </div>

          {/* Name Input */}
          <div className="form-group" style={{ marginTop: '20px' }}>
            <label className="form-label" style={{ fontWeight: '600', color: '#555', marginBottom: '8px', display: 'block' }}>Name:</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Enter category name"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
            />
          </div>

          {/* Submit Action */}
          <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button 
              type="button" 
              className="btn-outline" 
              onClick={() => router.push('/admin/category-list')}
              style={{ padding: '8px 20px', fontSize: '13px' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary" 
              style={{ padding: '8px 24px', fontSize: '13px', background: 'var(--accent)', border: 'none' }}
            >
              Submit
            </button>
          </div>
        </form>
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
