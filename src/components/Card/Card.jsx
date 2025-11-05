import styles from "./Card.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";

export default function Card({ type = "product", item }) {
  const isProduct = type === "product";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hasDiscount = !!item.discont_price;
  const discountPercent = hasDiscount
    ? Math.round(((item.price - item.discont_price) / item.price) * 100)
    : null;

  const handleClick = (e) => {
    if (e.target.tagName === "BUTTON") return;

    if (isProduct) {
      navigate(`/product/${item.id}`);
    } else {
      navigate(`/category/${item.id}`);
    }
  };

  return (
    <div
      className={`${styles.card} ${
        isProduct ? styles.product : styles.category
      }`}
      onClick={handleClick}
    >
      <div
        className={`${styles.imageWrap} ${
          isProduct ? styles.productImg : styles.categoryImg
        }`}
      >
        {isProduct && hasDiscount && (
          <span className={styles.badge}>-{discountPercent}%</span>
        )}

        <img src={item.image} alt={item.title} />

        {isProduct && (
          <button
            className={`btn btn-primary ${styles.cardButton}`}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addToCart(item)); // ✅ Redux добавление
            }}
          >
            Add to cart
          </button>
        )}
      </div>

      <div className={styles.info}>
        <p className={styles.title}>{item.title}</p>

        {isProduct && (
          <div className={styles.priceWrap}>
            {hasDiscount ? (
              <>
                <span className={styles.price}>${item.discont_price}</span>
                <span className={styles.old}>${item.price}</span>
              </>
            ) : (
              <span className={styles.price}>${item.price}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
