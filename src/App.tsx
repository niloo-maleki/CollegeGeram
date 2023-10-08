import React from "react";
import AppRoutes from "./router/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="grid h-screen bg-layoutGray">
      <AppRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
