import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import f1 from '/src/assets/campus1.png'
import f2 from '/src/assets/campus2.png'
import f3 from '/src/assets/campus3.png'
import f4 from '/src/assets/campus4.png'
import f5 from '/src/assets/campus5.png'

// Swiper core styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// Import required modules
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

const Slider = () => {
    const images = [f1, f2, f3, f4, f5];

    return (
        <div className='py-8 sm:py-10 mt-6 sm:mt-10 mb-6 sm:mb-10'>
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-semibold text-center mb-4 sm:mb-6 text-red-500">
                Welcome to
            </h2>

            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                speed={3000}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                coverflowEffect={{
                    rotate: 40,
                    stretch: 0,
                    depth: 120,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={false}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper w-full 2xl:max-w-[1400px] mx-auto"
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 12 },
                    640: { slidesPerView: 1, spaceBetween: 16 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 2, spaceBetween: 24 },
                    1280: { slidesPerView: 2, spaceBetween: 24 },
                    1536: { slidesPerView: 2, spaceBetween: 24 },
                }}
            >
                {images.map((src, index) => (
                    <SwiperSlide key={index} className="flex justify-center">
                        <img
                            src={src}
                            alt={`Video ${index + 1}`}
                            className="rounded-lg sm:rounded-xl w-full h-auto aspect-[16/9] object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;
