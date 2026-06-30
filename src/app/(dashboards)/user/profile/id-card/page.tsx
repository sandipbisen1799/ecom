export default function IDCardPage() {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-[320px] h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden relative border border-gray-100 flex flex-col">
        {/* Top Banner */}
        <div className="h-32 bg-gradient-to-br from-orange-500 to-amber-500 relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:10px_10px]"></div>
          <div className="absolute top-4 w-full text-center text-white font-bold text-xl tracking-wide">
            AURRA HEALTH
          </div>
        </div>
        
        {/* Profile Image (Overlapping) */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-orange-100 flex items-center justify-center text-4xl font-bold text-orange-600 overflow-hidden">
            <img src="https://ui-avatars.com/api/?name=Aurra+Group&background=f97316&color=fff&size=256" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
        
        {/* Details */}
        <div className="pt-20 pb-6 px-6 text-center flex-1 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900">Aurra Group</h2>
          <p className="text-orange-500 font-semibold tracking-widest mt-1">MEMBER</p>
          
          <div className="mt-6 space-y-3 text-left">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-2">
              <i className="fa-solid fa-id-badge text-gray-400 w-5"></i>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">ID Number</p>
                <p className="text-sm font-semibold text-gray-900">AHK002</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 border-b border-gray-100 pb-2">
              <i className="fa-solid fa-phone text-gray-400 w-5"></i>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Phone</p>
                <p className="text-sm font-semibold text-gray-900">+91 98765 43210</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-droplet text-red-500 w-5"></i>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Blood Group</p>
                <p className="text-sm font-semibold text-gray-900">O+</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-900 text-white text-center py-3 text-xs">
          www.aurrahealthkart.com
        </div>
      </div>
      
      <button className="mt-8 flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition shadow-sm">
        <i className="fa-solid fa-download"></i> Download ID Card
      </button>
    </div>
  );
}