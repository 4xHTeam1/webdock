import axios from "axios";

export const http = axios.create({
  baseURL: "APIGATEWAY",
  headers: {
    "Content-type": "application/json",
    "Cache-Control": "no-cache",
  },
});
