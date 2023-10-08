import React from "react";
import Layout from "layouts/Layout";
import NoFollowersPost from "./components/NoFollowersPost";
import WithFollowersPost from "./components/WithFollowersPost";
import { useGetAllFollowerPostQuery } from "features/accountApi";
import Loading from "components/Loading";

const Home = () => {
  const { data, isLoading,isFetching} = useGetAllFollowerPostQuery();

  return (
    <Layout showDryTree={data?.length === 0 ? true : false}>
      {data?.length === 0 ? (
        <NoFollowersPost />
      ) : isLoading && isFetching ? (
        <Loading />
      ) : (
        <WithFollowersPost postCards={data} />
      )}
    </Layout>
  );
};

export default Home;
