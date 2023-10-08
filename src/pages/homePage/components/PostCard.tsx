import React, { useState, MouseEvent, useEffect } from "react";
import { ReactComponent as Like } from "assets/icons/heart-outline.svg";
import { ReactComponent as Comment } from "assets/icons/coment.svg";
import { ReactComponent as Slider } from "assets/icons/slider.svg";
import Tags from "components/Tags";
import { IFollowerImages, ITags } from "types/interface";
import { API_IMAGE } from "features/api/apiSlice";
import AddBookMark from "./AddBookMark";
import {
  useGetLikedPostQuery,
  useLikedpostsMutation,
  useUnLikedpostsMutation,
} from "features/accountApi";
import { IPostId } from "types/interface";
import { useNavigate } from "react-router-dom";

export interface IPostCard {
  imagesPost?: IFollowerImages[];
  searchImage?: string;
  likeCount: number;
  bookmarkCount: number;
  commentCount: number;
  userName: string;
  userId: number;
  tags?: ITags[];
  postCardId: number;
  imageCount?: number;
  isLiked: boolean;
  isBookmarked?: boolean;
  bookMarkedHandler?: (id: number) => void;
}

const PostCard = (props: IPostCard) => {
  const {
    imagesPost,
    searchImage,
    likeCount,
    commentCount,
    bookmarkCount,
    userName,
    userId,
    tags,
    imageCount,
    postCardId,
    isLiked,
    isBookmarked,
  } = props;

  const navigate = useNavigate();
  const [liked, setLiked] = useState<boolean>(isLiked);
  const [unlikepost] = useUnLikedpostsMutation();
  const [postliked] = useLikedpostsMutation();
  const { data: getLikedPost } = useGetLikedPostQuery(postCardId);

  useEffect(() => {
    if (!getLikedPost) return;
    setLiked(getLikedPost);
  }, [getLikedPost]);

  const likeHandler = () => {
    setLiked((prevLiked) => !prevLiked);
    likedPostHandler({ postId: postCardId });
  };

  const likedPostHandler = (postId: IPostId) => {
    if (!liked) {
      postliked(postId);
    } else {
      unlikepost(postId);
    }
  };


  const handleNavigatetoProfile = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(`../collegueGram/friendPage/${userName}`, {
      state: { userId: userId, userName: userName },
    });
  };

  const handleNavigatetoPost = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(`../collegueGram/friendsPostInfo/${postCardId}`, {
      state: { id: postCardId,userName:userName },
    });
  };

  return (
    <div className="flex flex-col gap-5 rounded-3xl h-full items-center bg-white pb-5 cursor-pointer">
      <div
        onClick={handleNavigatetoPost}
        className="flex items-start justify-center w-full"
      >
        <img
          className="w-full rounded-t-3xl rounded-b-none aspect-square"
          src={
            imagesPost
              ? `${API_IMAGE}${imagesPost[0].urlImage}`
              : `${API_IMAGE}${searchImage}`
          }
          alt={
            imagesPost
              ? `${API_IMAGE}${imagesPost[0].urlImage}`
              : `${API_IMAGE}${searchImage}`
          }
        />
      </div>
      <div className="flex flex-col w-full px-4 justify-between gap-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center w-full gap-3 text-lightYellow text-sm font-medium">
            <div className="flex items-center gap-2">
              <Like
                onClick={likeHandler}
                className={`cursor-pointer ${liked ? "fill-lightYellow" : "stroke-lightYellow"}`}
              />
              <span>{likeCount}</span>
            </div>
            {isBookmarked !== undefined && (
              <div className="flex items-center gap-2">
                <AddBookMark
                  isBookmarked={isBookmarked}
                  id={postCardId}
                  bookmarkCount={bookmarkCount}
                />
              </div>
            )}
            <div className="flex items-center gap-2">
              <Comment />
              <span>{commentCount}</span>
            </div>
          </div>
          {imagesPost && imagesPost?.length > 1 && (
            <Slider className="fill-darkGreen" />
          )}
          {imageCount && imageCount > 1 && (
            <Slider className="fill-darkGreen" />
          )}
        </div>
        <div
          onClick={handleNavigatetoProfile}
          className="flex hover:bg-LightPecanPine w-fit rounded-xl items-center"
        >
          <span className="text-base font-medium">{userName}</span>
        </div>
        {tags && <Tags tags={tags} />}
      </div>
    </div>
  );
};

export default PostCard;
