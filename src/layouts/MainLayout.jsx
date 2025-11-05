import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { useState, useEffect } from "react";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import Toast from "../components/Toast/Toast";

export default function MainLayout() {
  const [toast, setToast] = useState(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!toast) return;

    setVisible(true);

    const hideTimer = setTimeout(() => setVisible(false), 1000);
    const removeTimer = setTimeout(() => {
      setToast(null);
      setVisible(true);
    }, 1400);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [toast]);

  return (
    <>
      <Header />

      {toast && <Toast message={toast} visible={visible} />}

      <main>
        <Outlet context={{ setToast }} />
      </main>

      <Contact />
      <Footer />
    </>
  );
}
