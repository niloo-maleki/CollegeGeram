import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Home } from "assets/icons/home.svg";
import { ReactComponent as People } from "assets/icons/people.svg";
import { ReactComponent as Audience } from "assets/icons/insights-audience.svg";

const menu = [
  { title: "خانه", path: "/home", icon: Home },
  { title: "کالج گرامی ها", path: "/collegueGram", icon: People },
  { title: "کالج گرام من", path: "/myCollegue", icon: Audience },
];

const Menu = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState<string>("/home");

  useEffect(() => {
    const pathName = location.pathname.replace(/^\/([^\/]*).*$/, '$1')
    setActivePage(`/${pathName}`);
  }, [location]);
  return (
    <ul className="flex flex-col gap-6 2xl:gap-8 text-sm font-normal w-full">
      {menu.map((item, index) => {
        return (
          <li
            key={index}
            className={`flex items-center gap-4 ${
              activePage === item.path ? `text-darkGreen` : ` text-lightYellow`
            }`}
          >
            <item.icon
              className={`${
                activePage === item.path ? `fill-darkGreen` : `fill-lightYellow`
              }`}
            />
            <Link to={item.path}>{item.title}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
