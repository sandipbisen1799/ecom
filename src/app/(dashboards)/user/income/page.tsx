export default function IncomePage() {
  const incomes = [
    { id: 'TXN-9021', date: '30 Jun 2026', type: 'Direct Referral Bonus', from: 'Priya Sharma', amount: '₹1,500' },
    { id: 'TXN-8944', date: '25 Jun 2026', type: 'Matching Bonus', from: 'Left & Right Team', amount: '₹4,200' },
    { id: 'TXN-8812', date: '18 Jun 2026', type: 'Repurchase Bonus', from: 'Downline Shopping', amount: '₹850' },
    { id: 'TXN-8705', date: '10 Jun 2026', type: 'Direct Referral Bonus', from: 'Ravi Kumar', amount: '₹1,500' },
  ];

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Income Report</h2>
            <p className="text-sm text-gray-500">Detailed breakdown of all your earnings.</p>
          </div>
          <div className="flex gap-3">
            <select className="border border-gray-300 text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-orange-500">
              <option>June 2026</option>
              <option>May 2026</option>
              <option>April 2026</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4 font-semibold">Transaction ID</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Income Type</th>
                <th className="px-6 py-4 font-semibold">Source</th>
                <th className="px-6 py-4 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {incomes.map(i => (
                <tr key={i.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{i.id}</td>
                  <td className="px-6 py-4">{i.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold border border-blue-200">{i.type}</span>
                  </td>
                  <td className="px-6 py-4">{i.from}</td>
                  <td className="px-6 py-4 text-right font-bold text-green-600">+{i.amount}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 border-t border-gray-200">
              <tr>
                <td colSpan={4} className="px-6 py-4 text-right font-bold text-gray-900">Total Monthly Income</td>
                <td className="px-6 py-4 text-right font-black text-green-700 text-lg">₹8,050</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}