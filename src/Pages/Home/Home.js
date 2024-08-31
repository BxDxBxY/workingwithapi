import React from "react";
import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="text-4xl container max-w-[1448px] h-full text-green-500 mx-auto bg-slate-600">
        <nav className="flex items-start gap-2 flex-col justify-between p-2 ">
          <p className="font-bold">WELCOME TO MY WEBSITE</p>
          <div className="flex items-center justify-between gap-4 mt-[15px]">

          <Link to={"/students"}>
            <p className="text-2xl px-[15px] py-[10px] bg-emerald-900 rounded-md hover:bg-emerald-900 text-green-600 duration-150">Go to Students Page</p>
          </Link>
          <Link to={"/jsonplaceholder"}>
            <p className="text-2xl px-[15px] py-[10px] bg-indigo-800 rounded-md hover:bg-indigo-900 text-indigo-600 duration-150">Go to JsonPlaceHolder Page</p>
          </Link>
          <Link to={"/onlineshop"}>
            <p className="text-2xl px-[15px] py-[10px] bg-sky-800 rounded-md hover:bg-sky-900 text-green-600 duration-150">Go to Online Shop Page</p>
          </Link>
          </div>
        </nav>
        <Outlet />
      </div>
    </>
  );
};

export default Home;
