import { Link } from "react-router-dom";
import styles from "./Status.module.css";

export default function EmptyCart() {
  return (
    <div className={styles.statusBox}>
      <h2>Your cart is empty 🛒</h2>
      <p>Looks like you haven't added anything yet.</p>

      <Link to="/products" className="btn btn-primary">
        Continue shopping
      </Link>
    </div>
  );
}
