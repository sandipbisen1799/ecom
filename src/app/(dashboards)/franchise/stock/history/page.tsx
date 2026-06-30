export default function StockHistoryPage() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900">Stock Inward / Outward History</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Reference</th>
                <th className="px-6 py-4 font-semibold">Total Items</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="px-6 py-4">02 Feb 2026</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-md text-xs font-semibold border border-green-200"><i className="fa-solid fa-arrow-down mr-1"></i> Inward (From Admin)</span>
                </td>
                <td className="px-6 py-4 font-medium">REQ-9901</td>
                <td className="px-6 py-4 font-bold">250 units</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-orange-500 hover:text-orange-700 font-medium">View Challan</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}