import { PAGE_ICONS } from "@/constant/page";
import React from "react";

type Props = {
  page: string;
  slug?: string;
};

const MainBreedCrumb = ({ page, slug }: Props) => {
  return (
    <div className="flex flex-col items-start">
      {page === "Home" && (
        <div className="flex justify-center w-full">
          <div className="w-4/12 py-5 lg:py-6 flex flex-col items-center">
            <p className="text-muted-foreground text-lg">Welcome back</p>
            <h2 className="capitalize text-4xl font-medium">{slug}</h2>
          </div>
        </div>
      )}

      <span className="inline-flex py-4 pr-16 gap-x-2 items-center">
        {PAGE_ICONS[page.toUpperCase()]}
        <h2 className="font-semibold text-2xl capitalize">{page}</h2>
      </span>
    </div>
  );
};

export default MainBreedCrumb;
