import Link from 'next/link';

export default function FranchiseDashboardPage() {
  return (
    <div className="p-6">
      
      {/* Alert Banner */}
      <div className="bg-amber-100 text-amber-600 text-sm font-semibold text-center py-2 px-4 rounded-md mb-6 w-full">
        You have not submitted your KYC documents yet. Please submit them to proceed.
      </div>

      {/* Top Row Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        
        {/* Purple Card */}
        <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-xl p-5 text-white shadow-md relative overflow-hidden h-32 flex flex-col justify-center">
          <p className="text-sm font-medium mb-1 z-10">Owner Name: Auraa</p>
          <p className="text-sm font-medium mb-1 z-10">Name: Auraa Healthcare</p>
          <p className="text-sm font-medium z-10">Joining Date: 2026-02-06</p>
          <div className="absolute right-[-20px] bottom-[-20px] w-24 h-24 bg-white opacity-10 rounded-full pointer-events-none"></div>
        </div>

        {/* Orange Card */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-5 text-white shadow-md relative overflow-hidden h-32 flex flex-col justify-center">
          <p className="text-sm font-medium mb-1 z-10">Referal: 7355205522</p>
          <p className="text-sm font-medium mb-1 z-10">User ID: AFI13880</p>
          <p className="text-sm font-medium z-10">Pincode: 226023</p>
          <div className="absolute right-[-20px] bottom-[-20px] w-24 h-24 bg-white opacity-10 rounded-full pointer-events-none"></div>
        </div>

        {/* Green KYC Card */}
        <div className="bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl p-5 text-white shadow-md relative overflow-hidden h-32 flex flex-col justify-center">
          <p className="text-sm font-medium mb-2 z-10">KYC Status</p>
          <div className="flex items-center justify-between z-10">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <i className="fa-regular fa-clock"></i> Pending
            </h3>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
              <i className="fa-solid fa-lock"></i>
            </div>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] w-24 h-24 bg-white opacity-10 rounded-full pointer-events-none"></div>
        </div>

        {/* Blue/Purple Card */}
        <div className="bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl p-5 text-white shadow-md relative overflow-hidden h-32 flex flex-col justify-center">
          <p className="text-sm font-medium mb-2 z-10">Total Billing Amount</p>
          <div className="flex items-center justify-between z-10">
            <h3 className="text-3xl font-bold">₹0</h3>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] w-24 h-24 bg-white opacity-10 rounded-full pointer-events-none"></div>
        </div>

      </div>

      {/* Bottom Row Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Withdrawal Wallet */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between h-28 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500"></div>
          <p className="text-sm font-medium text-gray-500 mb-1 ml-2">Withdrawal Wallet</p>
          <div className="flex justify-between items-center ml-2">
            <h3 className="text-2xl font-bold text-green-500">₹3061.9</h3>
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 text-lg">
              <i className="fa-solid fa-chart-column"></i>
            </div>
          </div>
        </div>

        {/* Franchise Commission */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between h-28 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-400"></div>
          <p className="text-sm font-medium text-gray-500 mb-1 ml-2">Franchise Commission</p>
          <div className="flex justify-between items-center ml-2">
            <h3 className="text-2xl font-bold text-green-500">₹3,061.90</h3>
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 text-lg">
              <i className="fa-solid fa-chart-column"></i>
            </div>
          </div>
        </div>

        {/* Approved Withdrawal */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between h-28 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500"></div>
          <p className="text-sm font-medium text-gray-500 mb-1 ml-2">Approved Withdrawal</p>
          <div className="flex justify-between items-center ml-2">
            <h3 className="text-2xl font-bold text-green-500">₹0</h3>
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 text-lg">
              <i className="fa-solid fa-indian-rupee-sign"></i>
            </div>
          </div>
        </div>

        {/* Pending Withdrawal */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between h-28 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500"></div>
          <p className="text-sm font-medium text-gray-500 mb-1 ml-2">Pending Withdrawal</p>
          <div className="flex justify-between items-center ml-2">
            <h3 className="text-2xl font-bold text-red-500">₹0</h3>
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-lg">
              <i className="fa-solid fa-indian-rupee-sign"></i>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}