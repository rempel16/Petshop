import axios from "./axios";

export const sendOrder = (order) => axios.post("/order/send", order);
