import React, { useState } from "react";
import { Button, Checkbox, Input, message } from "antd";
import { useMutation } from "react-query";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../Zustand/store";
import SetCookie from "../../Cookies/SetCookie";
import AxiosFuns from "../../Axios/AxiosFuns";

const SigninPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [apiError, setApiError] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const [tempPass, SetTempPass] = useState("");
  const navigate = useNavigate();

  async function success() {
    messageApi.open({
      type: "success",
      content: "Successfully Signed Up!",
    });
    await setTimeout(() => {}, 2000);
  }
  async function failure() {
    messageApi.open({
      type: "Error",
      content: apiError,
    });
    await setTimeout(() => {}, 2000);
  }

  const getToken = useMutation(AxiosFuns.auth.auth_function, {
    onSuccess: (data) => {
      console.log("third SUC Sign user:", data);
      const token = data?.data?.access_token;
      console.log(token);
      setAuthenticated(true);
      setAccessToken(token);
      localStorage.setItem("access_token", token);
      SetCookie("access_token", token, 2);
      success();
      return setTimeout(() => {
        navigate("/onlineshop");
      }, 2000);
    },
    onError: (error) => {
      setApiError(error);
      failure();
      console.log("Failed:", error);
    },
  });

  async function handleGetToken(data) {
    console.log("second Sign user:", data);
    getToken.mutate({ ...data?.data, password: tempPass });
  }

  const { mutate, isLoading, isError } = useMutation(AxiosFuns.user.signUser, {
    onSuccess: (data) => {
      console.log("first Sign user:", data);
      SetCookie("user_credentials", data.data, 2);
      localStorage.setItem("user_credentials", JSON.stringify(data?.data));
      handleGetToken(data.data);

      // const token = data?.data?.access_token;
      // setAuthenticated(true);
      // setAccessToken(token);
      // localStorage.setItem("access_token", token);
      // SetCookie("access_token", token, 2);
      // success();
      // return setTimeout(() => {
      //   navigate("/onlineshop");
      // }, 2000);
    },
    onError: (error) => {
      setApiError(error);
      failure();
      console.log("Failed:", error);
    },
  });

  const onSubmit = (values) => {
    console.log("submit Value", values);
    setApiError(null);
    mutate(values);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        name="basic"
        autoComplete="on"
        className="px-[15px] w-[400px] py-[20px] bg-slate-600 rounded-md flex items-start flex-col"
      >
        <p className="text-center w-full items-center flex text-[20px] text-white font-bold mb-[15px]">
          Please Sign Up to continue
        </p>

        <div className="my-[15px]">
          <label htmlFor="firstName" className="text-white font-bold">
            First Name
          </label>
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: "Please enter your First Name!",
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "Invalid First Name!",
              },
            }}
            render={({ field }) => <Input {...field} />}
          />
          {errors?.firstName && (
            <span className="text-red-400">{errors?.firstName?.message}</span>
          )}
        </div>

        <div className="my-[15px]">
          <label htmlFor="lastName" className="text-white font-bold">
            Last Name
          </label>
          <Controller
            name="lastName"
            control={control}
            rules={{
              required: "Please enter your Last Name!",
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "Invalid Last Name!",
              },
            }}
            render={({ field }) => <Input {...field} />}
          />
          {errors?.lastName && (
            <span className="text-red-400">{errors?.lastName?.message}</span>
          )}
        </div>

        <div className="my-[15px]">
          <label htmlFor="email" className="text-white font-bold">
            Email Address
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
            Password
          </label>
          <Controller
            name="password"
            control={control}
            rules={{
              onChange: (e) => SetTempPass(e?.target?.value),
              required: "Please enter your password!",
              minLength: {
                value: 4,
                message: "Password must be at least 8 characters!",
              },
            }}
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
              : "Sign Up failed: " + apiError?.response?.data?.message[0]}
          </div>
        )}

        <div className="my-[10px]">
          <Button
            loading={isLoading}
            disabled={isLoading}
            type="primary"
            htmlType="submit"
          >
            Sign Up
          </Button>
        </div>
      </form>
      {contextHolder}
    </div>
  );
};

export default SigninPage;
