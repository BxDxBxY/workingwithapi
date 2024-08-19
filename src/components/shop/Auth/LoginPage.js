import React, { useEffect, useState } from "react";
import { Alert, Button, Checkbox, Input, message } from "antd";
import axios from "axios";
import { useMutation } from "react-query";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStore } from "zustand";
import useAuthStore from "./../../Zustand/store";
import SetCookie from "../../Cookies/SetCookie";
import GetCookie from "../../Cookies/GetCookie";

const URL = "http://localhost:5000/api";

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [apiError, setApiError] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const access_token = localStorage.getItem("access_token");
  const CookieToken = GetCookie("access_token");
  const navigate = useNavigate();

  const auth_function = async (data) => {
    return await axios
      .post(URL + "/auth/signin", data)
      .then((res) => res?.data)
      .catch((er) => {
        throw er?.response?.data?.message || "Something went wrong!";
      });
  };

  function success() {
    messageApi.open({
      type: "success",
      content: "Successfully Signed In!",
    });
  }

  const { mutate, isLoading, isError } = useMutation(auth_function, {
    onSuccess: (data) => {
      const token = data?.data?.access_token;
      setAccessToken(token);
      localStorage.setItem("access_token", token);
      SetCookie("access_token", token, 2);
      setAuthenticated(true);
      success();
      return setTimeout(() => {
        navigate("/onlineshop");
      }, 2000);
    },
    onError: (error) => {
      setApiError(error);
      console.log("Failed:", error);
    },
  });

  const onSubmit = (values) => {
    setApiError(null);
    mutate(values);
  };

  useEffect(() => {
    if (access_token === CookieToken) {
      console.log(true);
      setAuthenticated(true);
      navigate("/onlineshop");
    }
  }, [access_token, navigate, CookieToken]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        name="basic"
        autoComplete="on"
        className="px-[15px] w-[400px] py-[20px] bg-slate-600 rounded-md flex items-start flex-col"
      >
        <p className="text-center w-full items-center flex text-[20px] text-white font-bold mb-[15px]">
          Please Login to continue
        </p>

        <div className="my-[15px]">
          <label htmlFor="email" className="text-white font-bold">
            Your Email Address
          </label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Please enter your Email address!",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address!",
              },
            }}
            render={({ field }) => <Input {...field} />}
          />
          {errors?.email && (
            <span className="text-red-400">{errors?.email?.message}</span>
          )}
        </div>

        <div className="my-[15px]">
          <label className="text-white font-bold" htmlFor="password">
            Your Password
          </label>
          <Controller
            name="password"
            control={control}
            rules={{ required: "Please enter your password!" }}
            render={({ field }) => <Input.Password {...field} />}
          />
          {errors?.password && (
            <span className="text-red-400">{errors?.password?.message}</span>
          )}
        </div>

        <div className="my-[15px]">
          <Controller
            name="remember"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox {...field} checked={field.value}>
                Remember me
              </Checkbox>
            )}
          />
        </div>

        {apiError && isError && (
          <div className="text-red-500 mb-4">
            {typeof apiError === "string"
              ? apiError
              : "Login failed: " + JSON.stringify(apiError)}
          </div>
        )}

        <div className="my-[10px]">
          <Button
            loading={isLoading}
            disabled={isLoading}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </div>
      </form>
      {contextHolder}
    </div>
  );
};

export default LoginPage;
