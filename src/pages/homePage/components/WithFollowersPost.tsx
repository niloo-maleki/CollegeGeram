import React, { Fragment } from "react";
import PostCard from "./PostCard";
import { IFollowerPost } from "types/interface";

const WithFollowersPost = ({postCards}:{postCards?:IFollowerPost[]}) => {
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-6 items-start w-full ">
      {postCards?.map((item, index) => {
        return (
          <Fragment key={index}>
            <PostCard
              imagesPost={item.images}
              likeCount={item.likeCount}
              commentCount={item.commentCount}
              userName={item.user}
              tags={item.tags}
              postCardId={item.id}
              bookmarkCount={item.bookmarkCount}
              isBookmarked={item.isBookmarked}
              isLiked={item.isLiked}
              userId={item.id}
            />
          </Fragment>
        );
      })}
    </div>
  );
};

export default WithFollowersPost;
