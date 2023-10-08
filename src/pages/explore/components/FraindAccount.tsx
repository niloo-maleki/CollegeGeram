import React from "react";
import { useEffect } from "react";
import { ReactComponent as Info } from "assets/icons/info.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { API_IMAGE } from "features/api/apiSlice";
import camera from "assets/icons/camera.svg";

export interface IFraindAccount {
  profilePicture?: string;
  userName: string;
  followerCount?: number;
  userId: number;
}
const FraindAccount = (props: IFraindAccount) => {
  const { profilePicture, userName, followerCount, userId } = props;
  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    location.pathname.match(/^[/]collegueGram$/);
  }, [location]);

  const handleNavigate = () => {
    //TODO change state to userId fraind
    navigate(`friendPage/${userName}`, {
      state: { userId: userId,userName:userName },
    });
  };

  return (
    <div className="flex items-center gap-5 " onClick={() => handleNavigate()}>
      <div className="flex rounded-full w-16">
        <img
          src={profilePicture ? `${API_IMAGE}${profilePicture}` : camera}
          alt="frindsProfile"
          className="aspect-square object-cover rounded-full w-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span
          className="text-base font-bold text-lightYellow"
          onClick={() => handleNavigate()}
        >
          {userName}
        </span>
        <span
          className="text-xs font-normal text-prestigeGreen"
          onClick={() => handleNavigate()}
        >
          {followerCount} دنبال‌کننده
        </span>
      </div>
      <div>
        <Info className="cursor-pointer" />
      </div>
    </div>
  );
};

export default FraindAccount;
