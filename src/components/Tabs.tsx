import React, { Fragment,useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface ITabs {
  title?: string;
  path: string;
  icon?: string;
}

interface ITabsProps {
  tabs: ITabs[];
  defaultPath: string;
  className?: string;
}

const Tabs = (props: ITabsProps) => {
  const { tabs, defaultPath, className } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(defaultPath);

  useEffect(() => {
    const tab = location.pathname.replace("/", "");
    tab === "" && navigate(`/${activeTab}`);
    setActiveTab(tab);
  }, [location,activeTab,navigate]);

  const changeRoute = (tab: string) => {
    navigate(`/${tab}`);
  };

  return (
    <div className="flex items-center ">
      <ul className={`${className}  flex gap-8 items-center`}>
        {tabs.map((item, index) => {
          return (
            <Fragment key={index}>
              <div className="flex items-center cursor-pointer first:border-l border-darkGray first:pl-9">
                {item.icon && <img src={item.icon} alt="icon" />}
                <li
                  onClick={() => changeRoute(item.path)}
                  className={`transition delay-100 duration-75 ease-in-out ${
                    activeTab === item.path
                      ? "text-[#2B2B2B]"
                      : "text-[#A5A5A5]"
                  }`}
                >
                  {item.title}
                </li>
              </div>
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default Tabs;
