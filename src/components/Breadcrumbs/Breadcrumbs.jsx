import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs({ customLabel, customCategory }) {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);

  const crumbs = [{ name: "Main page", path: "/" }];


  if (parts[0] === "categories") {
    crumbs.push({ name: "Categories", path: "/categories" });
  }

  // Category page
  if (parts[0] === "category") {
    crumbs.push({ name: "Categories", path: "/categories" });

    if (parts[1] && !customLabel) {
      crumbs.push({
        name: customCategory ?? "Category",
        path: location.pathname,
      });
    }
  }

  // All products
  if (parts[0] === "products") {
    crumbs.push({ name: "All products", path: "/products" });
  }

  // Product page
  if (parts[0] === "product") {
    crumbs.push({ name: "All products", path: "/products" });

    if (customCategory) {
      crumbs.push({
        name: customCategory,
        path: `/category/${parts[1]}`,
      });
    }

    crumbs.push({
      name: customLabel ?? "Product",
      path: location.pathname,
    });
  }

  // Sales
  if (parts[0] === "sales") {
    crumbs.push({ name: "Sales", path: "/sales" });
  }

  return (
    <div className={styles.breadcrumbs}>
      {crumbs.map((c, i) => (
        <div key={i} className={styles.itemWrap}>
          {i > 0 && <div className={styles.divider} />}

          {i === crumbs.length - 1 ? (
            <span className={`${styles.pill} ${styles.active}`}>{c.name}</span>
          ) : (
            <Link className={styles.pill} to={c.path}>
              {c.name}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
