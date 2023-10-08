import arrow from "assets/icons/arrow-bottom.svg";
import edith from "assets/icons/edith.svg";
import { useDispatch, useSelector } from "react-redux";
import { modalComponentSelector, openModal } from "features/modal/modalSlice";
import EdithProfileModal from "pages/modals/editProfile/EditProfileModal";
import { useEffect, useState } from "react";
import camera from "assets/icons/camera.svg";
import { API_IMAGE } from "features/api/apiSlice";
import { useGetUserQuery } from "features/user/userApi";
import { ReactComponent as More } from "assets/icons/ellipsis.svg";
import Button from "./Button";

const Profile = () => {
  const dispath = useDispatch();
  const [profileImg, setProfileImg] = useState(camera);
  const componentName = useSelector(modalComponentSelector);
  const { data: userData } = useGetUserQuery();
  const [option,showOption] = useState(false)

  const handlerModal = () => {
    dispath(openModal({ name: "EdithProfileModal" }));

  };

  const followerCount = userData?.followerCount;
  const followingCount = userData?.followingCount;

  const _firstName =
    userData?.firstName !== null && userData?.firstName !== undefined
      ? userData?.firstName
      : "";
  const _lastName =
    userData?.lastName !== null && userData?.lastName !== undefined
      ? userData?.lastName
      : "";

  const fullName = `${_firstName + " " + _lastName}`;

  useEffect(() => {
    const imageUrl = `${API_IMAGE}${userData?.profilePicture}`;
    setProfileImg(imageUrl);
  }, [userData?.profilePicture]);

  return (
    <>
      <div className="flex flex-col h-96 gap-3 2xl:gap-4 items-center justify-center px-8 md:px-0 md:bg-LightPecanPine bg-layoutGray md:border md:border-[#CDCDCD] py-2 2xl:py-6 w-full md:w-64">
        <div className="flex md:flex-col w-full items-center md:justify-center justify-between">
          <div className="flex items-center md:flex-col gap-3">
            <div className="flex rounded-full w-20">
              <img
                className="aspect-square object-cover rounded-full w-full"
                src={userData?.profilePicture ? profileImg : camera}
                alt="user"
              />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <div className="flex items-center gap-2">
                <img src={arrow} alt="arrow" />
                <span className="text-lightYellow font-normal text-sm">
                  {userData?.username}
                </span>
              </div>
              {fullName && (
                <span className="text-darkGreen text-xl font-semibold">
                  {fullName}
                </span>
              )}
            </div>
          </div>

          <More className="md:hidden flex items-end" />
        </div>
        <div className="flex w-full md:justify-between justify-start gap-2 md:px-7 text-sm font-normal text-[#17494D]">
          <span>{followerCount} دنبال‌کننده</span>
          <span>|</span>
          <span>{followingCount} دنبال‌شونده</span>
        </div>
        <div className="hidden md:flex text-center text-[#A5A5A5] px-6">
          <p> {userData?.bio}</p>
        </div>
        <button className="md:flex hidden" onClick={handlerModal}>
          <img src={edith} alt="edith" />
        </button>
        <div className="md:hidden flex w-full items-center justify-end">
          <Button buttonText="ویرایش پروفایل" onClick={handlerModal}></Button>
        </div>
      </div>
      {componentName === "EdithProfileModal" && <EdithProfileModal />}
    </>
  );
};

export default Profile;
