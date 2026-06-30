export default function FranchiseWithdrawalRequestPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-gray-900 rounded-xl p-8 text-white shadow-xl mb-8 flex justify-between items-center relative overflow-hidden">
        <i className="fa-solid fa-wallet absolute right-4 bottom-4 text-8xl opacity-10"></i>
        <div>
          <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-1">Franchise Wallet Balance</p>
          <h3 className="text-5xl font-black text-green-400">₹3,061.90</h3>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900">Request Withdrawal</h2>
        </div>
        
        <form className="p-6 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Amount to Withdraw (₹)</label>
            <input type="number" placeholder="Enter amount" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-lg font-semibold" />
            <p className="text-xs text-red-500 font-medium">* 5% TDS and 5% Admin Charge will be deducted.</p>
          </div>
          
          <button type="button" className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-bold text-lg hover:shadow-lg transition flex justify-center items-center gap-2">
            <i className="fa-solid fa-building-columns"></i> Request Bank Transfer
          </button>
        </form>
      </div>
    </div>
  );
}