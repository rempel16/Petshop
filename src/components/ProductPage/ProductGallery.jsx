import ProductGallery from "../../components/ProductGallery/ProductGallery";
import ProductInfo from "../../components/ProductInfo/ProductInfo";

<div className={styles.wrapper}>
  <ProductGallery image={product.image} title={product.title} />
  <ProductInfo product={product} setToast={setToast} />
</div>;
