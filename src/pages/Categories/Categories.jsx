import { useEffect, useState } from "react";
import { getAllCategories } from "../../api/categories";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Card from "../../components/Card/Card";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  return (
    <section className="section section--with-breadcrumbs">
      <div className="container">
        <Breadcrumbs />
        <h2 className="title">Categories</h2>

        <div className="grid">
          {categories.map((cat) => (
            <Card
              key={cat.id}
              type="category"
              item={cat}
              link={`/categories/${cat.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
