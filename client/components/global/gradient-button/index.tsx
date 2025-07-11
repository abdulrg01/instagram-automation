import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  type: "BUTTON" | "LINK";
  href?: string;
  className?: string;
};

const GradientButton = ({ children, type, className }: Props) => {
  const gradient =
    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-[2px]";

  switch (type) {
    case "BUTTON":
      return (
        <div className={gradient}>
          <Link href={""} className={cn(className, "rounded-xl")}>
            {children}
          </Link>
        </div>
      );

    case "LINK":
      return <div className={gradient}></div>;

    default:
      return;
  }
};

export default GradientButton;
