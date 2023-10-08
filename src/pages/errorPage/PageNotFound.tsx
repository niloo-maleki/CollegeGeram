import React, { ReactNode } from "react";
import Button from "components/Button";
import { useNavigate } from "react-router-dom";
import Layout from "layouts/Layout";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col items-center gap-5 text-prestigeGreen">
        <h1 className=" font-bold">وای اینجا چه خبره؟!</h1>
        <p className="font-bold text-xl">ظاهرا یک مشکلی وجود داره! </p>
        <p className="text-base">
          ما داریم تلاش می‌کنیم که برطرفش کنیم.
          <br />
          لطفا چند دقیقه دیگه دوباره تلاش کن.
        </p>
        <Button
          className="px-4"
          onClick={() => navigate("/login")}
          buttonText="بازگشت به صفحه قبلی"
        />
      </div>
    </Layout>
  );
};

export default PageNotFound;
