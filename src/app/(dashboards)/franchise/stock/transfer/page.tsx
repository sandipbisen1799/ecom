export default function StockTransferPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900">Transfer Stock</h2>
          <p className="text-sm text-gray-500">Transfer inventory to another franchise or member.</p>
        </div>
        
        <form className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Receiver ID</label>
              <div className="flex">
                <input type="text" placeholder="Enter Franchise/Member ID" className="flex-1 px-4 py-2 border border-r-0 border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-orange-500" />
                <button type="button" className="bg-gray-100 border border-gray-300 rounded-r-lg px-4 text-gray-600 font-medium hover:bg-gray-200">Verify</button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Receiver Name</label>
              <input type="text" disabled className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed" placeholder="Auto-filled after verification" />
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <label className="block text-sm font-bold text-gray-700 mb-3">Select Products</label>
            <div className="flex gap-4">
              <select className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-orange-500">
                <option>-- Select Product --</option>
                <option>Aurra Protein Powder (Available: 45)</option>
                <option>Herbal Detox Tea (Available: 120)</option>
              </select>
              <input type="number" placeholder="Qty" className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-orange-500" />
              <button type="button" className="bg-green-100 text-green-700 px-4 rounded-lg font-bold hover:bg-green-200"><i className="fa-solid fa-plus"></i></button>
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button type="button" className="px-8 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-bold hover:shadow-lg transition">Submit Transfer</button>
          </div>
        </form>
      </div>
    </div>
  );
}