import React from "react";
import tree from "assets/icons/tree.svg";
import logo from "assets/icons/logo.svg";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <div className="flex flex-col items-center h-screen md:overflow-hidden">
      <div className=" flex justify-center w-full h-full flex-grow ">
        <div className="flex flex-col justify-center w-fit gap-5 transition delay-200 duration-150 ease-in-out">
          <div className="flex items-center justify-center w-full">
            <img src={logo} alt="logo" />
          </div>
          <Outlet />
        </div>
      </div>
      <div className="bg-LightPecanPine flex justify-center items-center h-72 w-full">
        <img className="w-36" src={tree} alt="tree" />
      </div>
    </div>
  );
};

export default LoginLayout;
