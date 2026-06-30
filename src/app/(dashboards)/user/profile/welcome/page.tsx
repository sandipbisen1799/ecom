export default function WelcomeLetterPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 relative overflow-hidden">
        {/* Background Watermark */}
        <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
          <i className="fa-solid fa-leaf text-[300px]"></i>
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start border-b-2 border-orange-500 pb-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Aurra <span className="text-orange-500">Health</span></h1>
              <p className="text-sm text-gray-500 mt-1">Empowering Lives, Delivering Health.</p>
            </div>
            <div className="text-right text-gray-600 text-sm">
              <p>Date: 30 June 2026</p>
              <p>ID: AHK002</p>
            </div>
          </div>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <h2 className="text-xl font-bold text-gray-900">Welcome to the Aurra Family!</h2>
            <p>Dear <strong>Aurra Group</strong>,</p>
            <p>Congratulations and welcome to Aurra Health Kart! We are thrilled to have you join our growing community of health enthusiasts and entrepreneurs. By stepping into this journey, you have taken a major step towards better health and immense financial success.</p>
            <p>Your unique Member ID is <strong>AHK002</strong>. Please use this ID for all your future transactions, network building, and communications with the company.</p>
            <p>We are committed to providing you with the highest quality products and a robust platform to build your business. Our team is always here to support your growth.</p>
            
            <div className="mt-12 pt-8">
              <p className="font-bold text-gray-900">Warm Regards,</p>
              <div className="h-16 w-32 border-b border-gray-300 my-2"></div>
              <p className="font-medium text-gray-800">Managing Director</p>
              <p className="text-sm text-gray-500">Aurra Health Kart</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <button className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition shadow-lg">
            <i className="fa-solid fa-print"></i> Print Letter
          </button>
        </div>
      </div>
    </div>
  );
}