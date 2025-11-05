import { useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

import ProductGallery from "../../components/ProductGallery/ProductGallery";
import ProductInfo from "../../components/ProductInfo/ProductInfo";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

import styles from "./ProductPage.module.css";

export default function ProductPage() {
  const { id } = useParams();
  const { setToast } = useOutletContext();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");

    axios
      .get(`/products/${id}`)
      .then(({ data }) => {
        if (!isMounted) return;

        // если backend возвращает массив всех товаров
        if (Array.isArray(data)) {
          const found = data.find((p) => String(p.id) === String(id));
          setProduct(found);
        }
        // если backend возвращает объект одного товара
        else {
          setProduct(data);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Ошибка при загрузке продукта:", err);
        setError("Failed to load product data.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // состояния загрузки / ошибки
  if (loading)
    return (
      <section className="section">
        <div className="container">Loading product...</div>
      </section>
    );

  if (error)
    return (
      <section className="section">
        <div className="container">{error}</div>
      </section>
    );

  if (!product)
    return (
      <section className="section">
        <div className="container">Product not found.</div>
      </section>
    );

  // извлекаем изображения (универсально)
  const images =
    product.images ||
    (product.image
      ? [product.image]
      : [
          "/src/assets/images/image123.png",
          "/src/assets/images/image123.png",
          "/src/assets/images/image123.png",
          "/src/assets/images/image123.png",
        ]);

  return (
    <section className="section section--with-breadcrumbs">
      <div className="container">
        <Breadcrumbs customLabel={product.title} />

        <div className={styles.wrapper}>
          <ProductGallery images={images} title={product.title} />
          <ProductInfo product={product} setToast={setToast} />
        </div>
      </div>
    </section>
  );
}
