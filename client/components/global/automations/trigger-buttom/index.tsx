import React from "react";
import { PlusCircle } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  label: string;
  children: React.ReactNode;
};
const TriggerButton = ({ label, children }: Props) => {
  return (
    <Popover>
      <PopoverTrigger className="border-2 text-[#768BDD] border-dashed flex w-full border-[#3352cc] hover:opacity-80 cursor-pointer transition duration-100 rounded-xl gap-x-2 justify-center items-center p-3">
        <PlusCircle />
        <p className="font-bold">{label}</p>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] h-full">{children}</PopoverContent>
    </Popover>
  );
};

export default TriggerButton;
