import React, { useState } from "react";
import {
  Card,
  Avatar,
  Row,
  Col,
  Typography,
  Button,
  Input,
  message,
  Form,
} from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import useAuthStore from "../../../Zustand/store";
import GetCookie from "../../../Cookies/GetCookie";
import AxiosFuns from "../Axios/AxiosFuns";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "react-query";
import { json, useNavigate } from "react-router-dom";
import SetCookie from "../../../Cookies/SetCookie";
import DeleteCookie from "../../../Cookies/DeleteCookie";

const { Title, Text } = Typography;

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

const UserCard = () => {
  console.log(GetCookie("user_credentials"));
  const { isAuthenticated } = useAuthStore((state) => state);
  console.log(isAuthenticated);

  const [userInfo, setUserInfo] = useState(
    (GetCookie("user_credentials") ||
      localStorage.getItem("user_credentials")) &&
      (JSON.parse(GetCookie("user_credentials")) ||
        JSON.parse(localStorage.getItem("user_credentials")))
  );

  //
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  //
  const [isUpdating, setIsUpdating] = useState(false);
  const { register, handleSubmit, control, reset } = useForm({
    // defaultValues: userInfo,
    resolver: yupResolver(schema),
  });
  const updateUserQuery = useMutation(AxiosFuns.user.updateUserInfo, {
    retry: false,
    onSuccess: async (data) => {
      const user_credentials = await data?.data;
      localStorage.setItem(
        "user_credentials",
        JSON.stringify(user_credentials)
      );
      SetCookie("user_credentials", JSON.stringify(user_credentials), 2);
      setAuthenticated(true);
      success();
    },
    onError: (error) => {
      setApiError(error);
      console.log("Failed:", error);
    },
  });
  const deleteUser = useMutation(AxiosFuns.user.deleteUser, {
    onSuccess: () => {
      DeleteCookie();
      setAuthenticated(false);
      navigate("/auth/login");
    },
    onError: (error) => {
      onError(error?.message || error?.data?.message);
    },
  });

  React.useEffect(() => {
    if (userInfo) {
      reset(userInfo);
    }
  }, [userInfo, reset]);

  const onSubmit = (e) => {
    handleUpdate({ ...userInfo, ...e, updatedAt: new Date().toISOString() });
  };

  const handleUpdate = (data) => {
    setIsUpdating(true);
    setUserInfo((prev) => {
      return { ...prev, ...data, updatedAt: new Date().toISOString() };
    });
    updateUserQuery.mutate(data);
  };
  const handleDelete = async () => {
    deleteUser.mutate(userInfo?._id);
  };
  async function success() {
    setIsUpdating(false);
    messageApi.open({
      type: "success",
      content: "Successfully Signed Up!",
    });
    await setTimeout(() => {}, 2000);
  }
  async function onError() {
    setIsUpdating(false);
    messageApi.open({
      type: "Error",
      content: "Unexpected Error occured!",
    });
    await setTimeout(() => {}, 2000);
  }
  if (!isAuthenticated) return navigate("/auth/login");
  return (
    <>
      {!isUpdating ? (
        <Row justify="center" style={{ marginTop: "50px" }}>
          <Col>
            <Card
              style={{
                width: 400,
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                overflow: "hidden",
              }}
              cover={
                <Avatar
                  size={100}
                  icon={<UserOutlined />}
                  style={{
                    backgroundColor: "#87d068",
                    display: "block",
                    margin: "20px auto",
                  }}
                />
              }
            >
              <Title level={3} style={{ textAlign: "center" }}>
                {userInfo.firstName} {userInfo.lastName}
              </Title>
              <Row justify="center" style={{ marginBottom: "20px" }}>
                <Text type="secondary">
                  <MailOutlined /> {userInfo.email}
                </Text>
              </Row>
              <Row justify="space-between" style={{ marginBottom: "10px" }}>
                <Col>
                  <Text type="secondary">Account Created:</Text>
                </Col>
                <Col>
                  <Text>
                    {new Date(userInfo.createdAt).toLocaleDateString()}
                  </Text>
                </Col>
              </Row>
              <Row justify="space-between" >
                <Col>
                  <Text type="secondary">Last Updated:</Text>
                </Col>
                <Col>
                  <Text>
                    {new Date(userInfo.updatedAt).toLocaleDateString()}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Button onClick={() => setIsUpdating(true)}>Update</Button>
                <Button onClick={handleDelete}>Delete Account</Button>
              </Row>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row justify="center" style={{ marginTop: "50px" }}>
          <Col>
            <Card
              style={{
                width: 400,
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                overflow: "hidden",
              }}
              cover={
                <Avatar
                  size={100}
                  icon={<UserOutlined />}
                  style={{
                    backgroundColor: "#87d068",
                    display: "block",
                    margin: "20px auto",
                  }}
                />
              }
            >
              <Title level={3} style={{ textAlign: "center" }}>
                Edit {userInfo?.firstName} Profile
              </Title>

              <Form onSubmitCapture={handleSubmit(onSubmit)}>
                <Row justify="center" style={{ marginBottom: "20px" }}>
                  <Col span={24}>
                    <Controller
                      name="firstName"
                      control={control}
                      defaultValue={userInfo?.firstName}
                      rules={{
                        required: "Please enter your Name!",
                        pattern: {
                          value: /^[0-9]/,
                          message: "Name must only contain letters!",
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <Input {...field} placeholder="First Name" />
                          {error && (
                            <Text style={{ color: "red" }}>
                              {error.message}
                            </Text>
                          )}
                        </>
                      )}
                    />
                  </Col>
                </Row>

                <Row justify="center" style={{ marginBottom: "20px" }}>
                  <Col span={24}>
                    <Controller
                      name="lastName"
                      control={control}
                      defaultValue={userInfo?.lastName}
                      rules={{
                        required: "Please enter your last name!",
                        pattern: {
                          value: /\d/,
                          message: "Name must contain only letters!",
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <Input {...field} placeholder="Last Name" />
                          {error && <Text type="danger">{error.message}</Text>}
                        </>
                      )}
                    />
                  </Col>
                </Row>

                <Row justify="center" style={{ marginBottom: "20px" }}>
                  <Col span={24}>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue={userInfo.email}
                      rules={{
                        required: "Please enter your email address!",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address!",
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <Input placeholder="Email" {...field} />
                          {error && <Text type="danger">{error.message}</Text>}
                        </>
                      )}
                    />
                  </Col>
                </Row>

                <Row justify="center" style={{ marginBottom: "20px" }}>
                  <Col span={24}>
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Please enter your new password!",
                        minLength: {
                          value: 4,
                          message: "Password must be at least 4 characters!",
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <Input.Password
                            placeholder="New Password"
                            {...field}
                          />
                          {error && <Text type="danger">{error.message}</Text>}
                        </>
                      )}
                    />
                  </Col>
                </Row>

                <Row justify="space-between" style={{ marginBottom: "20px" }}>
                  <Col>
                    <Text type="secondary">Account Created:</Text>
                  </Col>
                  <Col>
                    <Text>
                      {new Date(userInfo.createdAt).toLocaleDateString()}
                    </Text>
                  </Col>
                </Row>

                <Row justify="space-between" style={{ marginBottom: "20px" }}>
                  <Col>
                    <Text type="secondary">Last Updated:</Text>
                  </Col>
                  <Col>
                    <Text>
                      {new Date(userInfo.updatedAt).toLocaleDateString()}
                    </Text>
                  </Col>
                  {updateUserQuery.isError && (
                    <Text type="danger">Something went wrong!</Text>
                  )}
                </Row>

                <Row justify="center">
                  <Col span={24}>
                    <Button
                      disabled={updateUserQuery.isLoading ? true : false}
                      loading={updateUserQuery.isLoading ? true : false}
                      type="primary"
                      htmlType="submit"
                      block
                      name="updateButton"
                    >
                      Update
                    </Button>
                  </Col>
                </Row>

                <Row justify="center" style={{ marginTop: "10px" }}>
                  <Col span={24}>
                    <Button
                      block
                      disabled={updateUserQuery.isLoading ? true : false}
                      loading={updateUserQuery.isLoading ? true : false}
                      type="danger"
                      name="deleteButton"
                      onClick={handleDelete}
                    >
                      Delete Account
                    </Button>
                  </Col>
                </Row>
              </Form>
              {/* Form End */}
            </Card>
          </Col>
        </Row>
      )}
      {apiError && (deleteUser.isError || updateUserQuery.isError) && (
        <div className="text-red-500 mb-4">
          {typeof apiError === "string"
            ? apiError
            : "Sign Up failed: " + apiError?.response?.data?.message[0]}
        </div>
      )}
    </>
  );
};

export default UserCard;
