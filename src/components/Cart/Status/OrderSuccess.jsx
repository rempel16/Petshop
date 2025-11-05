import styles from "./Status.module.css";

export default function OrderSuccess({ onClose }) {
  return (
    <div className={styles.modalWrap}>
      <div className={styles.modal}>
        <h2>Order successful</h2>
        <p>Your order has been received. We will contact you soon!</p>
        <button className="btn btn-primary" onClick={onClose}>
          Continue shopping
        </button>
      </div>
    </div>
  );
}
