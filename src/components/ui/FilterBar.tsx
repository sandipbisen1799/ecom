interface SelectFilter {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

interface FilterBarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  filters?: SelectFilter[];
  onClear?: () => void;
}

export default function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  filters = [],
  onClear,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      {onSearchChange && (
        <input
          type="text"
          value={searchValue ?? ''}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
        />
      )}
      {filters.map((f) => (
        <select key={f.label} value={f.value} onChange={(e) => f.onChange(e.target.value)} aria-label={f.label}>
          {f.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ))}
      {onClear && (
        <button type="button" className="btn-sm" onClick={onClear}>
          <i className="fa-solid fa-rotate-left" /> Clear
        </button>
      )}
    </div>
  );
}
