import styles from "./Status.module.css";

export default function OrderFail() {
  return (
    <div className={styles.statusBox}>
      <h2> Something went wrong</h2>
      <p>Please try again later.</p>
    </div>
  );
}
