import React, { useEffect, useState } from "react";
import { ReactComponent as Pin } from "assets/icons/angled-pin.svg";
import { ReactComponent as Save } from "assets/icons/save.svg";
import { ReactComponent as Chat } from "assets/icons/coment.svg";
import { ReactComponent as Notif } from "assets/icons/notif.svg";
import { ReactComponent as Setting } from "assets/icons/setting.svg";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const UserTools = [
  { path: "/home", icon: Pin },
  { path: "history", icon: Save },
  { path: "", icon: Chat },
  { path: "notification", icon: Notif },
  { path: "fraindList", icon: Setting },
];

const Tools = () => {
  const [activeTool, setActiveTool] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const url = location.pathname;
    setActiveTool(url)
  }, [location]);

  return (
    <div className="flex flex-col items-center h-fit bg-LightPecanPine border border-lightGrayy px-8 py-8 gap-10">
      {UserTools.map((item, index) => (
        <Link key={index} to={item.path}>
          <item.icon
            className={`cursor-pointer ${
              activeTool.includes(item.path) ? `fill-darkGreen` : `fill-lightYellow`
            }`}
          />
        </Link>
      ))}
    </div>
  );
};

export default Tools;
