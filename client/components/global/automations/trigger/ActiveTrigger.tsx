import { Instagram, PlaneTakeoff } from "lucide-react";
import React from "react";

type Props = {
  type: string;
  keywords: {
    word: string;
  }[];
};

const ActiveTrigger = ({ type, keywords }: Props) => {
  return (
    <div className="bg-background p-3 rounded-xl w-full items-center">
      <div className="flex gap-x-2 items-center">
        {type === "COMMENT" ? <Instagram /> : <PlaneTakeoff />}
        <p className="text-lg">
          {type === "COMMENT"
            ? "User comment on my post."
            : "User sends me a direct message."}
        </p>
      </div>
      <p className="text-gray-500 text-sm lg:text-base mt-3">
        {type === "COMMENT"
          ? "If the user comments on a video thats is setup to listen for keyword, this automation will fire."
          : "If the user send you a message that contains a keyword, this automation will fire.."}
      </p>
      <div className="flex gap-2 mt-5 flex-wrap">
        {keywords.map((item, i) => (
          <div
            key={i}
            className=" bg-gradient-to-br from-[#3352CC] to-[#1C2D70] flex items-center gap-x-2 capitalize text-white font-light py-1 px-4 rounded-full"
          >
            <p>{item.word}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveTrigger;
