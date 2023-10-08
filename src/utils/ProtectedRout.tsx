import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const ProtectedRout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const handleBrowserBack = () => {
  //   // اجرای عملیات مورد نظر در صورت کلیک بر روی بک مرورگر
  //   localStorage.removeItem('token')
  //   navigate("/login");
  // };

  // useEffect(() => {
  //   // اضافه کردن یک Event Listener برای کلیک بر روی بک مرورگر
  //   window.addEventListener("popstate", handleBrowserBack);

  //   // تمیز کردن Event Listener در زمان عدم استفاده
  //   return () => {
  //     window.removeEventListener("popstate", handleBrowserBack);
  //   };
  // }, []);

  const token = localStorage.getItem("token");
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default ProtectedRout;
