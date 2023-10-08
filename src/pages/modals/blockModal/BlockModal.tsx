import React from "react";
import Modal from "components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, modalSelector } from "features/modal/modalSlice";
import { ReactComponent as Verified } from "assets/icons/verified.svg";
import { ReactComponent as Report } from "assets/icons/report.svg";
import { usePostBlockUserMutation } from "features/user/userApi";
import profile from "assets/images/profile.png";
import { API_IMAGE } from "features/api/apiSlice";

export interface IBlockModal {
  userName?: string;
  followCount?: number;
  profilePicture?:string
}

const BlockModal = (props: IBlockModal) => {
  const { userName, followCount,profilePicture } = props;
  const showModal = useSelector(modalSelector);
  const dispatch = useDispatch();
  const [blockedUser] = usePostBlockUserMutation();

  const blockedUserHandler = () => {
    blockedUser({ blockUserName: userName });
    dispatch(closeModal())
  };

  return (
    <Modal
      title=" بلاک "
      showModal={showModal}
      textButtonModal=" آره حتما "
      onclose={() => dispatch(closeModal())}
      onclick={blockedUserHandler}
      icon={<Report className="fill-prestigeGreen" />}
    >
      <div className="flex flex-col  gap-16  w-80 h-fit p-6">
        <div className="flex items-center justify-around gap-5">
          <div className="flex flex-row items-start gap-8 ">
            <div className="flex flex-col items-start gap-1">
              <h2 className="font-extrabold text-prestigeGreen">{userName}</h2>
              <h6 className=" text-prestigeGreen ">
                {followCount} دنبال کننده
              </h6>
            </div>
          </div>
          <div className="flex relative items-end justify-center rounded-full w-20">
            <img className="aspect-square object-cover rounded-full w-full" src={profilePicture ? `${API_IMAGE}${profilePicture}` : profile} alt="Eclips" />
            <Verified className="absolute bottom-0 right-0" />
          </div>
        </div>
        <div className="w-72 flex flex-col gap-1 text-base">
          <span className=" font-semibold items-start w-full">
            مطمئنی میخوای {userName} رو بلاک کنی ؟
          </span>
          <span className=" font-medium ">
            اگر بلاکش کنی دیگه نمیتونه بهت پیام بده و پست هاتو ببینه . قابلیت
            لایک کردن و کامنت گذاشتن زیر پست هات هم براش مسدود میشه
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default BlockModal;
