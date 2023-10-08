import React, { Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_IMAGE } from "features/api/apiSlice";
import { IPosts } from "types/interface";
import Loading from "components/Loading";

interface IWithoutPostProps {
  posts?: IPosts[];
}

const WithPost = (props: IWithoutPostProps) => {
  const { posts } = props;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    location.pathname.match(/^[/]myCollegue$/)
  }, [location]);

  const informationPost = (postId: number) => {
    navigate(`informationPost/${postId}`, {
      state: { id: postId },
    });
  };

  return (
    <>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-fit">
          {posts === undefined ? (
            <Loading />
          ) : (
            posts?.map((item: IPosts, index) => {
              return (
                <div
                  className="flex flex-wrap cursor-pointer max-h-60 aspect-square"
                  key={item.id}
                >
                  <img
                    key={item.images[0].urlImage}
                    onClick={() => informationPost(item.id)}
                    className="rounded-xl object-cover h-full w-full"
                    src={`${API_IMAGE}${item.images[0].urlImage}`}
                    alt={item.images[0].urlImage}
                  />
                </div>
              );
            })
          )}
        </div>
      
    </>
  );
};

export default WithPost;
