import Lists from "components/Lists";
import Loading from "components/Loading";
import { useGetAllFollowingsQuery } from "features/follow/followApi";
import React from "react";

const FallowingsList = () => {
  const { data: getAllfollowings,isLoading } = useGetAllFollowingsQuery();
  return  <>
  {isLoading && <Loading/>}
  {getAllfollowings?.map((item, index) => (
    <Lists
      key={index}
      fullName={item.firstName + " " + item.lastName}
      userImage={item.profilePicture}
      userName={item.username}
    />
  ))}
</>;
};

export default FallowingsList;
