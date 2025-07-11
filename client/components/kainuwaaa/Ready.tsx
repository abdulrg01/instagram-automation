"use client"
import React from "react";
import { motion } from "framer-motion";

function Ready() {
  return (
    <section className=" text-white w-full flex flex-col  items-center text-center w-[80%] bg-[#9333EA] p-[5%]">
      <motion.h1
        initial={{
          x: -100,
          opacity: 0,
        }}
        whileInView={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
        viewport={{
          once: true,
        }}
        className="text-4xl md:text-6xl font-bold mt-[10px] mb-[50px]"
      >
        Ready to Transform Your Life?
      </motion.h1>
      <motion.p
        initial={{
          x: 100,
          opacity: 0,
        }}
        whileInView={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
        viewport={{
          once: true,
        }}
      >
        Are you ready to take charge of your life and unlock your full
        potential? EnhanceSphere is your ultimate partner in achieving personal
        fulfillment, financial independence, and professional excellence.
      </motion.p>
      <a href="#">
        <motion.button
          initial={{
            x: -100,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          viewport={{
            once: true,
          }}
          className="bg-[white] text-[#9333EA] p-[2%] mt-[30px] cursor-pointer text-bold rounded-[2px]"
        >
          Book Your FREE Consultation Now
        </motion.button>
      </a>
    </section>
  );
}

export default Ready;
