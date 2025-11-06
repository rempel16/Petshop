import { Link } from "react-router-dom";
import styles from "./EmptyCart.module.css";

export default function EmptyCart() {
  return (
    <section className={styles.section}>
      <div className={styles.centerBlock}>
        <p className={styles.text}>
          Looks like you have no items in your basket currently.
        </p>

        <Link to="/products" className={`btn btn-primary ${styles.btn}`}>
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}
