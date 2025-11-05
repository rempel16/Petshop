import { useState } from "react";
import { sendSale } from "../../../api/sale";
import styles from "./SubscribeForm.module.css";

export default function SubscribeForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phone, email } = form;

    // simple validation
    if (!name || !phone || !email) {
      setError("Please fill all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email");
      return;
    }

    if (!/^[0-9+\-\s]{6,}$/.test(phone)) {
      setError("Invalid phone");
      return;
    }

    setError("");

    try {
      await sendSale({ name, phone, email });
      setError("");
      setSubmitted(true);
    } catch (err) {
      setError("Server error. Try again later.");
      console.error(err);
    }
  };

  if (submitted) {
    return (
      <div className={styles.message}>
        <h3>You’ve got 5% off!</h3>
        <p>To apply the discount, enter the received code in the cart.</p>
        <strong>PROMO: WELCOME5%</strong>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className={styles.input}
      />

      <input
        name="phone"
        type="tel"
        placeholder="Phone number"
        value={form.phone}
        onChange={handleChange}
        className={styles.input}
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className={styles.input}
      />

      {error && <div className={styles.error}>{error}</div>}

      <button type="submit" className="btn btn-secondary">
        Get discount
      </button>
    </form>
  );
}
