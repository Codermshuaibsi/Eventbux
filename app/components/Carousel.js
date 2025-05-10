'use client'
import React, { useEffect, useRef, useState } from 'react';

const Carousel = () => {
  const slidesRef = useRef([]);
  const [current, setCurrent] = useState(0);
  const totalSlides = 3;

  useEffect(() => {
    slidesRef.current.forEach((slide, index) => {
      if (slide) {
        slide.classList.add('hidden');
        if (index === current) {
          slide.classList.remove('hidden');
        }
      }
    });
  }, [current]);

  const goToSlide = (index) => {
    if (index < 0) {
      setCurrent(totalSlides - 1);
    } else if (index >= totalSlides) {
      setCurrent(0);
    } else {
      setCurrent(index);
    }
  };

  return (
    <div className="mx-auto w-auto container mt-3"> 
      <div className="relative w-full">
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {[
          
            'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1549451371-64aa98a6f660?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    
          ].map((src, index) => (
            <div
              key={index}
              ref={(el) => (slidesRef.current[index] = el)}
              className={`absolute inset-0 duration-700 ease-in-out ${index !== current ? 'hidden' : ''}`}
            >
              <img
                src={src}
                className="block w-full h-full object-cover"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
          {[...Array(totalSlides)].map((_   , index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${current === index ? 'bg-white' : 'bg-gray-400'}`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Prev */}
        <button
          onClick={() => goToSlide(current - 1)}
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 group-hover:bg-black/50">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
          </span>
        </button>

        {/* Next */}
        <button
          onClick={() => goToSlide(current + 1)}
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 group-hover:bg-black/50">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
