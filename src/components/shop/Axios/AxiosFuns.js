import axios from "axios";
import GetCookie from "../../../Cookies/GetCookie";

const URL = "http://localhost:5000/api";
// axios interceptors
const AxiosFuns = {
  auth: {
    auth_function: async (data) => {
      console.log("axios func auth data", data);
      return await axios
        .post(URL + "/auth/signin", data)
        .then((res) => res?.data)
        .catch((er) => {
          throw er?.response?.data?.message || "Something went wrong!";
        });
    },
  },
  user: {
    getUserInfo: async (token) => {
      return await axios.get(URL + "/users/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    },
    updateUserInfo: async (updUser) => {
      const response = await axios.put(
        `${URL}/users/${updUser._id}`,
        updUser, // Payload for the PUT request
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("access_token") || GetCookie("access_token")
            }`,
          },
        }
      );
      return response.data;
    },
    deleteUser: async (id) => {
      const response = await axios.delete(`${URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("access_token") || GetCookie("access_token")
          }`,
        },
      });
      localStorage.clear();
      return response;
    },
    signUser: async (data) => {
      return await axios.post(URL + "/users", { ...data, role: "admin" });
    },
  },
  products: {
    getAllProducts: async (token) => {
      return axios.get(URL + "/product?page=1&limit=10", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    },
    deleteProduct: async () => {},
    updateProduct: async () => {},
    getProduct: async () => {},
  },
};
export default AxiosFuns;
