import styles from "./OrderSuccess.module.css";

export default function OrderSuccess({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>

        <h2 className={styles.title}>Congratulations!</h2>

        <p className={styles.text}>
          Your order has been successfully placed on the website.
          <br />A manager will contact you shortly to confirm your order.
        </p>
      </div>
    </div>
  );
}
