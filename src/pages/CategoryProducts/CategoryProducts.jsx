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
    // Load products of category
    getAllProducts().then((data) => {
      const filtered = data.filter(
        (p) => Number(p.categoryId ?? p.category_id) === Number(id)
      );
      setProducts(filtered);
    });

    // Load category name
    getAllCategories().then((cats) => {
      const found = cats.find((c) => c.id === Number(id));
      setCategoryName(found?.title || "Category");
    });
  }, [id]);

  return (
    <section className="section section--with-breadcrumbs">
      <div className="container">
        <Breadcrumbs customLabel={categoryName} />
        <h2 className="title">{categoryName}</h2>

        <div className="grid">
          {products.length === 0 ? (
            <div style={{ textAlign: "center" }}>
              <p>There are no products yet. Check out other products. 🐾</p>
              <Link
                to="/products"
                className="btn btn--outline"
                style={{ marginTop: 16 }}
              >
                All products
              </Link>
            </div>
          ) : (
            products.map((item) => (
              <Card key={item.id} type="product" item={item} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
