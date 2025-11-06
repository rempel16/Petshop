import { Link } from "react-router-dom";
import styles from "./EmptyCart.module.css";

export default function EmptyCart() {
  return (
    <section className={styles.emptyWrap}>
      <h2 className={styles.title}>Shopping cart</h2>

      <div className={styles.box}>
        <p className={styles.text}>
          Looks like you have no items in your basket currently.
        </p>

        <Link to="/products" className={styles.button}>
          Back to the store
        </Link>
      </div>
    </section>
  );
}
