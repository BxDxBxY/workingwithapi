import RequestFunctions from "./RequestFunctions";

const {
  AuthReqFunction,
  UserReqUserInfo,
  UserReqUpdateUserInfo,
  UserReqDeleteUser,
  UserReqSignUser,
  ProductsReqGetAllProducts,
  ProductsReqDeleteProduct,
  ProductsReqUpdateProduct,
  ProductsReqGetProduct,
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
  GetAllCategories,
  GetCategory,
} = RequestFunctions;

const AxiosFuns = {
  auth: {
    auth_function: AuthReqFunction,
  },
  user: {
    getUserInfo: UserReqUserInfo,
    updateUserInfo: UserReqUpdateUserInfo,
    deleteUser: UserReqDeleteUser,
    signUser: UserReqSignUser,
  },
  products: {
    getAllProducts: ProductsReqGetAllProducts,
    deleteProduct: ProductsReqDeleteProduct,
    updateProduct: ProductsReqUpdateProduct,
    getProduct: ProductsReqGetProduct,
  },
  category: {
    getAllCategories: GetAllCategories,
    getCategory: GetCategory,
    updateCategory: UpdateCategory,
    deleteCategory: DeleteCategory,
    createCategory: CreateCategory,
  },
};

export default AxiosFuns;
