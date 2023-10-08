import React, { useState } from "react";
import Modal from "components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, modalSelector } from "features/modal/modalSlice";
import { ReactComponent as Verified } from "assets/icons/verified.svg";
import { ReactComponent as Sparkle } from "assets/icons/sparkle.svg";
import {
  useDeleteCloseFriendMutation,
  usePostCloseFriendMutation,
} from "features/user/userApi";
import profile from "assets/images/profile.png";
import { API_IMAGE } from "features/api/apiSlice";
import { toast } from "react-toastify";
import { ErrorToast, SuccessToast } from "constants/Toast";

export interface ICloseFriendModal {
  userName?: string;
  followCount?: number;
  profilePicture?: string;
  userId?: number;
}

const CloseFriendModal = (props: ICloseFriendModal) => {
  const { userName, followCount, profilePicture, userId } = props;
  const showModal = useSelector(modalSelector);
  const dispatch = useDispatch();
  const [closeFriend] = usePostCloseFriendMutation();

  const closeFriendHandler = async () => {
    try {
      if (!userId) return;
      await closeFriend({ userId }).unwrap();
      toast.success(`${userName} به دوستای نزدیکت اضافه شد`, SuccessToast);
    } catch (error) {
      toast.error("مشکلی به وجود امده است", ErrorToast);
    }
    dispatch(closeModal());
  };

  return (
    <Modal
      title=" دوست نزدیک  "
      showModal={showModal}
      textButtonModal="آره حتما"
      onclose={() => dispatch(closeModal())}
      onclick={closeFriendHandler}
      icon={<Sparkle className="fill-prestigeGreen flex flex-row gap-2" />}
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
            <img
              className="aspect-square object-cover rounded-full w-full"
              src={profilePicture ? `${API_IMAGE}${profilePicture}` : profile}
              alt="Eclips"
            />
            <Verified className="absolute bottom-0 right-0" />
          </div>
        </div>
        <div className="w-72 flex flex-col gap-1 text-base">
          <span className=" font-semibold items-start w-full">
            مطمئنی میخوای {userName} رو به دوستان نزدیکت اضافه کنی ؟
          </span>
          <span className=" font-medium ">
            در این صورت اون می‌تونه محتواهایی که برای دوستان نزدیکت به اشتراک
            گذاشتی رو ببینه
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default CloseFriendModal;
