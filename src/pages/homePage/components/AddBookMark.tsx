import React, { useEffect, useState } from "react";
import { ReactComponent as Save } from "assets/icons/save.svg";
import { IPostId } from "types/interface";
import {
  useDeleteBookMarkMutation,
  usePostBookMarkMutation,
} from "features/bookmark/bookMarkApi";

interface IAddBookMark {
  bookmarkCount: number;
  id: number;
  isBookmarked:boolean
}
const AddBookMark = (props: IAddBookMark) => {
  const { bookmarkCount, id,isBookmarked } = props;
  const [bookMarked, setBookmarked] = useState<boolean>(isBookmarked);
  const [postBookMarked] = usePostBookMarkMutation();
  const [deletebookMarkedPost] = useDeleteBookMarkMutation();

  const bookMarkedHandler = () => {
    if (bookMarked === false) {
      postBookMarkedHandler({ postId: id });
      setBookmarked(true);
    } else {
      deletebookMarkedPost({ postId: id });
      setBookmarked(false);
    }
  };

  const postBookMarkedHandler = (postId: IPostId) => {
    if (!bookMarked) {
      const result = postBookMarked(postId);
    } else {
      deletebookMarkedPost(postId);
    }
  };

  return (
    <>
      <Save
        onClick={() => bookMarkedHandler()}
        className={`cursor-pointer !w-6 !h-6 ${
          bookMarked && "fill-lightYellow"
        }`}
      />
      <span>{bookmarkCount}</span>
    </>
  );
};

export default AddBookMark;
