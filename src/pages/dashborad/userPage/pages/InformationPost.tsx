import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ReactComponent as Send } from "assets/icons/share.svg";
import profile from "assets/images/profile.png";
import Input from "components/Input";
import AllComments from "../components/AllComments";
import PostDetails from "../components/PostDetails";
import {
  useGetAllCommentsQuery,
  usePostCreateCommentMutation,
} from "features/comment/commentApi";
import { useGetViewPostQuery } from "features/accountApi";
import SwiperPosts from "../components/SwiperPosts";
import Loading from "components/Loading";
import { useGetUserQuery } from "features/user/userApi";
import { API_IMAGE } from "features/api/apiSlice";

const InformationPost = ({ fraindPage,userName }: { fraindPage?: boolean,userName?:string }) => {
  const { state } = useLocation();
  const { id } = state ?? {};
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComments] = useState<string>("");
  const [replyComment, setReplyComment] = useState<number>();
  const { data: postDetail, isLoading } = useGetViewPostQuery(id);
  const [createComment] = usePostCreateCommentMutation();
  const { data: getAllComments } = useGetAllCommentsQuery(id);
  const { data: userData } = useGetUserQuery();

  const commentHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComments(event.target.value);
  };

  const addCommentHandler = () => {
    if (newComment !== "") {
      setComments([...comments, newComment]);
      try {
        if (replyComment) {
          createComment({
            text: newComment,
            postId: id.toString(),
            parentCommentId: replyComment.toString(),
          });
        } else {
          createComment({
            text: newComment,
            postId: id.toString(),
          });
        }
      } catch (error) {}
    }
    setNewComments("");
  };
  console.log('postDetail?.images', postDetail?.images)
  return (
    <div className="flex items-start gap-10 justify-between w-full overflow-y-auto">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex items-center w-[360px] ">
            <SwiperPosts images={postDetail?.images} />
          </div>
          <div className="flex flex-col w-full flex-grow gap-10">
            <PostDetails userName={userName} fraindPage={fraindPage} postId={id} />
            <div className="flex flex-col gap-6 w-full">
              <div className="flex items-center gap-1 w-full">
                <div className="flex rounded-full w-10">
                  <img
                    className="aspect-square object-cover rounded-full w-full"
                    src={
                      userData?.profilePicture
                        ? `${API_IMAGE}${userData?.profilePicture}`
                        : profile
                    }
                    alt="profile"
                  />
                </div>
                <Input
                  onChange={commentHandler}
                  placeholder="نظر خود را بنویسید..."
                  value={newComment}
                  ref={inputRef}
                  className="w-full"
                />
                <div className="flex w-5">
                  <Send
                    onClick={addCommentHandler}
                    className="cursor-pointer"
                  />
                </div>
              </div>
              {getAllComments && (
                <AllComments
                  setReplyComment={setReplyComment}
                  comments={getAllComments}
                  inputRef={inputRef.current}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InformationPost;
