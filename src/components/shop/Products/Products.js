import React, { useEffect } from "react";
import useAuthStore from "../../Zustand/store";

const Products = () => {
  const access_token = useAuthStore((state) => state.access_token);


  const getProducts = (token)=>{
    
  }

  useEffect(()=>{

  },[access_token])
  return <div></div>;
};

export default Products;
