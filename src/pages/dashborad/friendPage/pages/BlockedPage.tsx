import React from "react";

const BlockedPage = ({userName}:{userName?:string}) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-8 items-center text-prestigeGreen mt-8">
        <span className="font-bold text-xl">
          مثل اینکه بلاک شدی!
        </span>
        <span className="w-1/2 text-center text-base font-normal leading-8">
          متاسفانه {userName} دیگه دوست نداره پست‌ها و استوری‌هاش رو باهات به اشتراک
          بذاره. برو دنبال دوست جدید بگرد :)
        </span>
      </div>
    </div>
  );
};

export default BlockedPage;
