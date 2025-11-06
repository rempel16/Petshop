import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/products";
import { getAllCategories } from "../../api/categories";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Card from "../../components/Card/Card";
import FilterBar from "../../components/FilterBar/FilterBar";

export default function CategoryProducts() {
  const { id } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [filters, setFilters] = useState({
    sort: "",
    minPrice: "",
    maxPrice: "",
    discountOnly: false,
  });

  // Load products in category
  useEffect(() => {
    getAllProducts().then((data) => {
      const filtered = data.filter(
        (p) => Number(p.categoryId ?? p.category_id) === Number(id)
      );
      setAllProducts(filtered);
      setProducts(filtered);
    });

    getAllCategories().then((cats) => {
      const found = cats.find((c) => c.id === Number(id));
      setCategoryName(found?.title || "Category");
    });
  }, [id]);

  // filters
  useEffect(() => {
    let result = [...allProducts];

    if (filters.discountOnly) {
      result = result.filter((p) => p.discont_price);
    }

    if (filters.minPrice) {
      result = result.filter(
        (p) => (p.discont_price ?? p.price) >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      result = result.filter(
        (p) => (p.discont_price ?? p.price) <= Number(filters.maxPrice)
      );
    }

    if (filters.sort === "price: low-high") {
      result.sort(
        (a, b) => (a.discont_price ?? a.price) - (b.discont_price ?? b.price)
      );
    }

    if (filters.sort === "price: high-low") {
      result.sort(
        (a, b) => (b.discont_price ?? b.price) - (a.discont_price ?? a.price)
      );
    }

    if (filters.sort === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setProducts(result);
  }, [filters, allProducts]);

  const noProducts = products.length === 0;

  return (
    <section className="section section--with-breadcrumbs">
      <div className="container">
        <Breadcrumbs customLabel={categoryName} />
        <h2 className="title">{categoryName}</h2>

        {/* FilterBar*/}
        <FilterBar onFilterChange={setFilters} />

        {noProducts ? (
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <p>No products in this category yet 🐾</p>
            <Link
              to="/products"
              className="btn btn-outline"
              style={{ marginTop: 16 }}
            >
              All products
            </Link>
          </div>
        ) : (
          <div className="grid">
            {products.map((item) => (
              <Card key={item.id} type="product" item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
