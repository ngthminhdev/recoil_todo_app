import axios from "axios";
import jwt_decode from "jwt-decode";
import useSessionStorage from "../../app/hooks/useSessionStorage";

const axiosJWT = axios.create({
  baseUrl: "http://localhost:3000",
});

axiosJWT.interceptors.request.use(
  async (config) => {
    const accessToken = useSessionStorage("authentication", "accessToken");
    const authentication = useSessionStorage("authentication");

    console.log("interceptor");
    let date = new Date();
    const decodedToken = jwt_decode(accessToken);

    if (decodedToken.exp < date.getTime() / 1000) {
      const res = await axios.post(
        "http://localhost:3000/api/auth/refreshToken",
        { withCredentials: true }
      );
      sessionStorage.removeItem("authentication");
      sessionStorage.setItem(
        "authentication",
        JSON.stringify({
          ...authentication,
          accessToken: res.data.accessToken,
        })
      );
      const newaccessToken = useSessionStorage("authentication", "accessToken");

      config.headers.Authorization = `Bearer ${newaccessToken}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosJWT;
