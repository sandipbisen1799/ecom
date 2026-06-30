export default function GenerateBillPage() {
  return (
    <div className="p-6">
      <div className="flex gap-6 flex-col lg:flex-row">
        
        {/* Left Side: Product Search & Cart */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-140px)]">
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-4">
            <div className="flex-1 relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input type="text" placeholder="Search product by name or SKU..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
              <i className="fa-solid fa-barcode"></i> Scan
            </button>
          </div>
          
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-gray-400 text-center">
            <i className="fa-solid fa-cart-arrow-down text-5xl mb-4 text-gray-200"></i>
            <p className="font-medium text-gray-500">Cart is empty</p>
            <p className="text-sm">Search and add products to start billing</p>
          </div>
        </div>

        {/* Right Side: Customer Info & Checkout */}
        <div className="w-full lg:w-96 bg-white rounded-xl shadow-sm border border-gray-100 h-[calc(100vh-140px)] flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-bold text-gray-900">Billing Details</h3>
          </div>
          
          <div className="p-4 border-b border-gray-100 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Customer Type</label>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button className="flex-1 py-1.5 bg-white shadow-sm rounded-md text-sm font-semibold text-gray-900">Registered</button>
                <button className="flex-1 py-1.5 text-sm font-medium text-gray-500">Walk-in</button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Customer ID / Phone</label>
              <div className="flex gap-2">
                <input type="text" placeholder="Enter ID or Phone" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500" />
                <button className="bg-orange-100 text-orange-600 px-3 rounded-lg"><i className="fa-solid fa-magnifying-glass"></i></button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 bg-gray-50 p-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal (0 items)</span>
                <span className="font-semibold text-gray-900">₹0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Discount</span>
                <span className="font-semibold text-green-600">-₹0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">GST (18%)</span>
                <span className="font-semibold text-gray-900">₹0.00</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-gray-900">Grand Total</span>
                <span className="text-2xl font-black text-orange-600">₹0.00</span>
              </div>
              
              <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg py-3 rounded-lg shadow-md hover:shadow-lg transition opacity-50 cursor-not-allowed">
                Generate Invoice
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}