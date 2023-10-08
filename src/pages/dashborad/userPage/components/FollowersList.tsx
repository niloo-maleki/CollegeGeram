import React from "react";
import Lists from "components/Lists";
import { useGetAllFollowersQuery } from "features/follow/followApi";
import Loading from "components/Loading";

const FollowersList = () => {
  const { data: getAllFollowers,isLoading } = useGetAllFollowersQuery();
  return (
    <>
      {isLoading && <Loading/>}
      {getAllFollowers?.map((item, index) => (
        <Lists
          key={index}
          fullName={item.firstName + " " + item.lastName}
          userImage={item.profilePicture}
          userName={item.username}
        />
      ))}
    </>
  );
};

export default FollowersList;
