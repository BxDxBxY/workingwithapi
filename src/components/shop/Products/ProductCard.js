import React from "react";
import { Card, Tag, Typography, Button } from "antd";

const { Title, Text } = Typography;

const ProductCard = ({ product }) => {
  return (
    <Card
      hoverable
      style={{ width: 300 }}
      cover={
        <img
          alt={product.name}
          src="https://via.placeholder.com/300" // Placeholder image; replace with actual product image URL
        />
      }
    >
      <Tag color="blue">{product.category.name}</Tag>
      <Title level={4}>{product.name}</Title>
      <Text strong style={{ display: "block", marginBottom: 8 }}>
        ${product.price.toFixed(2)}
      </Text>
      <Button type="primary" block>
        Add to Cart
      </Button>
    </Card>
  );
};

export default ProductCard;
