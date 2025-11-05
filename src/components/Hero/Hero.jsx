import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";

export default function Hero() {
  const navigate = useNavigate();

  const goToSales = () => {
    navigate("/sales");
  };

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>
          Amazing Discounts <br /> on Pets Products!
        </h1>

        <button className="btn btn-primary" onClick={goToSales}>
          Check out
        </button>
      </div>
    </section>
  );
}
