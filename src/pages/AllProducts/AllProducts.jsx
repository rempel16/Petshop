import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/products";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import FilterBar from "../../components/FilterBar/FilterBar";
import Card from "../../components/Card/Card";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    sort: "",
    minPrice: "",
    maxPrice: "",
    discountOnly: false,
  });

  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data);
      setFiltered(data);
    });
  }, []);

  // 🧠 Apply filters
  useEffect(() => {
    let result = [...products];

    // Filter by discount
    if (filters.discountOnly) {
      result = result.filter((p) => p.discont_price);
    }

    // Price filters
    if (filters.minPrice) {
      result = result.filter(
        (p) => (p.discont_price || p.price) >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      result = result.filter(
        (p) => (p.discont_price || p.price) <= Number(filters.maxPrice)
      );
    }

    // Sorting
    if (filters.sort === "price: low-high") {
      result.sort(
        (a, b) => (a.discont_price || a.price) - (b.discont_price || b.price)
      );
    }
    if (filters.sort === "price: high-low") {
      result.sort(
        (a, b) => (b.discont_price || b.price) - (a.discont_price || a.price)
      );
    }
    if (filters.sort === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFiltered(result);
  }, [filters, products]);

  return (
    <section className="section section--with-breadcrumbs">
      <div className="container">
        <Breadcrumbs />
        <h2 className="title">All products</h2>

        <FilterBar onFilterChange={setFilters} />

        <div className="grid">
          {filtered.map((item) => (
            <Card key={item.id} type="product" item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
