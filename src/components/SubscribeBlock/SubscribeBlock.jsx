import SubscribeForm from "./SubscribeForm/SubscribeForm";
import styles from "./SubscribeBlock.module.css";

export default function SubscribeBlock() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h3 className={styles.title}>5% off on the first order</h3>

        <div className={styles.content}>
          <div className={styles.image}>
            <img src="/src/assets/images/image.svg" alt="Animals" />
          </div>
          <div className={styles.formWrap}>
            <SubscribeForm />
          </div>
        </div>
      </div>
    </section>
  );
}
