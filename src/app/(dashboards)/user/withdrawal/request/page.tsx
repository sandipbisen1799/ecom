export default function WithdrawalRequestPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-900 rounded-xl p-6 text-white shadow-xl">
          <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-1">Available Balance</p>
          <h3 className="text-4xl font-black text-orange-500">₹14,250</h3>
          <p className="text-xs text-gray-400 mt-2">Ready to withdraw</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-center">
          <p className="text-gray-500 text-sm font-medium mb-1">Minimum Withdrawal: <span className="font-bold text-gray-900">₹500</span></p>
          <p className="text-gray-500 text-sm font-medium mb-1">Processing Fee: <span className="font-bold text-red-500">5% TDS + 5% Admin</span></p>
          <p className="text-gray-500 text-sm font-medium">Processing Time: <span className="font-bold text-gray-900">24-48 Working Hrs</span></p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900">Request Withdrawal</h2>
        </div>
        
        <form className="p-6 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Withdrawal Amount (₹)</label>
            <input type="number" placeholder="Enter amount to withdraw" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-lg font-semibold" />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Select Bank Account</label>
            <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between cursor-pointer hover:border-orange-500 transition">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <i className="fa-solid fa-building-columns"></i>
                </div>
                <div>
                  <p className="font-bold text-gray-900">HDFC Bank</p>
                  <p className="text-xs text-gray-500">A/C Ending in ****4567</p>
                </div>
              </div>
              <div className="w-5 h-5 rounded-full border-4 border-orange-500 bg-white"></div>
            </div>
          </div>
          
          <button type="button" className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-orange-500/30 transition flex justify-center items-center gap-2">
            <i className="fa-solid fa-paper-plane"></i> Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}