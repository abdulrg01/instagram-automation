"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import Image from "next/image";

export default function ThreeDMarqueeDemoSecond() {
  const images = [
    "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
    "https://assets.aceternity.com/animated-modal.png",
    "https://assets.aceternity.com/animated-testimonials.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
    "https://assets.aceternity.com/github-globe.png",
    "https://assets.aceternity.com/glare-card.png",
    "https://assets.aceternity.com/layout-grid.png",
    "https://assets.aceternity.com/flip-text.png",
    "https://assets.aceternity.com/hero-highlight.png",
    "https://assets.aceternity.com/carousel.webp",
    "https://assets.aceternity.com/placeholders-and-vanish-input.png",
    "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
    "https://assets.aceternity.com/signup-form.png",
    "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
    "https://assets.aceternity.com/spotlight-new.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
    "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
    "https://assets.aceternity.com/tabs.png",
    "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
    "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
    "https://assets.aceternity.com/glowing-effect.webp",
    "https://assets.aceternity.com/hover-border-gradient.png",
    "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
    "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
    "https://assets.aceternity.com/macbook-scroll.png",
    "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
    "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
    "https://assets.aceternity.com/multi-step-loader.png",
    "https://assets.aceternity.com/vortex.png",
    "https://assets.aceternity.com/wobble-card.png",
    "https://assets.aceternity.com/world-map.webp",
  ];
  return (
    <div className="relative mx-auto my-10 flex h-screen w-full max-w-6xl flex-col items-start justify-center overflow-hidden rounded-3xl px-8 md:px-12 lg:px-16">
     
      <h1 className="relative z-20 inline-block text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-white">
        Build the Best
        </h1>
        <h1 className="relative z-20 inline-block text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight py-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
          React.js{" "}
        </h1>
        <h1 className="relative z-20 inline-block text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-white">Dashboard</h1>
    
      <div className="relative z-20 flex flex-wrap items-start gap-3 pt-4">
      <button className="rounded-md bg-black/10 text-black dark:text-black  text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black focus:outline-none">
          <Image fill src="/shadcn.png" className="rounded-lg w-12 h-12 text-black dark:text-black" alt="" />
        </button>
        <button className="rounded-md bg-black/10 text-black dark:text-black text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black focus:outline-none">
            <Image fill src="/tailwind.jpg" className="rounded-lg w-12 h-12 text-black dark:text-black" alt="" />
        </button>
        <button className="rounded-md bg-black/10 text-black dark:text-black text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black focus:outline-none">
            <Image fill src="/nextjs.png" className="rounded-lg w-12 h-12 text-black dark:text-black" alt="" />
        </button>
      </div>
      {/* overlay */}
      <div className="absolute inset-0 z-10 h-full w-full bg-black/80 dark:bg-black/20" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={images}
      />
    </div>
  );
}
