"use client";
import { OnAutomationInfo } from "@/app/actions/user";
import { FileWarning, Instagram } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  id: string;
};

const PostNode = ({ id }: Props) => {
  const automation = OnAutomationInfo(id);

  return (
    automation &&
    automation.posts.length > 0 && (
      <div className="w-10/12 lg:w-8/12 relative xl:4/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
        <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
          <span className="h-[9px] w-[9px] bg-background rounded-full" />
          {/* separator */}
          {/* youtube 7:30 */}
          <div className="h-full border-l border-gray-300 mx-4" />
          <span className="h-[9px] w-[9px] bg-background rounded-full" />
        </div>
        <div className="flex gap-x-2">
          <FileWarning />
          If they comment on...
        </div>
        <div className="bg-background p-3 rounded-xl flex flex-col gap-y-2">
          <div className="flex gap-x-2 items-center">
            <Instagram />
            <p className="font-bold text-lg">These posts</p>
          </div>
        </div>
        <div className="flex gap-x-2 flex-wrap mt-2">
          {automation.posts.map((post, i) => (
            <div
              key={i}
              className="relative w-4/12 aspect-square rounded-lg cursor-pointer overflow-hidden"
            >
              <Image fill sizes="100vw" src={post.media_url} alt="image" />
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default PostNode;
