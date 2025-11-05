import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/products";
import Card from "../../components/Card/Card";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import FilterBar from "../../components/FilterBar/FilterBar";

export default function Sales() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [mode, setMode] = useState("Default");

  useEffect(() => {
    getAllProducts().then((data) => {
      const saleItems = data.filter((p) => p.discont_price);
      setProducts(saleItems);
      setFiltered(saleItems);
    });
  }, []);

  useEffect(() => {
    let sorted = [...products];

    if (mode === "Price Low–High") {
      sorted.sort(
        (a, b) => (a.discont_price ?? a.price) - (b.discont_price ?? b.price)
      );
    }

    if (mode === "Price High–Low") {
      sorted.sort(
        (a, b) => (b.discont_price ?? b.price) - (a.discont_price ?? a.price)
      );
    }

    setFiltered(sorted);
  }, [mode, products]);

  return (
    <section className="section section--with-breadcrumbs">
      <div className="container">
        <Breadcrumbs customLabel="Sales" />
        <h2 className="title">Discounted items</h2>

        <FilterBar active={mode} onChange={setMode} />

        <div className="grid">
          {filtered.map((item) => (
            <Card key={item.id} type="product" item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
