import React, { useState } from "react";
import { ReactComponent as Heart } from "assets/icons/heart.svg";
import { ReactComponent as Share } from "assets/icons/arrow-left-curved.svg";
import {
  useDeleteLikeCommentMutation,
  usePostLikeCommentMutation,
} from "features/comment/commentApi";
import { aDay, timeSince } from "constants/helpers/timeConverter";

interface IComment {
  likeCount: number;
  setReplyComment: (id: number) => void;
  inputRef: HTMLInputElement | null;
  comment: string;
  commentId: number;
  createdDate:string;
  commentOwnerUserId: number;
  commentOwnerUsername: string;
  commentOwnerDisplayName: string;
}

const Comment = (props: IComment) => {
  const {
    likeCount,
    setReplyComment,
    inputRef,
    comment,
    createdDate,
    commentId,
    commentOwnerDisplayName,
  } = props;
  const [likedComment, setlikedComment] = useState<boolean>(
    likeCount ? true : false
  );
  const [likeComment] = usePostLikeCommentMutation();
  const [unLikeComment] = useDeleteLikeCommentMutation();

  const likeHandler = () => {
    if (likedComment === false) {
      likeComment(commentId);
      setlikedComment(true);
    } else {
      unLikeComment(commentId);
      setlikedComment(false);
    }
  };

  const replyCommentHandler = () => {
    setReplyComment(commentId);
    inputRef?.focus();
  };
  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-darkGreen">
            {commentOwnerDisplayName}
          </span>
          <span className="text-xs font-normal text-midGray">{timeSince(aDay, new Date(createdDate))}</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-lightYellow font-extrabold">
          <div className="flex items-center gap-2">
            <span>{likeCount}</span>
            <Heart
              onClick={likeHandler}
              className={`cursor-pointer w-3 ${
                likedComment && "fill-lightYellow"
              }`}
            />
          </div>
          <div className="flex items-center gap-2 ">
            <span>پاسخ</span>
            <Share
              className="cursor-pointer"
              onClick={() => replyCommentHandler()}
            />
          </div>
        </div>
      </div>
      <div className="flex items-start w-full text-darkGreen text-sm font-normal">
        <span>{comment}</span>
      </div>
    </>
  );
};

export default Comment;
