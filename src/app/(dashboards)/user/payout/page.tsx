export default function PayoutPage() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Payout Report</h2>
            <p className="text-sm text-gray-500">History of payouts transferred to your bank account.</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4 font-semibold">Payout Cycle</th>
                <th className="px-6 py-4 font-semibold">Gross Amount</th>
                <th className="px-6 py-4 font-semibold">TDS (5%)</th>
                <th className="px-6 py-4 font-semibold">Admin Charge (5%)</th>
                <th className="px-6 py-4 font-semibold">Net Payable</th>
                <th className="px-6 py-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">15 Jun - 30 Jun 2026</td>
                <td className="px-6 py-4 font-semibold">₹5,000</td>
                <td className="px-6 py-4 text-red-500">-₹250</td>
                <td className="px-6 py-4 text-red-500">-₹250</td>
                <td className="px-6 py-4 font-bold text-gray-900">₹4,500</td>
                <td className="px-6 py-4 text-right">
                  <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-md text-xs font-semibold border border-green-200">Paid to Bank</span>
                </td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">01 Jun - 14 Jun 2026</td>
                <td className="px-6 py-4 font-semibold">₹3,050</td>
                <td className="px-6 py-4 text-red-500">-₹152.5</td>
                <td className="px-6 py-4 text-red-500">-₹152.5</td>
                <td className="px-6 py-4 font-bold text-gray-900">₹2,745</td>
                <td className="px-6 py-4 text-right">
                  <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-md text-xs font-semibold border border-green-200">Paid to Bank</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}