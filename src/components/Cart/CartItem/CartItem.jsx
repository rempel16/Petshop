import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../features/cart/cartSlice";
import QuantityControl from "../QuantityControl/QuantityControl.jsx";
import styles from "./CartItem.module.css"; // ✅ добавили CSS

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const total = (item.price * item.quantity).toFixed(2);

  return (
    <div className={styles.cartItem}>
      {/* 🐾 Image */}
      <img src={item.image} alt={item.title} className={styles.img} />

      {/* 🐾 Info */}
      <div className={styles.info}>
        <p className={styles.title}>{item.title}</p>

        <div className={styles.priceWrap}>
          <span className={styles.price}>€{item.price}</span>
        </div>

        <p className={styles.priceLine}>
          €{item.price} × {item.quantity} = <span>€{total}</span>
        </p>

        <QuantityControl id={item.id} quantity={item.quantity} />
      </div>

      {/* 🗑 Remove button */}
      <button
        className={styles.removeBtn}
        onClick={() => dispatch(removeFromCart(item.id))}
      >
        ✕
      </button>
    </div>
  );
}
