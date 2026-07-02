'use client';

import { useMemo, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/marketing/ProductCard';
import { products, categories } from '@/components/marketing/data';
import Pagination from '@/components/ui/Pagination';
import EmptyState from '@/components/ui/EmptyState';

const PAGE_SIZE = 8;
type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating';

function ShopContent() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sort, setSort] = useState<SortKey>('featured');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = products;
    if (category !== 'All') {
      list = list.filter((p) => p.category === category);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    const sorted = [...list];
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [category, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const applyFilter = (fn: () => void) => {
    fn();
    setPage(1);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Aurra Mall</h2>
        <p className="text-gray-500">Shop premium health products and earn BV on every order.</p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {['All', ...categories.map((c) => c.label)].map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => applyFilter(() => setCategory(label))}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition border cursor-pointer ${
                category === label
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2">
            <i className="fa-solid fa-magnifying-glass text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => applyFilter(() => setSearch(e.target.value))}
              className="border-none outline-none text-sm w-48 bg-transparent"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => applyFilter(() => setSort(e.target.value as SortKey))}
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {pageItems.length === 0 ? (
        <EmptyState
          icon="fa-basket-shopping"
          title="No products found"
          message="Try a different category, search term, or clear your filters."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pageItems.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        totalItems={filtered.length}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-500">Loading shop…</div>}>
      <ShopContent />
    </Suspense>
  );
}
