// src/components/Breadcrumbs/Breadcrumbs.jsx
import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs({ customLabel }) {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);

  // нормализация сегментов
  const normalized = parts.map((p) => {
    if (p === "category") return "categories";
    if (p === "product") return "products";
    return p;
  });

  const crumbs = [
    { name: "Main page", path: "/" },
    ...normalized.map((part, idx) => {
      // спец-случай: если это "products", то путь всегда /products
      const path =
        part === "products"
          ? "/products"
          : "/" + normalized.slice(0, idx + 1).join("/");

      const isLast = idx === normalized.length - 1;
      let label = part;
      if (part === "categories") label = "Categories";
      if (part === "products") label = "All products";
      if (isLast && customLabel) label = customLabel;

      return { name: label, path };
    }),
  ];

  return (
    <div className={styles.breadcrumbs}>
      {crumbs.map((c, i) => (
        <div key={c.path} className={styles.itemWrap}>
          {i > 0 && <div className={styles.divider} />}
          <Link
            className={`${styles.pill} ${
              i === crumbs.length - 1 ? styles.active : ""
            }`}
            to={c.path}
          >
            {c.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
