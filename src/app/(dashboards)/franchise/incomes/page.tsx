export default function FranchiseIncomesPage() {
  return (
    <div className="p-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl p-6 text-white shadow-md relative overflow-hidden">
          <i className="fa-solid fa-coins absolute right-4 bottom-4 text-6xl opacity-20"></i>
          <p className="text-amber-100 text-sm font-semibold uppercase tracking-wider mb-1">Total Franchise Commission</p>
          <h2 className="text-4xl font-black">₹3,061.90</h2>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative overflow-hidden">
          <i className="fa-solid fa-money-bill-wave absolute right-4 bottom-4 text-6xl text-gray-100"></i>
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">Available to Withdraw</p>
          <h2 className="text-4xl font-black text-green-500">₹3,061.90</h2>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900">Income Ledger</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Invoice Ref</th>
                <th className="px-6 py-4 font-semibold">Sale Amount</th>
                <th className="px-6 py-4 font-semibold">Commission %</th>
                <th className="px-6 py-4 font-semibold text-right">Earned</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="px-6 py-4">05 Mar 2026</td>
                <td className="px-6 py-4 font-medium text-blue-600">INV-98210</td>
                <td className="px-6 py-4">₹25,000</td>
                <td className="px-6 py-4">8%</td>
                <td className="px-6 py-4 text-right font-bold text-green-600">+₹2,000.00</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="px-6 py-4">12 Feb 2026</td>
                <td className="px-6 py-4 font-medium text-blue-600">INV-98114</td>
                <td className="px-6 py-4">₹13,273</td>
                <td className="px-6 py-4">8%</td>
                <td className="px-6 py-4 text-right font-bold text-green-600">+₹1,061.90</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}