import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import MainLayout from "./layouts/MainLayout.jsx";
import Toast from "./components/Toast/Toast.jsx";

// Pages
import Home from "./pages/Home/Home.jsx";
import Categories from "./pages/Categories/Categories.jsx";
import AllProducts from "./pages/AllProducts/AllProducts.jsx";
import Sales from "./pages/Sales/Sales.jsx";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import CartPage from "./pages/CartPage/CartPage.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

export default function App() {
  const [toast, setToast] = useState("");

  return (
    <>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}

      <Routes>
        <Route path="/" element={<MainLayout setToast={setToast} />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="sales" element={<Sales />} />
          <Route path="category/:id" element={<CategoryProducts />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
