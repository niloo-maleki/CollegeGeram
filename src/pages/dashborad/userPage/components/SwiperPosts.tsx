import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IImages } from "types/interface";
import { API_IMAGE } from "features/api/apiSlice";

const SwiperPosts = ({ images }: { images?: IImages[] }) => {
  console.log('images', images)
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      className="!mx-0 h-[435px]"
      id="swiper"
      slidesPerView={1}
      navigation
      allowSlideNext
      pagination={{ clickable: true }}
    >
      {images?.map((image,index) => (
        <SwiperSlide key={index}>
          <img
            className="w-full rounded-xl aspect-square max-h-[460px]"
            src={`${API_IMAGE}${image.urlImage}`}
            alt="icon"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperPosts;
