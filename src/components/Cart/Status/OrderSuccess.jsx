import { Link } from "react-router-dom";
import styles from "./Status.module.css";

export default function OrderSuccess() {
  return (
    <div className={styles.statusBox}>
      <h2>✅ Order placed successfully!</h2>
      <p>Thank you for your purchase 🎉</p>

      <Link to="/products" className="btn btn-primary">
        Continue shopping
      </Link>
    </div>
  );
}
