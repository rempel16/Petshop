import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
          <h4 className={styles.title}>Petshop</h4>
          <p className={styles.text}>
            The best products for your fluffy friends
          </p>
        <div className={styles.bottom}>
        © {year} Petshop • All rights reserved
      </div>
      </div>

      
    </footer>
  );
}
