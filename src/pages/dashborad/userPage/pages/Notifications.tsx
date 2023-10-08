import React, { useState } from "react";
import MyNotif from "../components/MyNotif";
import FraindNotif from "../components/FraindNotif";
import { useFriendsNotificationQuery, useSelfNotificationQuery } from "features/notification/notificationApi";

interface ITabs {
  title?: string;
  tab: string;
}
const tabs: ITabs[] = [
  { title: "اعلانات من", tab: "MyNotif" },
  { title: "اعلانات دوستان من", tab: "FraindNotif" },
];

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<string>("MyNotif");
  const { data: selfNotificationData } = useSelfNotificationQuery(1);
  const { data: friendsNotificationData } = useFriendsNotificationQuery(1);

  const tabButtons = tabs.map((item, index) => (
    <button
      key={index}
      onClick={() => setActiveTab(item.tab)}
      className={`first:border-l first:border-darkGray first:pl-4 text-xl font-bold ${
        activeTab === item.tab ? "text-darkGray" : "text-midGray"
      }`}
    >
      {item.title}
    </button>
  ));

  return (
    <div className="flex flex-col w-full gap-6 transition delay-100 duration-75 ease-in-out" style={{overflowY: "auto"}}>
      اعلانات
      <div className="flex items-center gap-4 ">{tabButtons}</div>
      <div>
        {activeTab === "MyNotif" && <MyNotif selfNotificationData= {selfNotificationData}/>}
        {activeTab === "FraindNotif" && <FraindNotif friendsNotificationData={friendsNotificationData} />}
      </div>
    </div>
  );
};

export default Notifications;
