"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    image: "/kainuwa/kainuwa.jpg",
    title: " Global pharmacy",
    description:
      "Kainuwa best global pharmacy.",
  },
  {
    id: 2,
    image: "/kainuwa/kainuwa6.jpg",
    title: "Healthcare Commitment",
    description:
      "Good & Genuine products dealer.",
  },
  {
    id: 3,
    image: "/kainuwa/kainuwa.jpg",
    title: "Tradition and Heritage",
    description:
      "Cherishing the bonds that unite us and the traditions that are passed from one generation to the next.",
  },
  {
    id: 4,
    image: "/kainuwa/kainuwa8.jpg",
    title: "Embracing Cultural Identity",
    description:
      "Finding peace and reflection in the quiet moments that shape our cultural identity.",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      // goToNextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  useEffect(() => {
    const zoomInterval = setInterval(() => {
      setIsZoomed((prev) => !prev);
    }, 10000);
    return () => clearInterval(zoomInterval);
  }, []);

  const goToSlide = useCallback(
    (index: number, dir: "left" | "right") => {
      if (isAnimating) return;
      setIsAnimating(true);
      setDirection(dir);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsAnimating(false);
      }, 500);
    },
    [isAnimating]
  );

  const goToNextSlide = useCallback(() => {
    const nextSlide = (currentSlide + 1) % slides.length;
    goToSlide(nextSlide, "right");
  }, [currentSlide, goToSlide]);

  const goToPrevSlide = useCallback(() => {
    const prevSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prevSlide, "left");
  }, [currentSlide, goToSlide]);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out",
            currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0",
            isAnimating && currentSlide === index && direction === "right"
              ? "translate-x-0 animate-slide-in-right"
              : "",
            isAnimating && currentSlide === index && direction === "left"
              ? "translate-x-0 animate-slide-in-left"
              : "",
            isAnimating && currentSlide !== index && direction === "right"
              ? "translate-x-full animate-slide-out-left"
              : "",
            isAnimating && currentSlide !== index && direction === "left"
              ? "-translate-x-full animate-slide-out-right"
              : ""
          )}
        >
          {/* Image with blue overlay */}
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              priority
              className={cn(
                "object-cover transition-transform duration-10000 ease-in-out",
                isZoomed ? "scale-150" : "scale-100"
              )}
              sizes="100vw"
            />
            {/* Blue overlay for better text readability - matching the screenshot */}
            <div className="absolute inset-0 bg-blue-900/60 z-10"></div>
          </div>

          {/* Text content with animations - matching the screenshot layout */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center text-white p-4 md:pt-20">
            <div className="container mx-auto px-4 md:px-12">
              <h2
                className={cn(
                  "text-4xl md:text-7xl font-bold mb-4 transition-all duration-1000 max-w-3xl",
                  currentSlide === index
                    ? "opacity-100 translate-y-20"
                    : "opacity-0 translate-y-0"
                )}
                style={{ transitionDelay: "300ms" }}
              >
                {slide.title}
                <div className="w-24 h-1 bg-[#035e85] mt-4"></div>
              </h2>
              <p
                className={cn(
                  "text-lg md:text-xl max-w-2xl transition-all duration-1000 mt-3 mb-20",
                  currentSlide === index
                    ? "opacity-100 translate-y-20"
                    : "opacity-0 translate-y-0"
                )}
                style={{ transitionDelay: "600ms" }}
              >
                {slide.description}
              </p>
              <button
                className={cn(
                  "bg-[#035e85] hover:bg-red-700 text-white px-8 py-3 uppercase font-bold text-sm tracking-wider transition-all duration-300 mt-6",
                  currentSlide === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: "900ms" }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute top-11/12 -translate-y-9/12 left-10 z-30 md:hidden flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() =>
              goToSlide(index, index > currentSlide ? "right" : "left")
            }
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300 border border-white",
              currentSlide === index
                ? "bg-white"
                : "bg-transparent hover:bg-white/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows - styled as circular buttons */}
      <button
        onClick={goToPrevSlide}
        className="hidden absolute right-8 bottom-32 z-30 bg-white/20 hover:bg-white/40 text-white rounded-full p-4 w-14 h-14 md:flex items-center justify-center border border-white/50 backdrop-blur-sm transition-all duration-300"
        aria-label="Previous slide"
      >
        ◀
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-8 bottom-16 z-30 bg-white/20 hover:bg-white/40 text-white rounded-full p-4 w-14 h-14 hidden md:flex items-center justify-center border border-white/50 backdrop-blur-sm transition-all duration-300"
        aria-label="Next slide"
      >
        ▶
      </button>
    </div>
  );
}
