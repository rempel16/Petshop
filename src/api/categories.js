import axios from "./http";

const API_URL = axios.defaults.baseURL;

export const getAllCategories = async () => {
  const { data } = await axios.get("/categories/all");
  return data.map((c) => ({ ...c, image: `${API_URL}${c.image}` }));
};

export const getCategoryById = async (id) => {
  const { data } = await axios.get(`/categories/${id}`);
  return { ...data, image: `${API_URL}${data.image}` };
};
