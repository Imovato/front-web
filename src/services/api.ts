import axios from "axios";

export const apiUser = axios.create({
  baseURL: "http://localhost:8081/crudService/api/user",
});

export const apiProperty = axios.create({
  baseURL: "http://localhost:8081/crudService/api/property",
});

export const apiPropertyImages = axios.create({
  baseURL: "http://localhost:8081/crudService/images/property",
});

export const apiContact = axios.create({
  baseURL: "http://localhost:8081/crudService/api/contact",
});

export const apiRent = axios.create({
  baseURL: "http://localhost:8083/rentService/rent",
});

export const apiPayment = axios.create({
  baseURL: "http://localhost:8083/paymentService/",
});

export const apiMock= axios.create({
  baseURL: "http://localhost:3003/",
});
