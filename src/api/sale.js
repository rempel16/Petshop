import axios from "./axios";

export const sendSale = (payload) => axios.post("/sale/send", payload);
