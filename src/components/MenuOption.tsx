import { ReactComponent as AngledPin } from "assets/icons/angled-pin.svg";
import { ReactComponent as Save } from "assets/icons/saved.svg";
import { ReactComponent as Chat } from "assets/icons/chats.svg";
import { ReactComponent as Person } from "assets/icons/person.svg";
import { ReactComponent as Bell } from "assets/icons/bell.svg";
import { ReactComponent as Terms } from "assets/icons/terms.svg";
import { ReactComponent as Userhistory } from "assets/icons/userhistory.svg";
import { ReactComponent as Exit } from "assets/icons/exit.svg";
import { Navigate, useNavigate } from "react-router-dom";

interface MenuOptionProps {
  onClose: () => void;
}

const MenuOption = (props: MenuOptionProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="md:hidden fixed top-0 left-0 w-screen h-screen flex flex-col justify-end z-50"
      onClick={props.onClose}
    >
      <div
        className="flex flex-row justify-center bg-LightPecanPine text-lightYellow w-full rounded-t-3xl shadow-top-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col text-sm font-medium gap-8 items-start w-full max-w-screen-xl mx-auto p-4">
          <div className="flex gap-2 flex-row ">
            <Person
              className="  w-6  fill-lightYellow"
              onClick={() => navigate("/home")}
            />
            <span> پروفایل من </span>
          </div>
          <div
            className="flex gap-2 flex-row"
            onClick={() => <Navigate to="myCollegue/history" replace />}
          >
            <Save className="w-6" />
            <span> ذخیره ها </span>
          </div>
          <div className="flex  gap-2 flex-row">
            <Chat className="w-6" />
            <span> گفتگو ها </span>
          </div>

          <div
            className="flex flex-row gap-2"
            onClick={() => <Navigate to="myCollegue/notification" replace />}
          >
            <Bell className="w-6" />
            <span>اعلانات </span>
          </div>

          <div className="flex flex-row gap-2">
            <Terms className="w-6" />
            <span>مدیریت دوستان </span>
          </div>

          <div className="flex flex-row gap-2">
            <Userhistory className="w-6" />
            <span>تاریخچه کاربر </span>
          </div>
          <div
            className="flex flex-row gap-2"
            onClick={() => navigate("/login")}
          >
            <Exit className="w-6" />
            <span> خروج از حساب </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuOption;
