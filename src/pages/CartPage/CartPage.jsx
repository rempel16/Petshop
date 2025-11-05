import { useSelector } from "react-redux";
import CartItemsList from "../../components/Cart/CartItemsList/CartItemsList";
import OrderForm from "../../components/Cart/OrderForm/OrderForm";

import EmptyCart from "../../components/Cart/Status/EmptyCart";
import OrderSuccess from "../../components/Cart/Status/OrderSuccess";
import OrderFail from "../../components/Cart/Status/OrderFail";

export default function CartPage() {
  const items = useSelector((state) => state.cart.items);
  const cartStatus = useSelector((state) => state.cart.status);
  // status: idle | success | error

  if (cartStatus === "success") return <OrderSuccess />;
  if (cartStatus === "error") return <OrderFail />;

  if (items.length === 0) return <EmptyCart />;

  return (
    <section className="section">
      <div className="container cart-page">
        <div className="cart-left">
          <CartItemsList />
        </div>

        <div className="cart-right">
          <OrderForm />
        </div>
      </div>
    </section>
  );
}
