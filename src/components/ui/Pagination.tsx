interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, totalItems, pageSize, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1
  );

  return (
    <div className="pagination">
      <span className="pagination-info">
        Showing {start}–{end} of {totalItems}
      </span>
      <div className="pagination-btns">
        <button className="pg-btn" disabled={page === 1} onClick={() => onPageChange(page - 1)} aria-label="Previous page">
          <i className="fa-solid fa-chevron-left" />
        </button>
        {pageNumbers.map((n, i) => (
          <span key={n} style={{ display: 'flex', alignItems: 'center' }}>
            {i > 0 && pageNumbers[i - 1] !== n - 1 && <span className="pagination-info" style={{ padding: '0 4px' }}>…</span>}
            <button className={`pg-btn ${n === page ? 'active' : ''}`} onClick={() => onPageChange(n)}>
              {n}
            </button>
          </span>
        ))}
        <button className="pg-btn" disabled={page === totalPages} onClick={() => onPageChange(page + 1)} aria-label="Next page">
          <i className="fa-solid fa-chevron-right" />
        </button>
      </div>
    </div>
  );
}
