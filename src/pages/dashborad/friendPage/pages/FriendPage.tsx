import React, { useEffect } from "react";
import FriendProfile from "pages/dashborad/friendPage/components/FriendProfile";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetUserPostQuery } from "features/accountApi";
import { API_IMAGE } from "features/api/apiSlice";
import { useGetAnotherUserQuery } from "features/user/userApi";
import PrivatePage from "./PrivatePage";
import BlockedPage from "./BlockedPage";
import Loading from "components/Loading";

const FriendPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state.userName;
  const { data: getUserPost, isLoading: getUserPostLoading } =
    useGetUserPostQuery(userName);
  const { data: getAnotherUser, isLoading: getAnotherUserLoding } =
    useGetAnotherUserQuery(userName);

  useEffect(() => {
    location.pathname.match(/^[/]collegueGram$/);
  }, [location]);

  const friendInfoHandle = (postId: number) => {
    navigate(`/collegueGram/friendsPostInfo/${postId}`, {
      state: { id: postId,userName:userName },
    });
  };

  return (
    <>
      <div className="flex gap-6 w-full h-full justify-between flex-grow overflow-hidden">
        {getUserPostLoading || (getAnotherUserLoding && <Loading />)}
        {(getAnotherUser?.isFollowed || !getAnotherUser?.isPrivate) &&
          !getAnotherUser?.isBlocked && (
            <div className="flex flex-col md:grid md:grid-cols-2 2xl:grid-cols-3 flex-grow md:gap-4  gap-2 h-full overflow-y-auto">
              {getUserPost?.posts.map((item, index) => (
                <div
                  className="flex justify-center cursor-pointer max-h-60 aspect-square w-full"
                  key={index}
                >
                  <img
                    onClick={() => friendInfoHandle(item.id)}
                    className="rounded-xl object-cover w-full h-full"
                    src={`${API_IMAGE}${item.images[0].urlImage}`}
                    alt={item.images[0].urlImage}
                  />
                </div>
              ))}
            </div>
          )}
        {getAnotherUser?.isBlocked && <BlockedPage userName={userName} />}
        {!getAnotherUser?.isFollowed && getAnotherUser?.isPrivate && (
          <PrivatePage />
        )}
        <FriendProfile
          isBlocked={getAnotherUser?.isBlocked}
          btnText={getAnotherUser?.isPending ? "لغو درخواست" : getAnotherUser?.isFollowed ? "دنبال شده" : "دنبال کردن"}
          userName={userName}
          userId={getAnotherUser?.id}
          isPending={getAnotherUser?.isPending}
        />
      </div>
    </>
  );
};
export default FriendPage;
