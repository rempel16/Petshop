import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderFail() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/404");
  }, [navigate]);

  return null;
}
