import axios from "axios";

export const http = axios.create({
  baseURL: "http://server4xh.vps.webdock.cloud:8080",
  headers: {
    "Content-type": "application/json",
    "Cache-Control": "no-cache",
  },
});
