import PostCard from "pages/homePage/components/PostCard";
import React, { Fragment } from "react";
import { ISearchValue } from "types/interface";
const SearchPage = ({
  postCards,
}: {
  postCards: ISearchValue[];
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-6 items-start w-full ">
      {postCards?.map((item, index) => {
        return (
          <Fragment key={index}>
            <PostCard
              searchImage={item.images}
              likeCount={item.likeCount}
              commentCount={item.commentCount}
              //TODO change userID => userName
              userName={item.user}
              postCardId={item.id}
              bookmarkCount={item.bookmarkCount}
              isLiked={item.isliked}
              imageCount={item.imageCount}
              userId={item.id}
            />
          </Fragment>
        );
      })}
    </div>
  );
};

export default SearchPage;
