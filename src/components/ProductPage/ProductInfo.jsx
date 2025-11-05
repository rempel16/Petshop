import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import QuantityCounter from "../QuantityCounter/QuantityCounter";

export default function ProductInfo({ product, setToast }) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [qty, setQty] = useState(1);

  const textLimit = 684;
  const isLong = product.description.length > textLimit;
  const shortText = product.description.slice(0, textLimit);

  const handleAdd = () => {
    dispatch(addToCart({ ...product, qty }));
    setToast?.("Item added to cart");
  };

  return (
    <div>
      <h2 className="title">{product.title}</h2>
      <div>
        <span style={{ fontSize: "32px", fontWeight: 700 }}>
          ${product.discont_price || product.price}
        </span>
        {product.discont_price && (
          <span style={{ marginLeft: 8, textDecoration: "line-through" }}>
            ${product.price}
          </span>
        )}
      </div>
      <p>
        {expanded ? product.description : shortText}
        {isLong && !expanded && "..."}

        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{ marginLeft: 8 }}
          >
            {expanded ? "Hide" : "Read more"}
          </button>
        )}
      </p>
      const [qty, setQty] = useState(1);
      <ProductQtyCounter onChange={setQty} />
      <button
        className="btn btn-primary"
        onClick={() => {
          dispatch(addToCart({ ...product, qty }));
          setToast?.("Item added to cart");
        }}
      >
        Add to cart
      </button>
      <button className="btn btn-primary" onClick={handleAdd}>
        Add to cart
      </button>
    </div>
  );
}
