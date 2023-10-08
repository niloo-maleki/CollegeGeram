import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "pages/login/pages/Registration";
import Login from "pages/login/pages/Login";
import PageNotFound from "pages/errorPage/PageNotFound";
import LoginLayout from "layouts/LoginLayout";
import LoginForm from "pages/login/LoginForm";
import Home from "pages/homePage/Home";
import CollegueGram from "pages/explore/CollegueGram";
import MyCollegue from "pages/dashborad/MyCollegue";
import DashboardLayout from "layouts/DashboardLayout";
import NewPassword from "pages/login/pages/NewPassword";
import ResetPassword from "pages/login/pages/ResetPassword";
import InformationPost from "pages/dashborad/userPage/pages/InformationPost";
import SavedPost from "pages/dashborad/userPage/pages/BookMarked";
//import Notifications from "pages/dashborad/userPage/pages/Notifications";
import Person from "pages/dashborad/userPage/pages/Person";
import Notifications from "pages/dashborad/userPage/pages/Notifications";
import ProtectedRout from "utils/ProtectedRout";
import FriendPage from "pages/dashborad/friendPage/pages/FriendPage";
import BlockedPage from "pages/dashborad/friendPage/pages/BlockedPage";
import FriendInfomationPost from "pages/dashborad/friendPage/pages/FriendInfomationPost";
import Explore from "pages/explore/Explore";
import FraindList from "pages/dashborad/userPage/pages/FraindList";
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<LoginLayout />}>
        <Route path="/" element={<LoginForm />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
        </Route>

        <Route>
          <Route path="newpassword/:token" element={<NewPassword />} />
          <Route path="resetpassword" element={<ResetPassword />} />
        </Route>
      </Route>
      <Route element={<ProtectedRout />}>
        <Route element={<DashboardLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="collegueGram" element={<CollegueGram />}>
            <Route index element={<Explore />} />
            <Route
              path="friendsPostInfo/:id"
              element={<FriendInfomationPost />}
            />
            <Route path="friendPage/:username" element={<FriendPage />} />
            <Route path="BlockedPage" element={<BlockedPage />} />
          </Route>
          <Route path="myCollegue" element={<MyCollegue />}>
            <Route index element={<Person />} />
            <Route
              path="informationPost/:postId"
              element={<InformationPost />}
            />
            <Route path="history" element={<SavedPost />} />
            <Route path="notification" element={<Notifications />} />
            <Route path="fraindList" element={<FraindList />} />
          </Route>
        </Route>
      </Route>

      <Route path="error" element={<PageNotFound />} />
      <Route path="error/:id" element={<Navigate to="error" replace />} />
    </Routes>
  );
};

export default AppRoutes;
