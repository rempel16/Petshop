import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts";

// Pages
import Home from "./pages/Home/Home.jsx";
import Categories from "./pages/Categories/Categories.jsx";
import AllProducts from "./pages/AllProducts/AllProducts.jsx";
import Sales from "./pages/Sales/Sales.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import CartPage from "./pages/CartPage/CartPage.jsx";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="categories" element={<Categories />} />
        <Route path="products" element={<AllProducts />} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        <Route path="sales" element={<Sales />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
