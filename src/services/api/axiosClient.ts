import axios from "axios";

const baseURL = process.env.REACT_APP_URL_API;
// const token = readCookie("TOKEN");
const token = localStorage.getItem('TOKEN');

const axiosMy = axios.create({
  baseURL: baseURL + "api/",
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  // httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});
axiosMy.interceptors.response.use(
  (res) => {
    // console.log(token);
    // if (res.data.result === 0) {
    //   logout(buildysURL + '');
    // }
    return res;
  },
  (err) => {
    // if (err.response?.status === 401) {
    //   logout(buildysURL + '');
    // }
    // console.log(token);
    throw err;
  }
);
export default axiosMy;
