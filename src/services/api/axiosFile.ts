import axios from "axios";

const baseURL = process.env.REACT_APP_URL_API;
const token = localStorage.getItem("TOKEN");

const axiosFile = axios.create({
  baseURL: baseURL + "api/",
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});
axiosFile.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    throw err;
  }
);
export default axiosFile;
