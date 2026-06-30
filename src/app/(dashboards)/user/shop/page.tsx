import Image from 'next/image';

const products = [
  { id: 1, name: 'Aurra Protein Powder', price: '₹1,299', bv: '50 BV', img: 'https://via.placeholder.com/300x300?text=Protein', tag: 'Bestseller' },
  { id: 2, name: 'Herbal Detox Tea', price: '₹499', bv: '15 BV', img: 'https://via.placeholder.com/300x300?text=Tea' },
  { id: 3, name: 'Multivitamin Capsules', price: '₹899', bv: '35 BV', img: 'https://via.placeholder.com/300x300?text=Vitamins' },
  { id: 4, name: 'Omega 3 Fish Oil', price: '₹750', bv: '30 BV', img: 'https://via.placeholder.com/300x300?text=Omega3' },
  { id: 5, name: 'Ayurvedic Hair Oil', price: '₹350', bv: '10 BV', img: 'https://via.placeholder.com/300x300?text=HairOil' },
  { id: 6, name: 'Immunity Booster Drops', price: '₹299', bv: '8 BV', img: 'https://via.placeholder.com/300x300?text=Immunity', tag: 'New' }
];

export default function ShopPage() {
  return (
    <div className="p-6">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Aurra Mall</h2>
          <p className="text-gray-500">Shop premium health products and earn BV.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2">
            <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
            <input type="text" placeholder="Search products..." className="border-none outline-none text-sm w-48" />
          </div>
          <button className="bg-gray-900 text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-800 transition shadow-sm">
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="font-medium">0 items</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group">
            <div className="h-48 bg-gray-50 relative p-4 flex items-center justify-center overflow-hidden">
              {p.tag && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider z-10">
                  {p.tag}
                </div>
              )}
              <img src={p.img} alt={p.name} className="h-full object-contain group-hover:scale-110 transition duration-500" />
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{p.name}</h3>
              </div>
              <div className="flex justify-between items-end mt-4">
                <div>
                  <p className="text-xs text-gray-500 line-through">₹{(parseInt(p.price.replace('₹','').replace(',','')) * 1.2).toFixed(0)}</p>
                  <p className="text-lg font-bold text-orange-600">{p.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">{p.bv}</p>
                </div>
              </div>
              <button className="w-full mt-5 bg-gray-50 border border-gray-200 text-gray-900 py-2 rounded-lg font-medium hover:bg-orange-500 hover:text-white hover:border-orange-500 transition flex justify-center items-center gap-2">
                <i className="fa-solid fa-cart-plus"></i> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}