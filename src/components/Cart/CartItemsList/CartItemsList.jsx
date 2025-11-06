import { useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem.jsx";
import EmptyCart from "../Status/EmptyCart/EmptyCart.jsx";
import styles from "./CartItemsList.module.css";

export default function CartItemsList() {
  const cart = useSelector((state) => state.cart.items);

  if (!cart.length) return <EmptyCart />;

  return (
    <div className={styles.list}>
      {cart.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}
