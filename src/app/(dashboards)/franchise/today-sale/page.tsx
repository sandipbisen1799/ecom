export default function TodaySalePage() {
  return (
    <div className="p-6">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-md mb-6 flex justify-between items-center">
        <div>
          <p className="text-green-100 text-sm font-semibold uppercase tracking-wider mb-1">Today's Total Sale</p>
          <h2 className="text-3xl font-bold">₹0.00</h2>
        </div>
        <div className="text-right">
          <p className="text-green-100 text-sm font-semibold uppercase tracking-wider mb-1">Total Invoices</p>
          <h2 className="text-3xl font-bold">0</h2>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-900">Recent Transactions (Today)</h3>
          <button className="text-orange-500 text-sm font-semibold hover:text-orange-600"><i className="fa-solid fa-file-excel mr-1"></i> Export</button>
        </div>
        
        <div className="p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
            <i className="fa-solid fa-receipt text-3xl"></i>
          </div>
          <h3 className="text-lg font-bold text-gray-900">No Sales Today</h3>
          <p className="text-gray-500">You haven't generated any bills today. Go to Generate Bill to start selling.</p>
        </div>
      </div>
    </div>
  );
}