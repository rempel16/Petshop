import { useEffect, useState } from "react";
import styles from "./ProductGallery.module.css";
import placeholder from "../../assets/images/image123.png";

export default function ProductGallery({ images, title }) {
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";

  const extractUrls = (input) => {
    if (!input) return [];

    if (Array.isArray(input)) {
      return input
        .map((x) =>
          typeof x === "string"
            ? x
            : x?.url || x?.src || x?.image || x?.path || x?.href || ""
        )
        .filter(Boolean)
        .map((url) => (url.startsWith("/") ? BASE_URL + url : url));
    }

    if (typeof input === "string") {
      return [input.startsWith("/") ? BASE_URL + input : input];
    }
    if (typeof input === "object") {
      const single =
        input.url || input.src || input.image || input.path || input.href || "";
      return single
        ? [single.startsWith("/") ? BASE_URL + single : single]
        : [];
    }

    return [];
  };

  let normalized = extractUrls(images);

  normalized = Array.from(new Set(normalized));

  if (normalized.length === 0) {
    normalized = [placeholder, placeholder, placeholder, placeholder];
  } else if (normalized.length === 1) {
    normalized = [normalized[0], placeholder, placeholder, placeholder];
  } else if (normalized.length === 2) {
    normalized = [...normalized, placeholder, placeholder];
  } else if (normalized.length > 4) {
    normalized = normalized.slice(0, 4);
  }

  const [selected, setSelected] = useState(normalized[0]);

  useEffect(() => {
    setSelected(normalized[0]);
  }, [normalized.join("|")]);

  return (
    <div className={styles.gallery}>
      <div className={styles.thumbs}>
        {normalized.slice(0, 3).map((img, index) => (
          <img
            key={index}
            src={img || placeholder}
            alt={`${title || "product"} thumbnail ${index + 1}`}
            className={`${styles.thumb} ${
              selected === img ? styles.active : ""
            }`}
            onClick={() => setSelected(img || placeholder)}
            onError={(e) => (e.currentTarget.src = placeholder)}
          />
        ))}
      </div>

      <div className={styles.mainImage}>
        <img
          src={selected || placeholder}
          alt={title || "product image"}
          onError={(e) => (e.currentTarget.src = placeholder)}
        />
      </div>
    </div>
  );
}
