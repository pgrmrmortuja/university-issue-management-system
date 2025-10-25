import React, { useState, useEffect } from 'react';
import Slide1 from "../../assets/ct1.png";
import Slide2 from "../../assets/ct2.png";
import Slide3 from "../../assets/ct3.png";
import { Fade } from 'react-awesome-reveal';

const Slider = () => {
    const slides = [Slide1, Slide2, Slide3];
    const [currentSlide, setCurrentSlide] = useState(0);

    // Automatically change slides every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 3000);
        return () => clearInterval(interval); // Cleanup on component unmount
    }, [slides.length]);

    return (
        <div className="w-[97%] mx-auto mb-14 mt-5">
           {/* lg:h-[650px] */}
            <div className="relative w-full overflow-hidden rounded-lg shadow-lg h-56 md:h-[450px]">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <Fade>
                            <img
                                src={slide}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </Fade>
                    </div>
                ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-4 space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;

