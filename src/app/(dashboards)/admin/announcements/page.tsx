'use client';
import { useState } from 'react';

const initialAnnouncements = [
  { id: 1, title: 'New Product Launch - Immunity Plus', msg: 'We are thrilled to launch the new Immunity Plus Capsules today. Get up to 50 BV per purchase. Spread the word to your networks now!', priority: 'Important', target: 'All Members', date: '2 hours ago' },
  { id: 2, title: 'Monthly Payout Processed', msg: 'All pending wallet withdrawals submitted up to 25 Jun 2025 have been cleared and successfully transferred to your respective Bank accounts and UPI handles.', priority: 'Normal', target: 'All Members', date: '1 day ago' },
  { id: 3, title: 'Scheduled System Maintenance Notice', msg: 'Aurra Health Kart MLM dashboard web portal will undergo regular security and database structure maintenance on Sunday 05 Jul 2025 from 02:00 AM to 04:00 AM IST.', priority: 'Urgent', target: 'All Members', date: '2 days ago' },
  { id: 4, title: 'Franchise Partner Meeting Scheduled', msg: 'All district and city level franchise owners are requested to attend the monthly Zoom sync on 02 Jul 2025 at 04:00 PM to align on inventory requests.', priority: 'Important', target: 'Franchises', date: '3 days ago' },
  { id: 5, title: 'Updated Downline Commission Structure', msg: 'Please review the updated Level Income distributions (Level 1-7 matching BV %) now visible inside the Settings tab of your portals.', priority: 'Normal', target: 'All Members', date: '5 days ago' },
];

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [target, setTarget] = useState('All Members');
  const [priority, setPriority] = useState('Normal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;

    const newAnn = {
      id: Date.now(),
      title,
      msg: message,
      priority,
      target,
      date: 'Just now',
    };

    setAnnouncements([newAnn, ...announcements]);
    setTitle('');
    setMessage('');
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setAnnouncements(announcements.filter(ann => ann.id !== id));
  };

  return (
    <div className="content">
      {/* PAGE HEADER */}
      <div className="page-header">
        <h3>Announcements Panel</h3>
        <div className="page-actions">
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            <i className={`fa-solid ${showForm ? 'fa-xmark' : 'fa-plus'}`}></i> {showForm ? 'Close Form' : 'Publish Announcement'}
          </button>
        </div>
      </div>

      {/* PUBLISH FORM */}
      {showForm && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-head">
            <h3>Publish New Notice</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Announcement Title</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Enter title here..." 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Message Content</label>
              <textarea 
                className="form-input" 
                placeholder="Type your notice description here..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Target Audience</label>
                <select className="form-select" value={target} onChange={(e) => setTarget(e.target.value)}>
                  <option value="All Members">All Members</option>
                  <option value="Users Only">Users Only</option>
                  <option value="Franchises">Franchises Only</option>
                  <option value="Admins Only">Admins Only</option>
                </select>
              </div>
              <div className="form-group">
                <label>Priority Level</label>
                <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="Normal">Normal</option>
                  <option value="Important">Important</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>
            <div className="page-actions" style={{ marginTop: '16px', justifyContent: 'flex-end' }}>
              <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="btn-primary">Publish Now</button>
            </div>
          </form>
        </div>
      )}

      {/* ANNOUNCEMENT CARDS LIST */}
      <div>
        {announcements.map((ann) => (
          <div className="announce-card" key={ann.id}>
            <div className="ann-header">
              <h4 className="ann-title">{ann.title}</h4>
              <span className={`priority-badge priority-${ann.priority.toLowerCase()}`}>
                {ann.priority}
              </span>
            </div>
            <div className="ann-body">
              <p>{ann.msg}</p>
            </div>
            <div className="ann-footer">
              <div style={{ display: 'flex', gap: '8px' }}>
                <span className="ann-target"><i className="fa-solid fa-users"></i> {ann.target}</span>
                <span><i className="fa-solid fa-clock"></i> {ann.date}</span>
              </div>
              <div className="action-btns">
                <button className="act-btn" title="Edit"><i className="fa-solid fa-pen"></i></button>
                <button className="act-btn danger" onClick={() => handleDelete(ann.id)} title="Delete Notice"><i className="fa-solid fa-trash"></i></button>
              </div>
            </div>
          </div>
        ))}
        {announcements.length === 0 && (
          <div className="card" style={{ padding: '24px', textAlign: 'center', color: 'var(--muted)' }}>
            No announcements available. Publish one above!
          </div>
        )}
      </div>
    </div>
  );
}
