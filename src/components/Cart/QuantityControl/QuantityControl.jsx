import { useDispatch } from "react-redux";
import { increaseQty, decreaseQty } from "../../../features/cart/cartSlice";
import styles from "./QuantityControl.module.css";


export default function QuantityControl({ id, quantity }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.qty}>
      <button
        onClick={() => dispatch(decreaseQty(id))}
        className={styles["qty-btn"]}
      >
        −
      </button>
      <span className={styles["qty-value"]}>{quantity}</span>
      <button
        onClick={() => dispatch(increaseQty(id))}
        className={styles["qty-btn"]}
      >
        +
      </button>
    </div>
  );
}
