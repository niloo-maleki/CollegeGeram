import React, { useEffect, useState } from "react";
import FraindsPost from "./components/FraindPost";
import FraindAccount, { IFraindAccount } from "./components/FraindAccount";
import { useGetAllCollegegramiesQuery } from "features/collegegeramies/exploreApi";
import Loading from "components/Loading";

export interface ICollegueGram {
  fraindPost?: string[];
  fraindAccount: IFraindAccount;
}

const Explore = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching,isLoading } = useGetAllCollegegramiesQuery(page);
  const Collegegramies = data ?? [];

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        setPage(page + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, isFetching]);

  return (
    <div className="flex flex-col gap-10 w-full items-center">
      {isLoading && <Loading/>}
      {Collegegramies?.map(
        (item, index) =>
          item.posts &&
          item.posts.length > 0 &&
          item.posts.length <= 4 && (
            <div key={index} className="flex flex-col gap-6">
              <FraindsPost explorePost={item.posts} />
              <FraindAccount
                profilePicture={item.profilePicture}
                userName={item.username}
                followerCount={item.followerCount}
                userId={item.id}
              />
            </div>
          )
      )}
    </div>
  );
};

export default Explore;
