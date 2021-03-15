import axios from "axios";

export const apiUser = axios.create({
  baseURL: "http://localhost:8081/crudService/api/user",
});

export const apiProperty = axios.create({
  baseURL: "http://localhost:8081/crudService/api/property",
});
