export default function TotalSaleHistoryPage() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Total Sale History</h2>
            <p className="text-sm text-gray-500">Complete log of all generated invoices.</p>
          </div>
          
          <div className="flex gap-2">
            <input type="date" className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-orange-500" />
            <span className="text-gray-400 self-center">to</span>
            <input type="date" className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-orange-500" />
            <button className="bg-gray-900 text-white px-4 py-1.5 rounded-md text-sm hover:bg-gray-800 transition"><i className="fa-solid fa-filter"></i> Filter</button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4 font-semibold">Invoice No</th>
                <th className="px-6 py-4 font-semibold">Date & Time</th>
                <th className="px-6 py-4 font-semibold">Customer Details</th>
                <th className="px-6 py-4 font-semibold">Total Amount</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <i className="fa-solid fa-folder-open text-4xl text-gray-300 mb-3"></i>
                    <p>No historical records found for this franchise.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
}