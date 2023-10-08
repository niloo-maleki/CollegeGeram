import React from "react";
import InformationPost from "pages/dashborad/userPage/pages/InformationPost";
import { useLocation } from "react-router-dom";

const FriendInfomationPost = () => {
  const location = useLocation();
  const userName = location.state.userName;
  return (
    <div className="flex items-start justify-between gap-10 w-full">
      <InformationPost userName={userName} fraindPage={true} />
    </div>
  );
};

export default FriendInfomationPost;
