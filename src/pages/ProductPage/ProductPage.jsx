import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/products";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import styles from "./ProductPage.module.css";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProducts().then((data) => {
      const found = data.find((p) => p.id === Number(id));
      setProduct(found);
    });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const price = product.discont_price || product.price;

  return (
    <section className="section section--with-breadcrumbs">
      <div className="container">
        <Breadcrumbs customLabel={product.title} />

        <div className={styles.wrapper}>
          <div className={styles.image}>
            <img src={product.image} alt={product.title} />
          </div>

          <div className={styles.info}>
            <h2 className="title">{product.title}</h2>

            <div className={styles.priceBlock}>
              <span className={styles.price}>${price}</span>
              {product.discont_price && (
                <span className={styles.old}>${product.price}</span>
              )}
            </div>

            <p className={styles.desc}>{product.description}</p>

            <button
              className="btn btn-primary"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
