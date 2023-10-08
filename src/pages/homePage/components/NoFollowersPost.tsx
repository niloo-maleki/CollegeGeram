import Button from "components/Button";
import React from "react";
import { useNavigate } from "react-router-dom";

const NoFollowersPost = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-grow items-center gap-5 text-prestigeGreen text-center">
      <p className="text-xl font-bold">سلام به کالج‌گرام خوش اومدی!</p>
      <p className="text-base font-normal">
        برای دیدن عکس‌ها توی این صفحه باید کالج‌گرامی‌ها رو دنبال کنی. آماده‌ای؟
      </p>
      <Button
        className="px-3"
        onClick={() => navigate("/collegueGram")}
        buttonText="رفتن به صفحه کالج‌گرامی‌ها"
      />
    </div>
  );
};

export default NoFollowersPost;
