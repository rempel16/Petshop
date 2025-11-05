import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { sendOrder } from "../../../api/order";
import {
  clearCart,
  setOrderSuccess,
  setOrderError,
} from "../../../features/cart/cartSlice";
import styles from "./OrderForm.module.css";
import { useOutletContext } from "react-router-dom";

export default function OrderForm() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const { setToast } = useOutletContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const orderData = {
      ...data,
      products: items,
    };

    try {
      await sendOrder(orderData); 
      dispatch(setOrderSuccess());
      dispatch(clearCart());
      reset();
      setToast("Order placed successfully");
    } catch (error) {
      dispatch(setOrderError());
      setToast("Error placing order");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Order details</h3>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
          placeholder="Phone"
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

        <button className="btn btn-primary" type="submit">
          Order
        </button>
      </form>
    </div>
  );
}
