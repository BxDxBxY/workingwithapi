import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import useAuthStore from "../Zustand/store";
import AxiosFuns from "../Axios/AxiosFuns";
import ProductForm from "./Product/ProductForm";

const TableCard = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [editingProduct, setEditingProduct] = useState(null);

  const products = useAuthStore((state) => state.Products);
  const setProducts = useAuthStore((state) => state.setProducts);

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => setFilteredInfo({});
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setPriceSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "price",
    });
  };

  const handleUpdate = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (id) => {
    try {
      await AxiosFuns.products.deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await Promise.all(
        products.map((product) => AxiosFuns.products.deleteProduct(product._id))
      );
      setProducts([]);
    } catch (error) {
      console.error("Failed to delete all products", error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button onClick={() => handleUpdate(record)}>Update</Button>
          <Button onClick={() => handleDelete(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={() => setEditingProduct({})}>Add Product</Button>
        <Button onClick={handleDeleteAll}>Delete All</Button>
        <Button onClick={clearFilters}>Clear Filters</Button>
        <Button onClick={clearAll}>Clear Filters and Sorters</Button>
        <Button onClick={setPriceSort}>Sort by Price</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={products}
        onChange={handleChange}
        rowKey="_id"
      />
      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onSave={() => {
            setEditingProduct(null);
          }}
        />
      )}
    </>
  );
};

export default TableCard;
