import React, { useEffect, useState } from "react";
import Input from "./Input";
import search from "assets/icons/search.svg";
import Button from "./Button";
import logo from "assets/icons/logo.svg";
import AddPostModal from "../pages/modals/addPost/AddPostModal";
import { useDispatch, useSelector } from "react-redux";
import { modalComponentSelector, openModal } from "features/modal/modalSlice";
import { useGetSearchValueQuery } from "features/accountApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { searchSelector, setSearchValue } from "features/search/searchSlice";

interface IHeader {}

const Header = () => {
  const [searchUser, setSearchUser] = useState<string>("");
  const dispath = useDispatch();
  const componentName = useSelector(modalComponentSelector);
 
  const handlerModal = () => {
    dispath(openModal({ name: "AddPostModal" }));
  };

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userName = event.target.value;
    setSearchUser(userName);
    dispath(setSearchValue(userName));
  };

  const searchUserHandler = () => {
    setSearchUser("");
  };

  return (
    <div className="flex md:justify-between justify-center items-center w-full">
      <div className="flex items-center">
        <Input
          placeholder="جستجو"
          icon={search}
          className="flex-row-reverse"
          onChange={searchHandler}
          onClick={searchUserHandler}
          value={searchUser}
        />
      </div>
      <div className="hidden md:flex items-center gap-12">
        <Button
          className="px-3"
          buttonText="افزودن عکس"
          onClick={handlerModal}
        />
        <img src={logo} alt="logo" />
      </div>
      {componentName === "AddPostModal" && <AddPostModal />}
    </div>
  );
};

export default Header;
