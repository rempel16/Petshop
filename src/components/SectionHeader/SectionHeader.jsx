import { Link } from "react-router-dom";
import styles from "./SectionHeader.module.css";

export default function SectionHeader({ title, link, linkText }) {
  return (
    <div className={styles.wrap}>
      <h2>{title}</h2>
      <div className={styles.line}></div>
      {link && <Link to={link}>{linkText}</Link>}
    </div>
  );
}
