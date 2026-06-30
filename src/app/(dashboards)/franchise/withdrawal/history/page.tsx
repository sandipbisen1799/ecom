export default function FranchiseWithdrawalHistoryPage() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900">Withdrawal History</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4 font-semibold">Request Date</th>
                <th className="px-6 py-4 font-semibold">Requested Amount</th>
                <th className="px-6 py-4 font-semibold">Deductions (10%)</th>
                <th className="px-6 py-4 font-semibold">Net Payable</th>
                <th className="px-6 py-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  <i className="fa-solid fa-clock-rotate-left text-4xl text-gray-300 mb-3 block"></i>
                  No previous withdrawal requests found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}