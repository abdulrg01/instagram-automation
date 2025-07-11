"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

const testimonials = [
  {
    name: "Jonathan Yombo",
    title: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    content:
      "Tailus is really extraordinary and very practical, no need to break your head. A real gold mine.",
  },
  {
    name: "Yves Kalume",
    title: "GDE - Android",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    content:
      "With no experience in webdesign I just redesigned my entire website in a few minutes with tailwindcss thanks to Tailus.",
  },
  {
    name: "Yucel Faruksahan",
    title: "Tailkits Creator",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    content:
      "Great work on tailfolio template. This is one of the best personal website that I have seen so far :)",
  },
  {
    name: "Anonymous author",
    title: "Doing something",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    content:
      "I am really new to Tailwind and I want to give a go to make some page on my own.",
  },
  {
    name: "Shekinah Tshiokufila",
    title: "Senior Software Engineer",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    content:
      "Tailus is redefining the standard of web design, with these blocks it provides an easy.",
  },
  {
    name: "Oketa Fred",
    title: "Fullstack Developer",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    content:
      "I absolutely love Tailus! The component blocks are beautifully designed and easy to use.",
  },
  {
    name: "Zeki",
    title: "Founder of ChatExtend",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    content:
      "Using TailsUI has been like unlocking a secret design superpower. It's the perfect fusion of simplicity and versatility.",
  },
  {
    name: "Joseph Kitheka",
    title: "Fullstack Developer",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    content: "Tailus has transformed the way I develop web applications.",
  },
  {
    name: "Khatab Wedaa",
    title: "MerakiUI Creator",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    content:
      "Tailus is an elegant, clean, and responsive tailwind css components it's very helpful to start fast with your project.",
  },
  {
    name: "Rodrigo Aguilar",
    title: "TailwindAwesome Creator",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    content:
      "I love Tailus ❤️. The component blocks are well-structured, simple to use, and beautifully designed.",
  },
  {
    name: "Eric Ampire",
    title: "Mobile Engineer at @BRPNews • @GoogleDevExpert for Android",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    content:
      "Tailus templates are the perfect solution for anyone who wants to create a beautiful and functional website without any web design experience.",
  },
  {
    name: "Roland Tubonge",
    title: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
    content:
      "Tailus is so well designed that even with a very poor knowledge of web design you can do miracles. Let yourself be seduced!",
  },
];

// Split testimonials into columns
const column1Testimonials = [testimonials[0], testimonials[3], testimonials[6]];
const column2Testimonials = [testimonials[1], testimonials[4], testimonials[7]];
const column3Testimonials = [testimonials[2], testimonials[5], testimonials[8]];

export default function TestimonialCarousel() {
  return (
    <section className="overflow-hidden py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="relative">
        <div className="container mx-auto px-4 text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Trusted by Growing Brands
          </h2>
          <p className="text-xl text-gray-600">
            See what our customers are saying
          </p>
        </div>

        <div className="relative w-full flex items-center justify-center h-[600px] overflow-hidden">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 h-full relative">
            {/* Column 1 - Fast */}
            <div>
              <InfiniteSlider
                direction="vertical"
                speed={40}
                speedOnHover={15}
                gap={25}
                reverse={false}
                className="h-full"
              >
                {column1Testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={`col1-${index}`}
                    testimonial={testimonial}
                  />
                ))}
              </InfiniteSlider>
            </div>

            {/* Column 2 - Slow (Middle Column) */}
            <div>
              <InfiniteSlider
                direction="vertical"
                speed={20} // Slower speed for middle column
                speedOnHover={10}
                gap={25}
                reverse={true} // Reverse direction for visual variety
                className="h-full"
              >
                {column2Testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={`col2-${index}`}
                    testimonial={testimonial}
                  />
                ))}
              </InfiniteSlider>
            </div>

            {/* Column 3 - Fast */}
            <div>
              <InfiniteSlider
                direction="vertical"
                speed={35}
                speedOnHover={15}
                gap={25}
                reverse={false}
                className="h-full"
              >
                {column3Testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={`col3-${index}`}
                    testimonial={testimonial}
                  />
                ))}
              </InfiniteSlider>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent"></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 left-0 w-full h-24"
            direction="top"
            blurIntensity={1}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute bottom-0 left-0 w-full h-24"
            direction="bottom"
            blurIntensity={1}
          />
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-8">
            Trusted by 500+ businesses worldwide
          </p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            {[
              "TechCorp",
              "StartupXYZ",
              "GrowthCo",
              "ScaleUp",
              "InnovateLab",
            ].map((company, index) => (
              <div key={index} className="text-lg font-semibold text-gray-400">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: {
    name: string;
    title: string;
    image: string;
    content: string;
  };
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={testimonial.image} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold">{testimonial.name}</p>
            <p className="font-medium text-muted-foreground">
              {testimonial.title}
            </p>
          </div>
        </div>
        <p className="font-medium text-muted-foreground w-80">
          {testimonial.content}
        </p>
        <div className="flex mt-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className="w-4 h-4 fill-yellow-400 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
