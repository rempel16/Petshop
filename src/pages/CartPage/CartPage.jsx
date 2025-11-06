import { useSelector, useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

import CartItemsList from "../../components/Cart/CartItemsList/CartItemsList";
import OrderForm from "../../components/Cart/OrderForm/OrderForm";
import SectionHeader from "../../components/SectionHeader/SectionHeader";

import EmptyCart from "../../components/Cart/Status/EmptyCart/EmptyCart";
import OrderSuccess from "../../components/Cart/Status/OrderSuccess/OrderSuccess";
import OrderFail from "../../components/Cart/Status/OrderFail";

import { resetCartStatus } from "../../features/cart/cartSlice";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const items = useSelector((state) => state.cart.items);
  const status = useSelector((state) => state.cart.status);
  const dispatch = useDispatch();
  const { setToast } = useOutletContext();

  // SUCCESS
  if (status === "success") {
    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = "auto");
    }, []);

    return (
      <>
        <SectionHeader
          title="Shopping cart"
          link="/products"
          linkText="Back to the store"
        />

        <OrderSuccess
          onClose={() => {
            dispatch(resetCartStatus());
            setToast("Order placed successfully");
          }}
        />
      </>
    );
  }

  // ERROR
  if (status === "error") {
    return <OrderFail onClose={() => dispatch(resetCartStatus())} />;
  }

  return (
    <section className={styles.cartSection}>
      <SectionHeader
        title="Shopping cart"
        link="/products"
        linkText="Back to the store"
      />

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className={styles.divider}></div>

          <div className={styles.cartGrid}>
            <div className={styles.left}>
              <CartItemsList />
            </div>

            <div className={styles.right}>
              <OrderForm />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
