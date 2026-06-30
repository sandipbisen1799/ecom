export default function EditProfilePage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900">Edit Profile Information</h2>
          <p className="text-sm text-gray-500">Update your personal and contact details.</p>
        </div>
        
        <form className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" defaultValue="Aurra Group" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" defaultValue="contact@aurragroup.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" defaultValue="+91 98765 43210" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date of Birth</label>
              <input type="date" defaultValue="1995-06-15" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <textarea rows={3} defaultValue="Lucknow, Uttar Pradesh, India" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"></textarea>
          </div>
          
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
            <button type="button" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition">Cancel</button>
            <button type="button" className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/30 transition">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}