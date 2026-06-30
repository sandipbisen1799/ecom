export default function CompletedOrdersPage() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Completed Orders</h2>
            <p className="text-sm text-gray-500">Your past delivered orders and invoices.</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Delivered On</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Earned BV</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">#ORD-2026-8102</td>
                <td className="px-6 py-4">15 May 2026</td>
                <td className="px-6 py-4 font-semibold">₹4,200</td>
                <td className="px-6 py-4 text-green-600 font-bold">+120 BV</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-md text-xs font-semibold border border-green-200">Delivered</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-500 hover:text-gray-900"><i className="fa-solid fa-download"></i></button>
                </td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">#ORD-2026-7994</td>
                <td className="px-6 py-4">02 Apr 2026</td>
                <td className="px-6 py-4 font-semibold">₹1,850</td>
                <td className="px-6 py-4 text-green-600 font-bold">+65 BV</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-md text-xs font-semibold border border-green-200">Delivered</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-500 hover:text-gray-900"><i className="fa-solid fa-download"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}