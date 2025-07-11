"use client";
import { FileWarning, MessageCircle } from "lucide-react";
import { GiArtificialIntelligence } from "react-icons/gi";
import PostButton from "../post";
import { OnAutomationInfo } from "@/app/actions/user";

type Props = {
  id: string;
};

const ThenNode = ({ id }: Props) => {
  const { automation } = OnAutomationInfo(id);
  const commentTrigger = automation?.trigger.find((t) => t.type === "COMMENT");

  return automation?.listener?.length === 0 ? (
    <></>
  ) : (
    <div className="w-full lg:w-10/12 relative xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-2">
      <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
        <span className="h-[9px] w-[9px] bg-background rounded-full" />
        <div className="h-full border-l border-gray-300 mx-4" />
        <span className="h-[9px] w-[9px] bg-background rounded-full" />
      </div>
      <div className="flex gap-x-2">
        <FileWarning />
        Then...
      </div>
      <div className="bg-background p-3 rounded-xl flex flex-col gap-y-2">
        <div className="flex gap-x-2 items-center">
          {automation?.listener[0]?.type === "MESSAGE" ? (
            <MessageCircle />
          ) : (
            <GiArtificialIntelligence />
          )}
          <p className="font-bold text-lg">
            {automation?.listener[0]?.type === "MESSAGE"
              ? "Send the user a message"
              : "Lets smart AI take over"}
          </p>
        </div>
        <p className="font-light text-gray-500">
          {automation?.listener[0]?.prompt}
        </p>
      </div>
      {automation?.posts && automation.posts.length > 0 ? (
        <></>
      ) : commentTrigger ? (
        <PostButton id={id} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ThenNode;
