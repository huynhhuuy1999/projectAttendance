import axios from "axios";

const baseURL = process.env.REACT_APP_URL_API;
const token = localStorage.getItem('TOKEN');

const axiosMy = axios.create({
  baseURL: baseURL + "api/",
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
axiosMy.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    throw err;
  }
);
export default axiosMy;
