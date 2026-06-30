export default function PendingOrdersPage() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Pending Orders</h2>
            <p className="text-sm text-gray-500">Orders currently being processed or shipped.</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Items</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">#ORD-2026-8891</td>
                <td className="px-6 py-4">28 Jun 2026</td>
                <td className="px-6 py-4">3 Items</td>
                <td className="px-6 py-4 font-semibold">₹2,548</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-md text-xs font-semibold border border-amber-200">Processing</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-orange-500 hover:text-orange-700 font-medium text-sm">View Details</button>
                </td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">#ORD-2026-8892</td>
                <td className="px-6 py-4">30 Jun 2026</td>
                <td className="px-6 py-4">1 Item</td>
                <td className="px-6 py-4 font-semibold">₹1,299</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold border border-blue-200">Shipped</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-orange-500 hover:text-orange-700 font-medium text-sm">Track Order</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}