import { useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/products";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ProductQtyCounter from "../../components/ProductQtyCounter/ProductQtyCounter";
import styles from "./ProductPage.module.css";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const { setToast } = useOutletContext();

  useEffect(() => {
    getAllProducts().then((data) => {
      const found = data.find((p) => p.id === Number(id));
      setProduct(found);
    });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const price = product.discont_price || product.price;
  const shortDesc = product.description.slice(0, 680);
  const showReadMore = product.description.length > 680;

  return (
    <section className="section section--with-breadcrumbs">
      <div className="container">
        <Breadcrumbs customLabel={product.title} />

        <div className={styles.wrapper}>
          {/* LEFT BLOCK — IMAGE */}
          <div className={styles.image}>
            <img src={product.image} alt={product.title} />
          </div>

          {/* RIGHT BLOCK — TEXT */}
          <div className={styles.info}>
            <h2 className={styles.title}>{product.title}</h2>

            <div className={styles.priceBlock}>
              <span className={styles.price}>${price}</span>
              {product.discont_price && (
                <span className={styles.old}>${product.price}</span>
              )}
            </div>
            <div className={styles.actions}>
              <ProductQtyCounter onChange={setQty} />

              <button
                className="btn btn-primary"
                onClick={() => {
                  dispatch(addToCart({ ...product, qty }));
                  setToast?.("Added to cart");
                }}
              >
                Add to cart
              </button>
            </div>
            <p className={styles.desc}>
              {expanded ? product.description : shortDesc}
              {showReadMore && !expanded && "..."}
            </p>

            {showReadMore && (
              <button
                className={styles.moreBtn}
                onClick={() => setExpanded((p) => !p)}
              >
                {expanded ? "Hide" : "Read more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
