export default function FranchiseKYCPage() {
  return (
    <div className="p-6">
      
      {/* Alert Banner */}
      <div className="bg-amber-100 text-amber-600 text-sm font-semibold text-center py-2 px-4 mb-4">
        You have not submitted your KYC documents yet. Please submit them to proceed.
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="text-gray-700 text-lg">Dashboard</span>
        <i className="fa-solid fa-chevron-right text-gray-400 text-xs mx-1"></i>
        <span className="text-gray-500">KYC</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        
        {/* Header */}
        <div className="bg-green-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-green-700 font-bold text-sm tracking-wide">KYC UPDATE</h2>
          <span className="bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">Verification Pending</span>
        </div>

        {/* Form */}
        <form className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            
            {/* PAN Number */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">PAN Number</label>
              <input type="text" placeholder="PAN No" className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-green-500 text-sm" />
            </div>

            {/* Upload PAN */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Upload proof of PAN</label>
              <div className="flex border border-gray-200 rounded-md overflow-hidden text-sm w-full">
                <div className="bg-gray-100 px-4 py-2 border-r border-gray-200 text-gray-700 whitespace-nowrap cursor-pointer">Choose File</div>
                <div className="px-4 py-2 text-gray-500 flex-1">No file chosen</div>
              </div>
              <div className="mt-4 w-[100px] h-[100px] border-2 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                100 x 100
              </div>
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Account Number</label>
              <input type="text" placeholder="Account No." className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-green-500 text-sm" />
            </div>

            {/* Upload Passbook */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Upload proof of Passbook</label>
              <div className="flex border border-gray-200 rounded-md overflow-hidden text-sm w-full">
                <div className="bg-gray-100 px-4 py-2 border-r border-gray-200 text-gray-700 whitespace-nowrap cursor-pointer">Choose File</div>
                <div className="px-4 py-2 text-gray-500 flex-1">No file chosen</div>
              </div>
              <div className="mt-4 w-[100px] h-[100px] border-2 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                100 x 100
              </div>
            </div>

            {/* Account Holder Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-2 uppercase text-xs font-bold tracking-wider">ACCOUNT HOLDER NAME</label>
              <input type="text" placeholder="Name as per bank" className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-green-500 text-sm" />
            </div>

            {/* Bank Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-2 uppercase text-xs font-bold tracking-wider">BANK NAME</label>
              <input type="text" placeholder="e.g. HDFC Bank" className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-green-500 text-sm" />
            </div>
            
            {/* IFSC Code */}
            <div>
              <label className="block text-sm text-gray-600 mb-2 uppercase text-xs font-bold tracking-wider">IFSC CODE</label>
              <input type="text" placeholder="e.g. HDFC0001234" className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-green-500 text-sm" />
            </div>
            
            {/* Branch Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-2 uppercase text-xs font-bold tracking-wider">BRANCH NAME</label>
              <input type="text" placeholder="e.g. Pune West" className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-green-500 text-sm" />
            </div>

          </div>
          
          <div className="mt-10 flex justify-center">
             <button type="button" className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-8 py-2.5 rounded-md hover:shadow-lg transition text-sm tracking-wide">
               SUBMIT KYC
             </button>
          </div>

        </form>
      </div>

    </div>
  );
}