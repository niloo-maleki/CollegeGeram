import React, { useState } from "react";
import { ReactComponent as AngledPin } from "assets/icons/angled-pin.svg";
import { ReactComponent as Sparkle } from "assets/icons/sparkle.svg";
import { ReactComponent as Verified } from "assets/icons/verified.svg";
import { ReactComponent as Block } from "assets/icons/report.svg";
import { ReactComponent as Speech } from "assets/icons/speech.svg";
import Button from "components/Button";
import { useDispatch, useSelector } from "react-redux";
import { modalComponentSelector, openModal } from "features/modal/modalSlice";
import BlockModal from "pages/modals/blockModal/BlockModal";

import profile from "assets/images/profile.png";

import {
  useFollowUserMutation,
  useUnFollowUserMutation,
} from "features/follow/followApi";
import { useGetAnotherUserQuery } from "features/user/userApi";
import { API_IMAGE } from "features/api/apiSlice";
import CloseFriendModal from "pages/modals/closefriend/CloseFriendModal";

interface Profile {
  btnText: buttontext;
  userName: string;
  userId?: number;
  isBlocked?: boolean;
  isPending?: boolean;
}

export type buttontext = "دنبال کردن" | "دنبال شده" | "لغو درخواست";

const FriendProfile = (props: Profile) => {
  const { btnText, userName, userId, isBlocked, isPending } = props;
  const [followUser] = useFollowUserMutation();
  const { data: getanotherUser } = useGetAnotherUserQuery(userName);
  const [unFollowUser] = useUnFollowUserMutation();
  const [buttonText, setButtonText] = useState<buttontext>(btnText);
  const [active, setActive] = useState<boolean>(btnText === "دنبال شده");
  const dispatch = useDispatch();
  const componentName = useSelector(modalComponentSelector);

  const handleClick = () => {
    setActive(buttonText === "دنبال شده" ? true : false);
    followUserHandler();
  };

  const followUserHandler = () => {
    if (userId === undefined) return;
    switch (buttonText) {
      case "دنبال شده":
        unFollowUser({ userId: userId });
        setButtonText("دنبال کردن");
        break;
      case "لغو درخواست":
        setButtonText("دنبال کردن");
        break;
      case "دنبال کردن":
        followUser({ userId: userId });
        setButtonText("دنبال شده");
        break;
    }
  };

  const blockModal = () => {
    dispatch(openModal({ name: "BlockModal" }));
  };

  const closeFriendModal = () => {
    dispatch(openModal({ name: "CloseFriendModal" }));
  };

  return (
    <div className="hidden md:flex flex-col mt-12 items-center w-80 h-fit border-solid border-2 border-lightGrayy bg-LightPecanPine ">
      <div className="flex items-center justify-center absolute -translate-y-1/2 z-10 rounded-full w-20">
        <img
          className="aspect-square object-cover rounded-full w-full"
          src={
            getanotherUser?.profilePicture
              ? `${API_IMAGE}${getanotherUser?.profilePicture}`
              : profile
          }
          alt={getanotherUser?.profilePicture}
        />
        <Verified className="absolute bottom-0 right-0" />
      </div>
      <div className="flex flex-col gap-8 pt-16 pb-4 items-center">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-darkYellow font-semibold">
            {getanotherUser?.username}
          </h1>
          <div className="flex gap-1 items-center justify-center text-xs font-normal text-prestigeGreen">
            <span>{getanotherUser?.followerCount} دنبال کننده</span>
            <span>|</span>
            <span>{getanotherUser?.followingCount} دنبال شونده</span>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button
            onClick={handleClick}
            buttonText={buttonText}
            className={`w-fit h-10 ${
              active
                ? `!bg-layoutGray !text-lightYellow border border-lightYellow`
                : `bg-lightYellow text-white`
            } ${isBlocked && `!bg-disable cursor-not-allowed`}`}
          />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <AngledPin />
          <h3>{getanotherUser?.postsCount} عکس </h3>
        </div>
        <div className="flex flex-row gap-7 p-4 bg-layoutGray border-solid border-2 border-lightGrayy">
          <Sparkle
            className={`${
              isBlocked
                ? `fill-disable cursor-not-allowed`
                : `fill-lightYellow cursor-pointer`
            }`}
            onClick={closeFriendModal}
          />
          <Speech
            className={`${
              isBlocked
                ? `fill-disable cursor-not-allowed`
                : `fill-lightYellow cursor-pointer`
            }`}
          />
          <Block
            className={`${
              isBlocked
                ? `fill-disable cursor-not-allowed`
                : `fill-lightYellow cursor-pointer`
            }`}
            onClick={blockModal}
          />
        </div>
      </div>
      {componentName === "BlockModal" && (
        <BlockModal
          profilePicture={getanotherUser?.profilePicture}
          userName={getanotherUser?.username}
          followCount={getanotherUser?.followerCount}
        />
      )}
      {componentName === "CloseFriendModal" && (
        <CloseFriendModal
          profilePicture={getanotherUser?.profilePicture}
          userName={getanotherUser?.username}
          followCount={getanotherUser?.followerCount}
          userId={getanotherUser?.id}
        />
      )}
    </div>
  );
};

export default FriendProfile;
