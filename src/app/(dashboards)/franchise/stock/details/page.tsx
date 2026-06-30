export default function StockDetailsPage() {
  const stock = [
    { id: 'PRD-001', name: 'Aurra Protein Powder (Chocolate)', category: 'Nutrition', qty: 45, alert: false },
    { id: 'PRD-002', name: 'Herbal Detox Tea', category: 'Beverages', qty: 120, alert: false },
    { id: 'PRD-003', name: 'Multivitamin Capsules', category: 'Supplements', qty: 5, alert: true },
    { id: 'PRD-004', name: 'Ayurvedic Hair Oil', category: 'Personal Care', qty: 85, alert: false },
    { id: 'PRD-005', name: 'Immunity Booster Drops', category: 'Supplements', qty: 0, alert: true },
  ];

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-gray-900">Current Stock Inventory</h3>
            <p className="text-sm text-gray-500">Real-time tracking of your physical warehouse stock.</p>
          </div>
          <button className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-orange-200 transition">
            <i className="fa-solid fa-file-invoice-dollar mr-2"></i> Request Stock
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4 font-semibold">Product ID</th>
                <th className="px-6 py-4 font-semibold">Product Name</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold text-right">Available Qty</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {stock.map(s => (
                <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-600">{s.id}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{s.name}</td>
                  <td className="px-6 py-4">{s.category}</td>
                  <td className="px-6 py-4 text-right font-black text-lg">{s.qty}</td>
                  <td className="px-6 py-4 text-center">
                    {s.qty > 10 ? (
                      <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-md text-xs font-semibold border border-green-200">In Stock</span>
                    ) : s.qty > 0 ? (
                      <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-md text-xs font-semibold border border-amber-200">Low Stock</span>
                    ) : (
                      <span className="px-2.5 py-1 bg-red-50 text-red-700 rounded-md text-xs font-semibold border border-red-200">Out of Stock</span>
                    )}
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