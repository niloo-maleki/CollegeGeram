import React from "react";
import Button from "components/Button";
import { useDispatch } from "react-redux";
import { openModal } from "features/modal/modalSlice";

const WithoutPost = () => {
  const dispath = useDispatch();

  const addNewPost = () => {
    dispath(openModal({ name: "AddPostModal" }));
  };

  return (
    <div className="flex flex-col items-center text-center gap-5 w-96 text-prestigeGreen">
      <p className="text-xl font-bold">سلام به کالج‌گرام من خوش اومدی!</p>
      <div className="flex flex-col gap-4 items-center">
        <p className="text-base font-normal">
          از اینجا به تمام محتواهایی مثل پست، ذخیره‌ها، پیام‌ها و... دسترسی داری
          کافیه بخش مرتبط رو از منوی سمت چپ انتخاب کنی.
        </p>
        <p className="text-base font-normal">
          حالا وقت گذاشتن اولین پست هست :)
        </p>
      </div>
      <Button
        className="px-3"
        onClick={addNewPost}
        buttonText="افزودن اولین پست"
      />
    </div>
  );
};

export default WithoutPost;
