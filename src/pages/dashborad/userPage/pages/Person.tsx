import React from "react";
import WithPost from "../components/WithPost";
import WithoutPost from "../components/WithoutPost";
import { useGetUserPostQuery } from "features/accountApi";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useGetUserQuery } from "features/user/userApi";
import Loading from "components/Loading";

const Person = () => {
  const { data: userData} = useGetUserQuery();
  const { data: getPost } = useGetUserPostQuery(
    userData?.username !== undefined ? userData.username : skipToken
  );

  return (
    <div className="flex justify-center items-start w-full h-full overflow-y-auto">
      {getPost === undefined ?? <Loading />}
      {getPost?.posts?.length === 0  ? <WithoutPost /> : <WithPost posts={getPost?.posts}/>}
    </div>
  );
};

export default Person;
