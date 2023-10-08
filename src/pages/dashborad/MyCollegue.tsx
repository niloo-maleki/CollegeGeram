import React from "react";
import { Outlet } from "react-router-dom";
import Tools from "./userPage/components/Tools";

const MyCollegue = () => {
  return (
    <div className="w-full flex justify-betwwen gap-4 h-full overflow-hidden">
      <Outlet />
      <div className="md:flex justify-center h-fit hidden">
        <Tools />
      </div>
    </div>
  );
};

export default MyCollegue;
