export default function KYCPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-4">
        <div className="mt-1 text-amber-500"><i className="fa-solid fa-circle-exclamation text-xl"></i></div>
        <div>
          <h3 className="font-semibold text-amber-800">KYC Pending</h3>
          <p className="text-amber-700 text-sm mt-1">Please submit your identity documents to unlock withdrawals and full account features.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">KYC Documents</h2>
            <p className="text-sm text-gray-500">Upload clear photos of your original documents.</p>
          </div>
          <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider">Unverified</span>
        </div>
        
        <form className="p-6 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <i className="fa-regular fa-id-card text-orange-500"></i> Aadhar Card (Front)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-orange-50 hover:border-orange-300 transition cursor-pointer">
                <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-400 mb-3"></i>
                <p className="text-sm font-medium text-gray-700">Click to upload file</p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG, PDF (Max 5MB)</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <i className="fa-regular fa-id-card text-orange-500"></i> Aadhar Card (Back)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-orange-50 hover:border-orange-300 transition cursor-pointer">
                <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-400 mb-3"></i>
                <p className="text-sm font-medium text-gray-700">Click to upload file</p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG, PDF (Max 5MB)</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <i className="fa-solid fa-money-check text-blue-500"></i> PAN Card
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-blue-50 hover:border-blue-300 transition cursor-pointer">
                <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-400 mb-3"></i>
                <p className="text-sm font-medium text-gray-700">Click to upload file</p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG, PDF (Max 5MB)</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <i className="fa-solid fa-building-columns text-green-500"></i> Bank Passbook / Cancelled Cheque
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-green-50 hover:border-green-300 transition cursor-pointer">
                <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-400 mb-3"></i>
                <p className="text-sm font-medium text-gray-700">Click to upload file</p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG, PDF (Max 5MB)</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end pt-6 border-t border-gray-100">
            <button type="button" className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-orange-500/30 transition flex items-center gap-2">
              <i className="fa-solid fa-paper-plane"></i> Submit KYC
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}