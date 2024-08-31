import React, { useEffect } from "react";
import useAuthStore from "../../Zustand/store";
import ProductCard from "../../components/Product/ProductCard";
import AxiosFuns from "../../Axios/AxiosFuns";
import TableCard from "../../components/Table";
import { useQuery } from "react-query";
import CategoryFetcher from "../../components/CategoryFetcher";

const Products = () => {
  const setProducts = useAuthStore((state) => state.setProducts);
  const { isLoading, isError, isSuccess, data } = useQuery(
    "getAllProducts",
    AxiosFuns.products.getAllProducts,
    { retry: true }
  );

  useEffect(() => {
    if (isSuccess && data) {
      setProducts(data.data); // Assuming the API response has a 'data' field containing products
    }

    if (isError) {
      console.error("Failed to fetch products");
    }
  }, [isSuccess, data, isError, setProducts]);

  return (
    <div>
      <h1>Products</h1>
      <CategoryFetcher />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching products.</p>}
      {isSuccess && <TableCard />}
      {/* TableCard uses Zustand to get products */}
    </div>
  );
};

export default Products;
