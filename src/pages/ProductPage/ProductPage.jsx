import { useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

import ProductGallery from "../../components/ProductGallery/ProductGallery";
import ProductInfo from "../../components/ProductInfo/ProductInfo";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

import styles from "./ProductPage.module.css";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";

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

        let productData = data;

        if (Array.isArray(data)) {
          productData = data.find((p) => String(p.id) === String(id));
        }

        if (!productData) {
          setProduct(null);
          return;
        }

        const rawImage = productData.image || productData.images?.[0] || null;

        const normalizedImage =
          rawImage && rawImage.startsWith("/") ? BASE_URL + rawImage : rawImage;

        setProduct({
          ...productData,
          image: normalizedImage,
        });
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Error", err);
        setError("Failed to load product data.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

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

  const images = product.images || [product.image];

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
