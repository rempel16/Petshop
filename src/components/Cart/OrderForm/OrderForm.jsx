import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { sendOrder } from "../../../api/order";
import {
  clearCart,
  setOrderSuccess,
  setOrderError,
} from "../../../features/cart/cartSlice";
import { selectCartTotal } from "../../../features/cart/selectors";
import styles from "./OrderForm.module.css";

export default function OrderForm() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = useSelector(selectCartTotal);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const orderData = { ...data, total, products: items };
    try {
      await sendOrder(orderData);
      dispatch(setOrderSuccess());
      dispatch(clearCart());
      reset();
    } catch (err) {
      dispatch(setOrderError());
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Order details</h3>

        <div className={styles.summary}>
          <h3>{items.length} items</h3>
          <div className={styles.totalRow}>
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" value={total} {...register("total")} />

        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="Name"
          className={styles.input}
        />
        {errors.name && <p className={styles.error}>Enter your name</p>}

        <input
          {...register("phone", { required: true })}
          type="tel"
          placeholder="Phone number"
          className={styles.input}
        />
        {errors.phone && <p className={styles.error}>Enter your phone</p>}

        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
          className={styles.input}
        />
        {errors.email && <p className={styles.error}>Enter your email</p>}

        <button className={styles.btnSubmit} type="submit">
          Order
        </button>
      </form>
    </div>
  );
}
