export default function FranchiseProfilePage() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Cover & Avatar */}
        <div className="h-48 bg-gradient-to-r from-orange-500 to-red-500 relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="absolute -bottom-12 left-8 flex items-end gap-4">
            <div className="w-24 h-24 rounded-xl border-4 border-white shadow-md bg-white flex items-center justify-center text-orange-500 text-4xl">
              <i className="fa-solid fa-store"></i>
            </div>
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-white drop-shadow-md">Auraa Healthcare</h1>
              <p className="text-orange-100 font-medium drop-shadow-md">Franchise Code: AFI13880</p>
            </div>
          </div>
        </div>

        <div className="pt-20 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Info Box */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Business Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Owner Name</p>
                  <p className="font-semibold text-gray-800">Auraa</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Referral Code</p>
                  <p className="font-semibold text-gray-800">7355205522</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Joining Date</p>
                  <p className="font-semibold text-gray-800">2026-02-06</p>
                </div>
              </div>
            </div>

            {/* Address Box */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Location & Contact</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Contact Number</p>
                  <p className="font-semibold text-gray-800">+91 9876543210</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Email Address</p>
                  <p className="font-semibold text-gray-800">contact@auraahealthcare.com</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Pincode</p>
                  <p className="font-semibold text-gray-800">226023</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Full Address</p>
                  <p className="font-semibold text-gray-800">Shop No 42, Main Market, Lucknow, Uttar Pradesh, 226023</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}