import { useState } from "react";
import styles from "./ProductQtyCounter.module.css";

export default function ProductQtyCounter({ onChange }) {
  const [qty, setQty] = useState(1);

  const change = (val) => {
    const newQty = Math.max(1, qty + val);
    setQty(newQty);
    onChange(newQty);
  };

  return (
    <div className={styles.qtyWrap}>
      <button className={styles.btn} onClick={() => change(-1)}>
        −
      </button>
      <span className={styles.value}>{qty}</span>
      <button className={styles.btn} onClick={() => change(1)}>
        +
      </button>
    </div>
  );
}
