import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Autoplay } from "swiper/modules";

const Header = () => {
  const importAll = (r) => {
    let images = {};
    r.keys().map((item) => (images[item.replace("./", "")] = r(item)));
    return images;
  };

  const images = importAll(
    require.context("../../Assets/Slides/", false, /\.(png|jpe?g|svg)$/)
  );

  return (
    <div className="w-[1024px] m-auto p-2 mt-2">
      <Swiper
        navigation={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Navigation, Pagination, Keyboard, Autoplay]}
        spaceBetween={30}
        freeMode={true}
        history={{
          key: "slide",
        }}
        keyboard={{
          enabled: true,
        }}
        style={{
          "--swiper-navigation-color": "#BE2619",
          "--swiper-pagination-color": "#BE2619",
        }}
        grabCursor={true}
        lazy={true.toString()}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
      >
        <SwiperSlide>
          <img
            className="m-auto rounded-xl"
            src={images["1.png"]}
            alt="Slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="m-auto rounded-xl"
            src={images["2.png"]}
            alt="Slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="m-auto rounded-xl"
            src={images["3.png"]}
            alt="Slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="m-auto rounded-xl"
            src={images["4.png"]}
            alt="Slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="m-auto rounded-xl"
            src={images["5.png"]}
            alt="Slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="m-auto rounded-xl"
            src={images["6.png"]}
            alt="Slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="m-auto rounded-xl"
            src={images["7.png"]}
            alt="Slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="m-auto rounded-xl"
            src={images["8.png"]}
            alt="Slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="m-auto rounded-xl"
            src={images["9.png"]}
            alt="Slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="m-auto rounded-xl"
            src={images["10.png"]}
            alt="Slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="m-auto rounded-xl"
            src={images["11.png"]}
            alt="Slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="m-auto rounded-xl"
            src={images["12.png"]}
            alt="Slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="m-auto rounded-xl"
            src={images["13.png"]}
            alt="Slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="m-auto rounded-xl"
            src={images["14.png"]}
            alt="Slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="m-auto rounded-xl"
            src={images["15.png"]}
            alt="Slide"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Header;
