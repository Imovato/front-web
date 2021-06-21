import axios from "axios";

export const apiAuth = axios.create({
  baseURL: "http://localhost:8083/users",
});

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
  baseURL: "http://localhost:8085/rentService/rent",
});

export const apiAcquisition = axios.create({
  baseURL: "http://localhost:8084/acquisitionService/acquisition",
});

export const apiMock = axios.create({
  baseURL: "http://localhost:3003/",
});
