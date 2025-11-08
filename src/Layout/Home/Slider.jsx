import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import c1 from '/src/assets/campus1.png'
import c2 from '/src/assets/campus2.png'
import c3 from '/src/assets/campus3.png'
import c4 from '/src/assets/campus4.png'
import c5 from '/src/assets/campus5.png'

// Swiper styles import
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Swiper modules import
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Slider = () => {
    return (
        <div className="w-full rounded-2xl overflow-hidden shadow-lg">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <img
                        src="/src/assets/ct1.png"
                        alt="Campus"
                        className="w-full h-[300px] md:h-[500px] object-cover"
                    />
                </SwiperSlide>

                {/* Slide 1 */}
                <SwiperSlide>
                    <img
                        src="/src/assets/campus1.png"
                        alt="Report Campus Issues Easily"
                        className="w-full h-[300px] md:h-[500px] object-cover"
                    />
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <img
                        src="/src/assets/campus2.png"
                        alt="Keep Your Campus Problem-Free"
                        className="w-full  h-[300px] md:h-[500px] object-cover"
                    />
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <img
                        src="/src/assets/campus3.png"
                        alt="Smart Issue Management System"
                        className="w-full h-[300px] md:h-[500px] object-cover"
                    />
                </SwiperSlide>

                {/* Slide 4 */}
                <SwiperSlide>
                    <img
                        src="/src/assets/campus4.png"
                        alt="Track, Solve, and Improve University Life"
                        className="w-full h-[300px] md:h-[500px] object-cover"
                    />
                </SwiperSlide>

                {/* Slide 5 */}
                <SwiperSlide>
                    <img
                        src="/src/assets/campus5.png"
                        alt="Together for a Better Campus"
                        className="w-full  h-[300px] md:h-[500px] object-cover"
                    />
                </SwiperSlide>

                {/* Slide 5 */}
                <SwiperSlide>
                    <img
                        src="/src/assets/ct3.png"
                        alt="Campus"
                        className="w-full h-[300px] md:h-[500px] object-cover"
                    />
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Slider;