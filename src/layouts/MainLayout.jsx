import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import Contact from "../components/Contact/Contact.jsx";
import styles from "./MainLayout.module.css";

export default function MainLayout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Contact />
    </div>
  );
}
