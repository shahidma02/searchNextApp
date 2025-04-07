"use client";

import { IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";

const popins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export default function SearchBar({
  selectedTag,
  onSearchChange,
  outline,
}: {
  selectedTag: string | null;
  onSearchChange: (query: string) => void;
  outline: string | null;
}) {
  const [searchQuery, setSearchQuery] = useState<string>(selectedTag || "");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    setSearchQuery(selectedTag || "");
    if (selectedTag != null) {
      onSearchChange(selectedTag);
    }
  }, [selectedTag]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchChange(e.target.value);
  };

  const handleFocus = () => {
    setSearchQuery(selectedTag || "");
    onSearchChange(selectedTag || "");
    setIsFocused(true);
  };

  return (
    <div className="w-[321px] sm:w-[642px]">
      <form>
        {/* <p>{searchQuery}</p> */}
        <div className="relative h-[60px] sm:h-[74px] ">
          <div className="absolute py-[25px] flex text-[24px] items-center pl-[24px] pointer-events-none">
            <IoSearch />
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`bg-[#F2F4F8] pl-[60px] py-[24px] ${
              popins.className
            } rounded-[12px] leading-[26px] text-[16px] sm:text-[20px] placeholder-gray-400 w-full h-full px-0 focus:border-2 ${
              outline
                ? "focus:border-[#ED2E7E] focus:outline focus:outline-[#ED2E7E]"
                : "focus:border-[var(--color-appPurple)] focus:outline focus:outline-[var(--color-appPurple)]"
            }`}
            placeholder="Search technologies we use at DC..."
            required
          />
        </div>
      </form>
    </div>
  );
}
