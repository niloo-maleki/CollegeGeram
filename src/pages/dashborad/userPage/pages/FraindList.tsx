import React, { useState } from "react";
import FallowingsList from "../components/FallowingsList";
import FollowersList from "../components/FollowersList";
import CloseFriendsList from "../components/CloseFriendsList";
import BlackList from "../components/BlackList";

interface ITabs {
  title?: string;
  tab: string;
}
const tabs: ITabs[] = [
  { title: "دنبال کننده‌ها", tab: "FollowersList" },
  { title: "دنبال شونده‌ها", tab: "FallowingsList" },
  { title: "دوستان نزدیک", tab: "CloseFriendsList" },
  { title: "لیست سیاه", tab: "BlackList" },
];
const FraindList = () => {
  const [activeTab, setActiveTab] = useState<string>("FollowersList");

  const tabButtons = tabs.map((item, index) => (
    <button
      key={index}
      onClick={() => setActiveTab(item.tab)}
      className={`last:border-none border-l border-darkGreen pl-4 text-lg font-semibold ${
        activeTab === item.tab ? "text-darkGray" : "text-midGray"
      }`}
    >
      {item.title}
    </button>
  ));

  return (
    <div className="flex flex-col w-full gap-6 transition delay-100 duration-75 ease-in-out">
      <div className="flex items-center gap-4 ">{tabButtons}</div>
      <div className="grid grid-cols-2 w-full gap-4 overflow-y-auto">
        {activeTab === "FollowersList" && <FollowersList />}
        {activeTab === "FallowingsList" && <FallowingsList />}
        {activeTab === "CloseFriendsList" && <CloseFriendsList />}
        {activeTab === "BlackList" && <BlackList />}
      </div>
    </div>
  );
};

export default FraindList;
