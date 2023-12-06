import axios from "axios";

export const webdockHttp = axios.create({
  baseURL: "https://webdock.io/en/platform_data",
  headers: {
    "Content-type": "application/json",
    "Cache-Control": "no-cache",
  },
});
