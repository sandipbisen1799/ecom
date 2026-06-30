export default function DownlinePage() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[60vh] flex flex-col">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Network Tree</h2>
            <p className="text-sm text-gray-500">Visual representation of your entire downline.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50"><i className="fa-solid fa-magnifying-glass-minus"></i></button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50"><i className="fa-solid fa-magnifying-glass-plus"></i></button>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center bg-gray-50/30 p-10 relative overflow-auto">
          {/* Mock Network Tree */}
          <div className="flex flex-col items-center">
            {/* Root Node */}
            <div className="relative group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg mx-auto z-10 relative">
                <i className="fa-solid fa-crown"></i>
              </div>
              <div className="text-center mt-2">
                <p className="font-bold text-gray-900 text-sm">Aurra Group</p>
                <p className="text-xs text-orange-600 font-medium">AHK002</p>
              </div>
            </div>
            
            {/* Lines */}
            <div className="h-8 w-px bg-gray-300 my-2"></div>
            <div className="w-[300px] h-px bg-gray-300"></div>
            <div className="flex justify-between w-[300px]">
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="h-8 w-px bg-gray-300"></div>
            </div>

            {/* Level 1 Nodes */}
            <div className="flex justify-between w-[400px]">
              {/* Node 1 */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white border-4 border-white shadow-md z-10 relative">
                  <span className="font-bold">RK</span>
                </div>
                <div className="text-center mt-2">
                  <p className="font-semibold text-gray-800 text-xs">Ravi Kumar</p>
                  <p className="text-[10px] text-gray-500">AHK015</p>
                </div>
              </div>
              
              {/* Node 2 */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white border-4 border-white shadow-md z-10 relative">
                  <span className="font-bold">PS</span>
                </div>
                <div className="text-center mt-2">
                  <p className="font-semibold text-gray-800 text-xs">Priya Sharma</p>
                  <p className="text-[10px] text-gray-500">AHK042</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
