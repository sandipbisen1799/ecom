export default function WithdrawalHistoryPage() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Withdrawal History</h2>
            <p className="text-sm text-gray-500">Track your requested withdrawals.</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4 font-semibold">Request Date</th>
                <th className="px-6 py-4 font-semibold">Requested Amt</th>
                <th className="px-6 py-4 font-semibold">Net Amount</th>
                <th className="px-6 py-4 font-semibold">Bank details</th>
                <th className="px-6 py-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">01 Jul 2026</td>
                <td className="px-6 py-4 font-semibold">₹4,000</td>
                <td className="px-6 py-4 font-bold text-gray-900">₹3,600</td>
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-800">HDFC Bank</p>
                  <p className="text-[10px] text-gray-500">****4567</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-md text-xs font-semibold border border-amber-200">Pending</span>
                </td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">16 Jun 2026</td>
                <td className="px-6 py-4 font-semibold">₹8,000</td>
                <td className="px-6 py-4 font-bold text-gray-900">₹7,200</td>
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-800">HDFC Bank</p>
                  <p className="text-[10px] text-gray-500">****4567</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-md text-xs font-semibold border border-green-200">Processed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}