export default function TopEarnersPage() {
  const earners = [
    { rank: 1, name: 'Sanjay Kapoor', id: 'AHK001', city: 'Mumbai', earnings: '₹12,45,000' },
    { rank: 2, name: 'Meera Patel', id: 'AHK008', city: 'Ahmedabad', earnings: '₹9,80,500' },
    { rank: 3, name: 'Aurra Group', id: 'AHK002', city: 'Lucknow', earnings: '₹7,50,000' },
    { rank: 4, name: 'Vikram Singh', id: 'AHK045', city: 'Delhi', earnings: '₹6,15,200' },
    { rank: 5, name: 'Anita Desai', id: 'AHK102', city: 'Pune', earnings: '₹4,90,000' },
  ];

  return (
    <div className="p-6">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-500 mb-4">
          <i className="fa-solid fa-trophy text-3xl"></i>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Hall of Fame</h2>
        <p className="text-gray-500 mt-2 max-w-lg mx-auto">Celebrating the top achievers and highest earners in the Aurra Health Kart community this month.</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {earners.map(e => (
          <div key={e.rank} className={`bg-white rounded-xl shadow-sm border overflow-hidden flex items-center p-4 transition hover:shadow-md ${e.id === 'AHK002' ? 'border-orange-300 bg-orange-50/30 ring-1 ring-orange-500/20' : 'border-gray-100'}`}>
            <div className="w-16 flex justify-center">
              {e.rank === 1 && <i className="fa-solid fa-medal text-4xl text-yellow-500"></i>}
              {e.rank === 2 && <i className="fa-solid fa-medal text-4xl text-gray-400"></i>}
              {e.rank === 3 && <i className="fa-solid fa-medal text-4xl text-amber-700"></i>}
              {e.rank > 3 && <span className="text-2xl font-bold text-gray-400">#{e.rank}</span>}
            </div>
            
            <div className="flex-1 px-6 flex items-center gap-4 border-l border-gray-100 ml-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 shrink-0">
                {e.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  {e.name}
                  {e.id === 'AHK002' && <span className="px-2 py-0.5 bg-orange-500 text-white text-[10px] uppercase rounded-full tracking-wider">You</span>}
                </h3>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <span>{e.id}</span> • <span><i className="fa-solid fa-location-dot text-gray-400"></i> {e.city}</span>
                </p>
              </div>
            </div>
            
            <div className="text-right pr-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Earnings</p>
              <p className="text-2xl font-black text-green-600">{e.earnings}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}