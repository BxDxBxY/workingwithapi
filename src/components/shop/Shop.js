import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import GetCookie from "../Cookies/GetCookie";
import { useQuery } from "react-query";
import axios from "axios";
import useAuthStore from "../Zustand/store";
import SetCookie from "../Cookies/SetCookie";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const URL = "http://localhost:5000/api";


const items = [
  getItem("Profile", "1", <UserOutlined />),
  // getItem("Profile", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const Shop = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const setUserInfo = useAuthStore((state) => state.setUserInfo);
  const userInfo = useAuthStore((state) => state.userInfo);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  let access_token = localStorage.getItem("access_token");
  let CookieToken = GetCookie("access_token");
  const { data, isLoading, isError, refetch } = useQuery(
    ["/user"],
    () => getUserInfo(CookieToken || access_token),
    {
      enabled: !!CookieToken || !!access_token,
      retry: false,
      onSuccess: (data) => {
        const user_creds = data?.data?.data;
        localStorage.setItem("user_credentials", JSON.stringify(user_creds));
        SetCookie("user_credentials", JSON.stringify(user_creds), 4);
        setUserInfo(user_creds);
        navigate("/onlineshop/user");
      },
    }
  );
  const getUserInfo = (token) => {
    return axios.get(URL + "/users/me", {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
  };
  useEffect(() => {
    if (access_token !== CookieToken) {
      navigate("/auth");
    }
  }, [access_token, navigate, CookieToken]);
  return (
    <>
      <div>
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={items}
            />
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            />
            <Content
              style={{
                margin: "0 16px",
              }}
            >
              <Breadcrumb
                style={{
                  margin: "16px 0",
                }}
              >
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>
                  {userInfo?.firstName.toUpperCase()}{" "}
                  {userInfo?.lastName?.toUpperCase()}
                </Breadcrumb.Item>
              </Breadcrumb>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                <Outlet />
              </div>
            </Content>
            <Footer
              style={{
                textAlign: "center",
              }}
            >
              Copyright ©{new Date().getFullYear()} Created by Abdukaxxor
            </Footer>
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default Shop;
