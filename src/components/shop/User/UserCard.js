import React from "react";
import { Card, Avatar, Row, Col, Typography } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import useAuthStore from "../../Zustand/store";
import GetCookie from "../../Cookies/GetCookie";

const { Title, Text } = Typography;

const UserCard = () => {
  const userInfo = JSON.parse(GetCookie("user_credentials"));

  return (
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
              <Text>{new Date(userInfo.createdAt).toLocaleDateString()}</Text>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col>
              <Text type="secondary">Last Updated:</Text>
            </Col>
            <Col>
              <Text>{new Date(userInfo.updatedAt).toLocaleDateString()}</Text>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default UserCard;
