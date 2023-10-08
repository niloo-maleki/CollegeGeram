import Lists from 'components/Lists';
import Loading from 'components/Loading';
import { useGetAllCloseFraindsQuery } from 'features/follow/followApi';
import React from 'react'

const CloseFriendsList = () => {
  const { data: getAllCloseFrainds,isLoading } = useGetAllCloseFraindsQuery();
  console.log('getAllCloseFrainds', getAllCloseFrainds)
  return (
    <>
      {isLoading && <Loading />}
      {getAllCloseFrainds?.map((item, index) => (
        <Lists
          key={index}
          fullName={item.firstName + " " + item.lastName}
          userImage={item.profilePicture}
          userName={item.username}
        />
      ))}
    </>
  );
}

export default CloseFriendsList