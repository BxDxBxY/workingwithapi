import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Backdrop, CircularProgress, Pagination } from "@mui/material";
import Post from "./Post";

const URL = "https://jsonplaceholder.typicode.com/posts";

const Wait = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const fetchPosts = async (page) => {
  if (page == "…" || page == "") return "error";
  await Wait(1000);
  const { data } = await axios.get(`${URL}?_page=${page}&_limit=10`);
  return data;
};

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, refetch,} = useQuery(["posts", currentPage], () =>
    fetchPosts(currentPage)
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{JSON.stringify(isError)}</div>;

  return (
    <>
      <div className="w-full p-4 bg-sky-500 flex items-center justify-center flex-col">
        <div className="grid grid-cols-4 gap-4 bg-slate-900 p-2">
          {data?.map((post, i) => (
            <Post key={i} post={post} />
          ))}
        </div>
        <Pagination
          className="m-4 mx-auto"
          page={currentPage}
          count={10}
          onChange={handlePageChange}
        />
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Posts;
