import { useEffect } from "react";
import { useQuery } from "react-query";
import AxiosFuns from "../Axios/AxiosFuns";
import useAuthStore from "../Zustand/store";

const CategoryFetcher = () => {
  const setCategories = useAuthStore((state) => state.setCategories);

  const { data, isError, isSuccess } = useQuery(
    "getCategories",
    AxiosFuns.category.getAllCategories,
    { retry: true }
  );

  useEffect(() => {
    if (isSuccess && data) {
      console.log("category fetching res: ", data);
      setCategories(data.data);
    }

    if (isError) {
      console.error("Failed to fetch categories");
    }
  }, [isSuccess, data, isError, setCategories]);

  return null;
};

export default CategoryFetcher;
