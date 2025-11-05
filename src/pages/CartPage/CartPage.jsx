import { useSelector, useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";

import CartItemsList from "../../components/Cart/CartItemsList/CartItemsList";
import OrderForm from "../../components/Cart/OrderForm/OrderForm";

import EmptyCart from "../../components/Cart/Status/EmptyCart";
import OrderSuccess from "../../components/Cart/Status/OrderSuccess";
import OrderFail from "../../components/Cart/Status/OrderFail";

import { resetCartStatus } from "../../features/cart/cartSlice";

export default function CartPage() {
  const items = useSelector((state) => state.cart.items);
  const status = useSelector((state) => state.cart.status);

  const dispatch = useDispatch();
  const { setToast } = useOutletContext();

  if (status === "success") {
    return (
      <OrderSuccess
        onClose={() => {
          dispatch(resetCartStatus());
          setToast("Order placed successfully");
        }}
      />
    );
  }

  if (status === "error") {
    return (
      <OrderFail
        onClose={() => {
          dispatch(resetCartStatus());
          setToast("Something went wrong");
        }}
      />
    );
  }

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
