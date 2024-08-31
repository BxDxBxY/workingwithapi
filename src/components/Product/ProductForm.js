import React, { useState } from "react";
import { Button, Form, Input, Select, Space, Table } from "antd";
import useAuthStore from "../../Zustand/store";
import AxiosFuns from "../../Axios/AxiosFuns";

const { Option } = Select;

const ProductForm = ({ product, onSave }) => {
  const [form] = Form.useForm();
  const categories = useAuthStore((state) => state.Categories);
  
  const handleSubmit = async (values) => {
    try {
      if (product) {
        await AxiosFuns.products.updateProduct(values);
      } else {
        await AxiosFuns.products.createProduct(values);
      }
      onSave(); // Callback to refresh or update UI
    } catch (error) {
      console.error("Failed to save product", error);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} initialValues={product}>
      <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the product name!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the product price!' }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category!' }]}>
        <Select>
          {categories.map(category => (
            <Option key={category._id} value={category._id}>{category.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Save</Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
