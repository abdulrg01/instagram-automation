import { SearchIcon } from "lucide-react";
import React from "react";

const Search = () => {
  return (
    <div className="flex overflow-hidden gap-x-2 border-2 border-[#3352CC] rounded-full px-4 py-1 items-center w-full">
      <SearchIcon color="#3352CC" />
      <input
        type="text"
        placeholder="Search by name, email or status"
        className="outline-none border-none ring-0 focus:ring-0 text-sm w-full"
      />
    </div>
  );
};

export default Search;
