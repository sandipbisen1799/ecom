export default function MessagesPage() {
  const messages = [
    { id: 1, sender: 'Admin Support', subject: 'KYC Document Verified', date: '30 Jun 2026', read: false },
    { id: 2, sender: 'System', subject: 'Payout Processed Successfully', date: '16 Jun 2026', read: true },
    { id: 3, sender: 'Aurra Health', subject: 'New Product Launch: VitaDrops!', date: '05 Jun 2026', read: true },
    { id: 4, sender: 'Admin Support', subject: 'Welcome to Aurra Health Kart', date: '15 Mar 2026', read: true },
  ];

  return (
    <div className="p-6 h-[calc(100vh-80px)]">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full flex overflow-hidden">
        
        {/* Messages List (Left Pane) */}
        <div className="w-1/3 border-r border-gray-100 flex flex-col bg-gray-50/50">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
            <h2 className="text-lg font-semibold text-gray-900">Inbox</h2>
            <button className="text-orange-500 hover:text-orange-600 font-medium text-sm">Mark all read</button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {messages.map((m, idx) => (
              <div key={m.id} className={`p-4 border-b border-gray-100 cursor-pointer transition ${idx === 0 ? 'bg-orange-50/50 border-l-4 border-l-orange-500' : 'hover:bg-gray-50 border-l-4 border-l-transparent'}`}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`font-semibold text-sm ${!m.read ? 'text-gray-900' : 'text-gray-600'}`}>{m.sender}</h4>
                  <span className="text-xs text-gray-400">{m.date}</span>
                </div>
                <p className={`text-sm line-clamp-1 ${!m.read ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>{m.subject}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Message Content (Right Pane) */}
        <div className="w-2/3 flex flex-col bg-white">
          <div className="p-6 border-b border-gray-100 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">KYC Document Verified</h2>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">AS</div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Admin Support</p>
                  <p className="text-xs text-gray-500">to me • 30 Jun 2026, 10:45 AM</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition"><i className="fa-solid fa-reply"></i></button>
              <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition"><i className="fa-solid fa-trash"></i></button>
            </div>
          </div>
          
          <div className="p-8 flex-1 overflow-y-auto">
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>Dear Aurra Group,</p>
              <p>We are pleased to inform you that your recently submitted KYC documents (Aadhar Card and PAN Card) have been successfully verified by our compliance team.</p>
              <p>Your account status has now been upgraded to <strong>Fully Verified</strong>. You can now access all features of your dashboard, including initiating withdrawal requests directly to your registered bank account.</p>
              <p>If you have any questions, feel free to reply directly to this message or contact our support team.</p>
              <div className="mt-8 pt-4">
                <p className="font-semibold">Best regards,</p>
                <p>Compliance Team<br/>Aurra Health Kart</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <div className="relative">
              <input type="text" placeholder="Reply to this message..." className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-orange-500 hover:bg-orange-50 rounded-md transition">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}