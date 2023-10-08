import React from "react";
import { ReactComponent as Ellipsis } from "assets/icons/ellipsis.svg";
import { ReactComponent as Verified } from "assets/icons/verified.svg";
import profile from "assets/images/profile.png";
import { API_IMAGE } from "features/api/apiSlice";

interface IOptions {
  userName?: string;
  profilePicture?: string;
  followerCount?: number;
}
const Options = (props: IOptions) => {
  const { userName, profilePicture, followerCount } = props;
  return (
    <div className="flex items-center justify-around gap-5">
      <div className="flex flex-row items-center gap-8 ">
        <Ellipsis />
        <div className="flex flex-col items-center gap-1">
          <h2 className="font-bold text-sm text-prestigeGreen">{userName}</h2>
          <h6 className="font-normal text-xs text-prestigeGreen ">
            {followerCount} دنبال کننده
          </h6>
        </div>
      </div>
      <div className="flex relative items-end justify-center rounded-full w-16">
        <img
          className="aspect-square object-cover rounded-full w-full"
          src={profilePicture ? `${API_IMAGE}${profilePicture}` : profile}
          alt="Eclips"
        />
        <Verified className="absolute bottom-0 right-0" />
      </div>
    </div>
  );
};

export default Options;
