import axios from "axios";

export const http = axios.create({
  baseURL: process.env.APIGATEWAY || "http://localhost:8080",
  headers: {
    "Content-type": "application/json",
    "Cache-Control": "no-cache",
  },
});
