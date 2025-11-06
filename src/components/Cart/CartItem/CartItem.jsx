import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../features/cart/cartSlice";
import QuantityControl from "../QuantityControl/QuantityControl.jsx";
import styles from "./CartItem.module.css";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const hasDiscount = !!item.discont_price;
  const price = hasDiscount ? item.discont_price : item.price;

  return (
    <div className={styles.cartItem}>
      <img src={item.image} alt={item.title} className={styles.img} />

      <div className={styles.info}>
        <p className={styles.title}>{item.title}</p>

        <div className={styles.bottomRow}>
         
          <QuantityControl id={item.id} quantity={item.quantity} />

          <div className={styles.priceWrap}>
            <span className={styles.price}>€{price}</span>
            {hasDiscount && <span className={styles.old}>€{item.price}</span>}
          </div>
        </div>
      </div>

      <button
        className={styles.removeBtn}
        onClick={() => dispatch(removeFromCart(item.id))}
      >
        ✕
      </button>
    </div>
  );
}
