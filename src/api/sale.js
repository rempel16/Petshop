import axios from "./http";

export const sendSale = (payload) => axios.post("/sale/send", payload);
