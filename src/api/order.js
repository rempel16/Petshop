import axios from "./axios";

export async function sendOrder(data) {
  return axios.post("/order/send", data);
}
