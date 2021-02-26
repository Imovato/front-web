import axios from 'axios'

export const apiCrud = axios.create({
  baseURL: "http://localhost:8081/CrudService/api/"
})
