import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/products";
import { getAllCategories } from "../../api/categories";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Card from "../../components/Card/Card";

export default function CategoryProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    getAllProducts().then((data) => {
      const filtered = data.filter(
        (p) => Number(p.categoryId ?? p.category_id) === Number(id)
      );
      setProducts(filtered);
    });

    getAllCategories().then((cats) => {
      const found = cats.find((c) => c.id === Number(id));
      setCategoryName(found?.title || "Category");
    });
  }, [id]);

  const noProducts = products.length === 0;

  return (
    <section className="section section--with-breadcrumbs">
      <div className="container">
        <Breadcrumbs customLabel={categoryName} />
        <h2 className="title">{categoryName}</h2>

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
