import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Profile from "components/Profile";
import tree from "assets/icons/tree.svg";
import Header from "components/Header";
import Menu from "components/Menu";
import { ReactComponent as Person } from "assets/icons/profile.svg";
import { ReactComponent as People } from "assets/icons/people.svg";
import { ReactComponent as Slider } from "assets/icons/slider.svg";
import { ReactComponent as Plus } from "assets/icons/plus.svg";
import { useSelector } from "react-redux";
import { searchSelector } from "features/search/searchSlice";
import { useGetSearchValueQuery } from "features/accountApi";
import { skipToken } from "@reduxjs/toolkit/query";
import SearchPage from "pages/serach/SearchPage";
import MenuOption from "components/MenuOption";

const DashboardLayout = () => {
  const [showProfile, setShowProfile] = useState(false);
  const value = useSelector(searchSelector);
  const { data: searchedValue } = useGetSearchValueQuery(
    value ? value : skipToken
  );
  const [showOption, setShowOption] = useState(false);

  return (
    <div className="flex w-full md:px-28 md:py-8 bg-layoutGray overflow-hidden">
      <div className="flex w-full">
        <div
          id="side-bar"
          className="hidden md:flex flex-col gap-2 items-center justify-between h-full"
        >
          <Profile />
          <div id="menu" className="flex w-full">
            <Menu />
          </div>
          <div className="flex items-center w-32">
            <img src={tree} alt="tree" />
          </div>
        </div>
        <div className="flex flex-col w-full items-center md:mr-16 md:gap-16">
          <div
            id="header"
            className="md:h-10 md:bg-layoutGray md:border-none flex items-center border-b border-lightGrayy h-24 bg-LightPecanPine w-full"
          >
            <div className="md:hidden flex justify-center text- items-center w-14 aspect-square border border-lightGrayy rounded-full bg-layoutGray">
              <Person
                onClick={() =>
                  setShowProfile((prevShowProfile) => !prevShowProfile)
                }
              />
            </div>
            <Header />
          </div>
          {showProfile && <Profile />}
          <div className="flex justify-center md:items-start w-full flex-grow h-screen overflow-y-auto">
            {searchedValue && searchedValue?.length >= 1 ? (
              <div className="flex flex-col gap-8">
                <span className="text-xl font-semibold text-darkGreen">نتیجه جست و جو برای : {value}</span>
                <SearchPage postCards={searchedValue} />
              </div>
            ) : (
              <Outlet />
            )}
          </div>
          {showOption && <MenuOption onClose={() => setShowOption(false)} />}
          <div className="md:hidden relative w-full flex-grow flex justify-around items-center border border-lightGrayy rounded-[50px] bg-Zappy_Zebra  h-16 px-8 mb-7">
            <People className="fill-lightYellow" />
            <button
              className="absolute -translate-y-1/2 flex justify-center items-center w-14 aspect-square flex-1 rounded-full bg-lightYellow"
              onClick={() => setShowOption(true)}
            >
              <Plus />
            </button>
            <Slider className="fill-lightYellow" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
