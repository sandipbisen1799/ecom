export default function DirectReferralsPage() {
  const referrals = [
    { id: 'AHK015', name: 'Ravi Kumar', date: '10 Apr 2026', status: 'Active', rank: 'Silver', bv: 450 },
    { id: 'AHK042', name: 'Priya Sharma', date: '22 Apr 2026', status: 'Active', rank: 'Bronze', bv: 120 },
    { id: 'AHK089', name: 'Amit Singh', date: '05 May 2026', status: 'Inactive', rank: 'Member', bv: 0 },
    { id: 'AHK112', name: 'Neha Gupta', date: '18 May 2026', status: 'Active', rank: 'Gold', bv: 1250 },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg shadow-blue-500/20">
          <p className="text-blue-100 text-sm font-semibold uppercase tracking-wider mb-1">Total Directs</p>
          <h3 className="text-3xl font-bold">12</h3>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg shadow-green-500/20">
          <p className="text-green-100 text-sm font-semibold uppercase tracking-wider mb-1">Active Directs</p>
          <h3 className="text-3xl font-bold">9</h3>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl p-6 text-white shadow-lg shadow-orange-500/20">
          <p className="text-orange-100 text-sm font-semibold uppercase tracking-wider mb-1">Total Team BV</p>
          <h3 className="text-3xl font-bold">4,850</h3>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Direct Referrals</h2>
            <p className="text-sm text-gray-500">Members you have personally sponsored.</p>
          </div>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
            <i className="fa-solid fa-plus mr-2"></i> Add New Member
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4 font-semibold">Member Info</th>
                <th className="px-6 py-4 font-semibold">Join Date</th>
                <th className="px-6 py-4 font-semibold">Rank</th>
                <th className="px-6 py-4 font-semibold">Total BV</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {referrals.map(r => (
                <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                        {r.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{r.name}</p>
                        <p className="text-xs text-gray-500">{r.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{r.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{r.rank}</td>
                  <td className="px-6 py-4 font-bold text-green-600">{r.bv} BV</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${r.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}