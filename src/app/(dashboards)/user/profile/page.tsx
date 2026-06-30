import Image from 'next/image';

export default function ProfilePage() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-100">
            <div className="w-full h-full bg-orange-200 flex items-center justify-center text-orange-600 text-4xl font-bold">
              AG
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900">Aurra Group</h2>
          <p className="text-orange-600 font-medium">Verified User • AHK002</p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-semibold text-gray-800">+91 98765 43210</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold text-gray-800">contact@aurragroup.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500">
                <i className="fa-solid fa-map-location-dot"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-semibold text-gray-800">Lucknow, Uttar Pradesh</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-500">
                <i className="fa-solid fa-calendar-check"></i>
              </div>
              <div>
                <p className="text-sm text-gray-500">Joined Date</p>
                <p className="font-semibold text-gray-800">15 March 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}