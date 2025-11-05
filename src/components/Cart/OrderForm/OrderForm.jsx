import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { sendOrder } from "../../../api/order";
import { clearCart } from "../../../features/cart/cartSlice";
import styles from "./OrderForm.module.css";
import { useState } from "react";

export default function OrderForm() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [status, setStatus] = useState(null); // success | error

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
      await axios.post("http://localhost:3333/order/send", orderData);
      await sendOrder(orderData);
      setStatus("success");
      dispatch(clearCart());
      reset();
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Order details</h3>

      {status === "success" && (
        <div className={styles.success}>Order placed successfully!</div>
      )}

      {status === "error" && (
        <div className={styles.error}>Something went wrong. Try again.</div>
      )}

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
