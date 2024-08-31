import { Button, Flex } from "antd";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  // useEffect(()=>{
  //   // navigate('/auth/login')
  // })
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
