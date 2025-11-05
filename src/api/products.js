import axios from "./http";

const API_URL = axios.defaults.baseURL;

export const getAllProducts = async () => {
  const { data } = await axios.get("/products/all");
  return data.map((p) => ({ ...p, image: `${API_URL}${p.image}` }));
};
