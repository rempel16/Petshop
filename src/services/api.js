import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllProducts = async () => {
  const res = await axios.get(`${API_URL}/products/all`);
  return res.data;
};

