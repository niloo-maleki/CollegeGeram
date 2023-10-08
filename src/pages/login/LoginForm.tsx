import React, { useEffect } from "react";
import Tabs from "components/Tabs";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiSlice } from "features/api/apiSlice";

const tabs = [
  { title: "ورود به کالج گرام", path: "login" },
  { title: "ثبت نام کالج گرام", path: "register" },
];

const LoginForm = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(apiSlice.util.resetApiState());
  }, []);

  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="flex items-center">
        <Tabs defaultPath="login" tabs={tabs}></Tabs>
      </div>
      <div className="flex items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default LoginForm;
