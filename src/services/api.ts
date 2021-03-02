import axios from "axios";

export const apiCrud = axios.create({
  baseURL: "http://localhost:8081/CrudService/api/",
});

export const apiProperty = axios.create({
  baseURL: "http://localhost:3003/",
});
