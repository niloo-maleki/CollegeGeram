import React, { useEffect, useState } from "react";
import { ReactComponent as Like } from "assets/icons/heart-outline.svg";
import { ReactComponent as Save } from "assets/icons/save-outline.svg";
import {
  useDeleteBookMarkMutation,
  usePostBookMarkMutation,
} from "features/bookmark/bookMarkApi";
import edith from "assets/icons/edit.svg";
import Button from "components/Button";
import Tags from "components/Tags";
import { useGetViewPostQuery } from "features/accountApi";
import { useDispatch, useSelector } from "react-redux";
import { modalComponentSelector, openModal } from "features/modal/modalSlice";
import EditPost from "pages/modals/editPost/EditPost";
import {
  useLikedpostsMutation,
  useUnLikedpostsMutation,
} from "features/accountApi";
import Options from "pages/dashborad/friendPage/components/Options";
import AddBookMark from "pages/homePage/components/AddBookMark";
import { aDay, timeSince } from "constants/helpers/timeConverter";
import { useGetAnotherUserQuery } from "features/user/userApi";
import { skipToken } from "@reduxjs/toolkit/query";

interface IPostDetails {
  postId: number;
  fraindPage?: boolean;
  userName?:string
}
const PostDetails = (props: IPostDetails) => {
  const { postId, fraindPage = false,userName } = props;
  const [likedPost, setlikedPost] = useState<boolean>(false);
  const [unlikepost] = useUnLikedpostsMutation();
  const [postliked] = useLikedpostsMutation();
  const { data: postDetail } = useGetViewPostQuery(postId);
  const dispath = useDispatch();
  const componentName = useSelector(modalComponentSelector);
  const { data: getanotherUser } = useGetAnotherUserQuery( userName ? userName : skipToken);

  const likedPostHandler = () => {
    setlikedPost(!likedPost);
    if (!likedPost) {
      postliked({ postId });
    } else {
      unlikepost({ postId });
    }
  };

  const handlerModal = () => {
    dispath(openModal({ name: "EditPost" }));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="flex items-center gap-1 text-lightYellow">
            <Like
              onClick={likedPostHandler}
              className={`cursor-pointer ${
                likedPost ? "fill-lightYellow" : "stroke-lightYellow"
              }`}
            />
            <span>{postDetail?.likeCount}</span>
          </div>
          <div className="flex items-center gap-1 text-lightYellow">
            {postDetail?.bookmarkCount !== undefined && (
              <div className="flex items-center gap-2">
                <AddBookMark
                  isBookmarked={postDetail?.isBookmarked}
                  id={postDetail?.id}
                  bookmarkCount={postDetail?.bookmarkCount}
                />
              </div>
            )}
          </div>
        </div>

        <div>
          {fraindPage ? (
            <Options userName={getanotherUser?.username} profilePicture={getanotherUser?.profilePicture} followerCount={getanotherUser?.followerCount}/>
          ) : (
            <Button
              className="flex items-center gap-2"
              buttonText="ویرایش پست"
              icon={edith}
              onClick={handlerModal}
            />
          )}
        </div>
      </div>
      <span id="time-created" className="flex text-darkGreen">
        {postDetail && timeSince(aDay, new Date(postDetail.createdAt))}
      </span>
      <div
        id="description-post"
        className="flex items-center w-96 text-darkGreen"
      >
        {postDetail?.body}
      </div>
      {postDetail?.tags && <Tags tags={postDetail?.tags} />}
      {componentName === "EditPost" && <EditPost postId={postId} />}
    </div>
  );
};

export default PostDetails;
