import React from "react";
import { ReactComponent as ArrowLeft } from "assets/icons/arrow-back.svg";
import { ICollegegramiesPosts } from "types/interface";
import { API_IMAGE } from "features/api/apiSlice";


const FraindsPost = ({ explorePost }: { explorePost?: ICollegegramiesPosts[] }) => {
  return (
    <div className="flex gap-16 items-center">
      <div className="grid gap-6 grid-cols-4 items-center flex-grow">
        {explorePost?.map((item, index) => (
          <div
            key={index}
            className="flex cursor-pointer max-h-60 aspect-square"
          >
            <img
              className="cursor-pointer object-cover aspect-square rounded-2xl"
              src={`${API_IMAGE}${item.images?.urlImage}`}
              alt="post"
            />
          </div>
        ))}
      </div>
      <div className="w-6">
        <ArrowLeft
          width="15"
          height="24"
          className="fill-lightYellow cursor-pointer"
        />
      </div>
    </div>
  );
};

export default FraindsPost;
