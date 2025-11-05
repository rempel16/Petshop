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
  const desc = product?.description || "";
  const shortText = desc.slice(0, 600);
  const isLong = desc.length > 600;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }));
    setToast?.("Item added to cart");
  };

  const inc = () => setQty((v) => v + 1);
  const dec = () => setQty((v) => Math.max(1, v - 1));

  return (
    <div className={styles.info}>
      <h1 className={styles.title}>{product.title}</h1>

      <div className={styles.priceBlock}>
        <div className={styles.priceRow}>
          <span className={styles.price}>${price}</span>
          {product.discont_price && (
            <span className={styles.oldPrice}>${product.price}</span>
          )}
          {hasDiscount && (
            <span className={styles.badge}>-{discountPercent}%</span>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <div className={styles.qtyWrap}>
          <button className={styles.qtyBtn} onClick={dec}>
            −
          </button>
          <span className={styles.qtyValue}>{qty}</span>
          <button className={styles.qtyBtn} onClick={inc}>
            +
          </button>
        </div>

        <button
          className={`btn btn-primary ${styles.addBtn}`}
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>

      {/* ---------- DESCRIPTION ---------- */}
      <div className={styles.description}>
        <h3 className={styles.subtitle}>Description</h3>
        <p>
          {expanded ? desc : shortText}
          {isLong && !expanded && "..."}
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
