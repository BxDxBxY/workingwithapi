import React, { useEffect } from "react";
import useAuthStore from "../../../Zustand/store";
import ProductCard from "./ProductCard";
import AxiosFuns from "../Axios/AxiosFuns";

const Products = () => {
  const access_token = useAuthStore((state) => state.access_token);

  const getProducts = async (token) => {
    await AxiosFuns.products
      .getAllProducts(token)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    getProducts(access_token);
  }, [access_token, getProducts]);
  return (
    <div>
      Products
      <ProductCard />
    </div>
  );
};

export default Products;
