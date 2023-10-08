import React from "react";
import { useGetAllBookMarkedQuery } from "features/bookmark/bookMarkApi";
import { API_IMAGE } from "features/api/apiSlice";
import Loading from "components/Loading";

const BookMarked = () => {
  const { data: bookMarked, isLoading } = useGetAllBookMarkedQuery();
  return (
    <div className="flex w-full justify-center">
      {isLoading && <Loading />}
      <div className="grid grid-cols-4 w-full items-center gap-6 max-h-60 aspect-square">
        {bookMarked?.map((item, index) => (
          <img
            key={index}
            className="cursor-pointer rounded-xl object-cover aspect-square w-full"
            src={`${API_IMAGE}${item.images[0].urlImage}`}
            alt="savePost"
          />
        ))}
      </div>
    </div>
  );
};

export default BookMarked;
