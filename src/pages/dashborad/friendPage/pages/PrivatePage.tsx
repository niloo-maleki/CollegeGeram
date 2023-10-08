import React from "react";
import { PrivatePost } from "constants/images";

const PrivatePage = () => {
  return (
    <div className="flex justify-center">
      <div className="grid md:grid-cols-2 2xl:grid-cols-3 w-full gap-6">
        {PrivatePost.map((item, index) => (
          <div className="cursor-pointer" key={index}>
            <img src={item} alt="private" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivatePage;
