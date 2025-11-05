import { useState } from "react";
import styles from "./FilterBar.module.css";

export default function FilterBar({ onFilterChange }) {
  const [sort, setSort] = useState("");
  const [openSort, setOpenSort] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [discountOnly, setDiscountOnly] = useState(false);

  const handleChange = (newState = {}) => {
    onFilterChange({
      sort,
      minPrice,
      maxPrice,
      discountOnly,
      ...newState,
    });
  };

  return (
    <div className={styles.filterBar}>
      {/* Price */}
      <div className={styles.filterBlock}>
        <span className={styles.label}>Price</span>
        <div className={styles.priceInputs}>
          <input
            type="number"
            placeholder="from"
            value={minPrice}
            onChange={(e) => {
              const value = e.target.value;
              setMinPrice(value);
              handleChange({ minPrice: value });
            }}
          />
          <input
            type="number"
            placeholder="to"
            value={maxPrice}
            onChange={(e) => {
              const value = e.target.value;
              setMaxPrice(value);
              handleChange({ maxPrice: value });
            }}
          />
        </div>
      </div>

      {/* Discount */}
      <div className={styles.filterBlock}>
        <span className={styles.label}>Discounted items</span>

        <label className="checkboxWrap">
          <input
            type="checkbox"
            checked={discountOnly}
            onChange={() => {
              const newValue = !discountOnly;
              setDiscountOnly(newValue);
              handleChange({ discountOnly: newValue });
            }}
          />
        </label>
      </div>

      {/* Sort */}
      <div className={styles.filterBlock}>
        <span className={styles.label}>Sort by</span>

        <div className={styles.sortWrapper}>
          <button
            type="button"
            className={`${styles.sortButton} ${sort ? styles.active : ""}`}
            onClick={() => setOpenSort((prev) => !prev)}
          >
            <span>{sort ? sort.replace(/([A-Z])/g, " $1") : "default"}</span>
            <img
              src="/src/assets/icons/arrow.svg"
              className={`${styles.arrow} ${openSort ? styles.open : ""}`}
              alt="arrow"
            />
          </button>

          {openSort && (
            <ul className={styles.dropdown}>
              {[
                { value: "", label: "by default" },
                { value: "newest", label: "newest" },
                { value: "price: high-low", label: "price: high-low" },
                { value: "price: low-high", label: "price: low-high" },
              ].map((item) => (
                <li
                  key={item.value}
                  onClick={() => {
                    setSort(item.value);
                    setOpenSort(false);
                    handleChange({ sort: item.value });
                  }}
                  className={`${styles.option} ${
                    sort === item.value ? styles.selected : ""
                  }`}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
