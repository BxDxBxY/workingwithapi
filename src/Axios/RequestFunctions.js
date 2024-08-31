import AxiosInstance from "./AxiosInstance";

const RequestFunctions = {
  AuthReqFunction: async (data) => {
    console.log("axios func auth data", data);
    return await AxiosInstance.post("/auth/signin", data)
      .then((res) => res?.data)
      .catch((er) => {
        throw er?.response?.data?.message || "Something went wrong!";
      });
  },
  UserReqUserInfo: async () => {
    return await AxiosInstance.get("/users/me");
  },
  UserReqUpdateUserInfo: async (updUser) => {
    const response = await AxiosInstance.put(`/users/${updUser._id}`, updUser);
    return response.data;
  },
  UserReqDeleteUser: async (id) => {
    const response = await AxiosInstance.delete(`/users/${id}`);
    localStorage.clear();
    return response;
  },
  UserReqSignUser: async (data) => {
    return await AxiosInstance.post("/users", { ...data, role: "admin" });
  },

  ProductsReqGetAllProducts: async (page, limit) => {
    return await AxiosInstance.get(
      `/product?page=${page || 1}&limit=${limit || 10}`
    );
  },
  ProductsReqDeleteProduct: async (id) => {
    return await AxiosInstance.delete(`/product/${id}`);
  },
  ProductsReqUpdateProduct: async (data) => {
    return await AxiosInstance.patch(`/product/${data._id}`, data);
  },
  ProductsReqGetProduct: async (id) => {
    return await AxiosInstance.get(`/product/${id}`);
  },
  GetAllCategories: async () => {
    return await AxiosInstance.get(`/category`);
  },
  GetCategory: async (id) => {
    return await AxiosInstance.get(`/category/${id}`);
  },
  CreateCategory: async (category) => {
    return await AxiosInstance.post(`/category`, category);
  },
  UpdateCategory: async (category) => {
    return await AxiosInstance.put(`/category/${category._id}`, category);
  },
  DeleteCategory: async (id) => {
    return await AxiosInstance.delete(`/category/${id}`);
  },
};

export default RequestFunctions;
