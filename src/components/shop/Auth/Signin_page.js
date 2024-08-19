import React, { useEffect, useRef, useState } from "react";
import { Button, Checkbox, Flex, Form, Input, Radio, Spin } from "antd";
import axios from "axios";
import { useQuery } from "react-query";
import { LoadingOutlined } from "@ant-design/icons";
const URL = "http://localhost:5000/api";

const Signin_page = () => {
  const data = localStorage.getItem("user_credentials") || null;
  const onFinish = async (values) => {
    let token = await auth_function(values);
    localStorage.setItem("access_token", token?.data?.access_token);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [isLoading, setIsLoading] = useState(false);
  const auth_function = async (data) => {
    setIsLoading(true);
    let user = await axios
      .post(URL + "/auth/signin", data)
      .then((res) => {
        return res?.data;
      })
      .catch((er) => {
        console.log(er?.response);
        return er?.message;
      })
      .finally(() => {
        setIsLoading(false);
      });
    return user;
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        {isLoading ? (
          <>
            <Flex align="center" gap="middle">
              <Spin indicator={<LoadingOutlined spin />} size="large" />
            </Flex>
          </>
        ) : (
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email address!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            {/* <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </>
  );
};

export default Signin_page;
