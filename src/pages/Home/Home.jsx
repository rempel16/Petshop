import { useEffect, useState } from "react";
import { getAllCategories } from "../../api/categories";
import { getAllProducts } from "../../api/products";
import Card from "../../components/Card/Card";
import styles from "./Home.module.css";
import Hero from "../../components/Hero/Hero";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import SubscribeBlock from "../../components/SubscribeBlock/SubscribeBlock";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  


  useEffect(() => {
    getAllCategories().then((data) => setCategories(data.slice(0, 4)));
    getAllProducts().then((data) => setProducts(data.slice(0, 8)));
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.heroWrap}>
        <Hero />
      </div>

      {/* Categories */}
      <section className="section">
        <SectionHeader
          title="Shop by category"
          link="/categories"
          linkText="All categories"
        />
        <div className="grid">
          {categories.map((cat) => (
            <Card
              key={cat.id}
              type="category"
              item={cat}
              link={`/category/${cat.id}`}
            />
          ))}
        </div>
      </section>

      {/* Promo banner */}
      <SubscribeBlock />

      {/* Products */}
      <section className="section">
        <SectionHeader title="Sales" link="/sales" linkText="All sales" />

        <div className="grid">
          {products.map((p) => (
            <Card key={p.id} type="product" item={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
