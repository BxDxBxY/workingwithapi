import { Button, Flex } from "antd";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useStore } from "zustand";
import useAuthStore from "../../Zustand/store";

// ############################

const Auth = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  useEffect(() => {
    !isAuthenticated ? navigate("/auth/login") : navigate("/onlineshop");
  }, [navigate]);
  return (
    <div className="w-full h-screen bg-slate-800">
      <Flex flex={true} justify="space-between" className="w-[300px] p-[20px]">
        <Button onClick={() => navigate("/auth/login")}>LOG IN</Button>
        <Button onClick={() => navigate("/auth/signin")}>SIGN IN</Button>
      </Flex>
      <Outlet />
    </div>
  );
};

export default Auth;
