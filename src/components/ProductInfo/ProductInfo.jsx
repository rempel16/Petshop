import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import styles from "./ProductInfo.module.css";

export default function ProductInfo({ product, setToast }) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [expanded, setExpanded] = useState(false);

  const hasDiscount = !!product.discont_price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.discont_price) / product.price) * 100
      )
    : null;

  const price = product.discont_price || product.price;
  const description = product?.description || "";
  const shortText = description.slice(0, 600);
  const isLong = description.length > 600;

  const handleAdd = () => {
    dispatch(addToCart({ ...product, quantity: qty }));
    setToast?.("Item added to cart");
  };

  const inc = () => setQty((prev) => prev + 1);
  const dec = () => setQty((prev) => Math.max(1, prev - 1));

  return (
    <div className={styles.info}>
      <h1 className={styles.title}>{product.title}</h1>

      {/* ---------- PRICE ROW ---------- */}
      <div className={styles.priceRow}>
        <span className={styles.price}>${price}</span>

        {hasDiscount && (
          <>
            <span className={styles.oldPrice}>${product.price}</span>
            <span className={styles.badge}>-{discountPercent}%</span>
          </>
        )}
      </div>

      {/* ACTIONS */}
<div className={styles.actions}>

  {/* ✅ qty selector — ИМЕНА КЛАССОВ ПОЛНОСТЬЮ СОВПАДАЮТ С ТВОИМИ */}
  <div className={styles.qty}>
    <button className={styles["qty-btn"]} onClick={dec}>
      –
    </button>

    <span className={styles["qty-value"]}>{qty}</span>

    <button className={styles["qty-btn"]} onClick={inc}>
      +
    </button>
  </div>

  {/* Add to cart */}
  <button
    className={`btn btn-primary ${styles.addBtn}`}
    onClick={handleAdd}
  >
    Add to cart
  </button>
</div>



      {/* DESCRIPTION */}
      <div className={styles.description}>
        <p className={styles.subtitle}>Description</p>

        <p>
          {expanded ? description : shortText}
          {!expanded && isLong && "..."}
        </p>

        {isLong && (
          <button
            className={styles.moreBtn}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Hide" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}
