'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddFranchisePage() {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger'>('success');

  // Form Fields State
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [referralId, setReferralId] = useState('');
  const [franchiseId, setFranchiseId] = useState('');
  const [store, setStore] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stateName, setStateName] = useState('');

  const triggerToast = (msg: string, type: 'success' | 'danger' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !ownerName || !mobile || !email || !password) {
      triggerToast('Please fill all required fields!', 'danger');
      return;
    }

    // Load existing franchises
    const saved = localStorage.getItem('swa_franchises');
    let franchisesList = [];
    if (saved) {
      franchisesList = JSON.parse(saved);
    } else {
      franchisesList = [
        { srNo: 1, ownerName: 'Auraa', ownerId: 'AF113880', franchiseName: 'Auraa Healthcare', sponsorName: 'Auraa', sponsorId: '7355205522', contact: '9100000000 / test@gmail.com', commission: 3061.90, date: '06-Feb-2026', status: true },
        { srNo: 2, ownerName: 'Rishikesh', ownerId: 'AF781000', franchiseName: 'Rishabh drug agency', sponsorName: 'Rishikesh', sponsorId: 'A471210', contact: '9100000000 / test@gmail.com', commission: 3061.90, date: '12-Feb-2026', status: true },
        { srNo: 3, ownerName: 'Santosh Thakur', ownerId: 'AF600526', franchiseName: 'Suhani Aurra mobile shopee', sponsorName: 'Santosh Thakur', sponsorId: 'ADMIN', contact: '9100000000 / test@gmail.com', commission: 0.00, date: '17-Mar-2026', status: false },
        { srNo: 4, ownerName: 'Aman kushwaha', ownerId: 'AF691440', franchiseName: 'Aman mobile shopee', sponsorName: 'Aman kushwaha', sponsorId: 'ADMIN', contact: '9100000000 / test@gmail.com', commission: 0.00, date: '17-Mar-2026', status: false },
        { srNo: 5, ownerName: 'Ravindra ji', ownerId: 'AF772253', franchiseName: 'Shiva enterprices', sponsorName: 'Ravindra ji', sponsorId: 'ADMIN', contact: '9100000000 / test@gmail.com', commission: 0.00, date: '17-Mar-2026', status: false }
      ];
    }

    const nextSrNo = franchisesList.length > 0 ? Math.max(...franchisesList.map((f: any) => f.srNo)) + 1 : 1;
    const randomIdNum = Math.floor(100000 + Math.random() * 900000);
    const newOwnerId = `AF${randomIdNum}`;

    const newFranchise = {
      srNo: nextSrNo,
      ownerName,
      ownerId: newOwnerId,
      franchiseName: businessName,
      sponsorName: ownerName,
      sponsorId: franchiseId || 'ADMIN',
      contact: `${mobile} / ${email}`,
      commission: 0.00,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-'),
      status: true
    };

    franchisesList.push(newFranchise);
    localStorage.setItem('swa_franchises', JSON.stringify(franchisesList));

    triggerToast('Franchise created successfully!');
    setTimeout(() => {
      router.push('/admin/franchise-list');
    }, 800);
  };

  return (
    <div className="content">
      {/* Header bar matches screenshot */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#333', margin: 0 }}>Add Franchise</h3>
        </div>
        <Link 
          href="/admin/franchise-list" 
          style={{ background: '#00c0ef', color: '#fff', border: 'none', borderRadius: '4px', padding: '6px 14px', fontSize: '12px', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px' }}
        >
          Franchise List
        </Link>
      </div>

      <div className="card" style={{ padding: '24px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
            
            {/* Distributor / Franchise Business Name */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: '500', color: '#333', fontSize: '13.5px', marginBottom: '8px' }}>Distributor / Franchise Business Name:</label>
              <div style={{ position: 'relative' }}>
                <i className="fa-solid fa-user" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#555', fontSize: '13px' }}></i>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter Franchise Name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  style={{ paddingLeft: '38px', height: '42px', fontSize: '13.5px' }}
                  required
                />
              </div>
            </div>

            {/* Owner Name */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: '500', color: '#333', fontSize: '13.5px', marginBottom: '8px' }}>Owner Name:</label>
              <div style={{ position: 'relative' }}>
                <i className="fa-solid fa-user" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#555', fontSize: '13px' }}></i>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter Owner Name"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  style={{ paddingLeft: '38px', height: '42px', fontSize: '13.5px' }}
                  required
                />
              </div>
            </div>

            {/* User Referral ID */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: '500', color: '#333', fontSize: '13.5px', marginBottom: '8px' }}>User Referral ID:</label>
              <div style={{ position: 'relative' }}>
                <i className="fa-solid fa-user" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#555', fontSize: '13px' }}></i>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter referral id"
                  value={referralId}
                  onChange={(e) => setReferralId(e.target.value)}
                  style={{ paddingLeft: '38px', height: '42px', fontSize: '13.5px' }}
                />
              </div>
            </div>

            {/* Franchise ID */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: '500', color: '#333', fontSize: '13.5px', marginBottom: '8px' }}>Franchise ID:</label>
              <div style={{ position: 'relative' }}>
                <i className="fa-solid fa-user" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#555', fontSize: '13px' }}></i>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter Sponsor id"
                  value={franchiseId}
                  onChange={(e) => setFranchiseId(e.target.value)}
                  style={{ paddingLeft: '38px', height: '42px', fontSize: '13.5px' }}
                />
              </div>
            </div>

            {/* Select Store */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: '500', color: '#333', fontSize: '13.5px', marginBottom: '8px' }}>Select Store:</label>
              <div style={{ position: 'relative' }}>
                <i className="fa-solid fa-user" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#555', fontSize: '13px' }}></i>
                <select 
                  className="form-select" 
                  value={store}
                  onChange={(e) => setStore(e.target.value)}
                  style={{ paddingLeft: '38px', height: '42px', fontSize: '13.5px', width: '100%' }}
                >
                  <option value="">--Select--</option>
                  <option value="Auraa Health Kart Store">Auraa Health Kart Store</option>
                  <option value="NEW SALASAR HERBOTECH Store">NEW SALASAR HERBOTECH Store</option>
                </select>
              </div>
            </div>

            {/* Mobile */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: '500', color: '#333', fontSize: '13.5px', marginBottom: '8px' }}>Mobile:</label>
              <div style={{ position: 'relative' }}>
                <i className="fa-solid fa-phone" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#555', fontSize: '13px' }}></i>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  style={{ paddingLeft: '38px', height: '42px', fontSize: '13.5px' }}
                  required
                />
              </div>
            </div>

            {/* Gender */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: '500', color: '#333', fontSize: '13.5px', marginBottom: '8px' }}>Gender:</label>
              <div style={{ position: 'relative' }}>
                <i className="fa-solid fa-user" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#555', fontSize: '13px' }}></i>
                <select 
                  className="form-select" 
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  style={{ paddingLeft: '38px', height: '42px', fontSize: '13.5px', width: '100%' }}
                >
                  <option value="">--Select Gender--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: '500', color: '#333', fontSize: '13.5px', marginBottom: '8px' }}>Email:</label>
              <div style={{ position: 'relative' }}>
                <i className="fa-solid fa-envelope" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#555', fontSize: '13px' }}></i>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '38px', height: '42px', fontSize: '13.5px' }}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: '500', color: '#333', fontSize: '13.5px', marginBottom: '8px' }}>Password:</label>
              <div style={{ position: 'relative' }}>
                <i className="fa-solid fa-envelope" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#555', fontSize: '13px' }}></i>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '38px', height: '42px', fontSize: '13.5px' }}
                  required
                />
              </div>
            </div>

            {/* State */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: '500', color: '#333', fontSize: '13.5px', marginBottom: '8px' }}>State:</label>
              <select 
                className="form-select" 
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                style={{ height: '42px', fontSize: '13.5px', width: '100%', border: '1px solid #ccc', borderRadius: '4px', background: '#fff' }}
              >
                <option value="">--Select State--</option>
                <option value="Delhi">Delhi</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Haryana">Haryana</option>
              </select>
            </div>

          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '36px' }}>
            <button 
              type="button" 
              className="btn-outline" 
              onClick={() => router.push('/admin/franchise-list')}
              style={{ padding: '10px 24px', fontSize: '14px' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary" 
              style={{ padding: '10px 30px', fontSize: '14px', background: 'var(--accent)', border: 'none' }}
            >
              Save Franchise
            </button>
          </div>

        </form>
      </div>

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
