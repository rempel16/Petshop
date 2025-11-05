import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <section className={`section ${styles.notFound}`}>
      <div className="container">
        <img
          src="/src/assets/images/404.png"
          alt="404 Not Found"
          className={styles.img}
        />

        <h1 className={styles.title}>Page Not Found</h1>

        <p className={styles.subtext}>
          {" "}
          We’re sorry, the page you requested could not be found. <br /> Please
          go back to the homepage.
        </p>

        <Link to="/" className={styles.btn}>
          Go Home
        </Link>
      </div>
    </section>
  );
}
