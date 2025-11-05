import axios from "./http";

export const sendOrder = (order) => axios.post("/order/send", order);
