import styles from "./Status.module.css";

export default function OrderFail({ onClose }) {
  return (
    <div className={styles.modalWrap}>
      <div className={styles.modal}>
        <h2>Order failed</h2>
        <p>Something went wrong. Please try again.</p>
        <button className="btn btn-primary" onClick={onClose}>
          Try again
        </button>
      </div>
    </div>
  );
}
