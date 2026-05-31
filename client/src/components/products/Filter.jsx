import { useState } from "react";
import "../../pages/Pages.css";

const SORT_OPTIONS = [
  { value: "default",      label: "Default" },
  { value: "price-asc",   label: "Price: Low → High" },
  { value: "price-desc",  label: "Price: High → Low" },
  { value: "name-asc",    label: "Name: A → Z" },
  { value: "rating-desc", label: "Top Rated" },
];

const DEFAULT_FILTERS = {
  sort: "default",
  minPrice: "",
  maxPrice: "",
  onSale: false,
  minRating: 0,
};

function Filter({ filters, onChange, onClose }) {
  const [local, setLocal] = useState(filters);

  const update = (key, value) => setLocal((prev) => ({ ...prev, [key]: value }));

  const handleApply = () => { onChange(local); onClose(); };

  const handleReset = () => { onChange(DEFAULT_FILTERS); onClose(); };

  return (
    <div className="filter-panel">
      <div className="filter-panel__header">
        <p className="filter-panel__title">Filter</p>
        <button className="filter-panel__close" onClick={onClose}>✕</button>
      </div>

      <p className="filter-section-title">Sort by</p>
      {SORT_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          className={`filter-option${local.sort === opt.value ? " filter-option--active" : ""}`}
          onClick={() => update("sort", opt.value)}
        >
          {opt.label}
        </button>
      ))}

      <p className="filter-section-title">Price range</p>
      <div className="filter-price-row">
        <input
          type="number"
          placeholder="Min"
          value={local.minPrice}
          onChange={(e) => update("minPrice", e.target.value)}
          className="filter-price-input"
        />
        <span>—</span>
        <input
          type="number"
          placeholder="Max"
          value={local.maxPrice}
          onChange={(e) => update("maxPrice", e.target.value)}
          className="filter-price-input"
        />
      </div>

      <p className="filter-section-title">Min rating</p>
      <div className="filter-rating">
        {[1, 2, 3, 4, 5].map((r) => (
          <button
            key={r}
            className={`filter-rating-btn${local.minRating >= r ? " filter-rating-btn--active" : ""}`}
            onClick={() => update("minRating", local.minRating === r ? 0 : r)}
          >
            ★
          </button>
        ))}
      </div>

      <label className="filter-sale-label">
        <input
          type="checkbox"
          checked={local.onSale}
          onChange={(e) => update("onSale", e.target.checked)}
        />
        On sale only
      </label>

      <div className="filter-footer">
        <button className="filter-apply-btn" onClick={handleApply}>Apply</button>
        <button className="filter-reset-btn" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export { DEFAULT_FILTERS };
export default Filter;
