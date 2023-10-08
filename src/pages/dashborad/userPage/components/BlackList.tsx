import Lists from "components/Lists";
import Loading from "components/Loading";
import { useGetBlockListsQuery } from "features/user/userApi";
import React from "react";

const BlackList = () => {
  const { data: getAllBlockList, isLoading } = useGetBlockListsQuery();
  return (
    <>
      {isLoading && <Loading />}
      {getAllBlockList?.map((item, index) => (
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

export default BlackList;
