"use client";

import { IoSearch } from "react-icons/io5";
import React, { useState, useEffect, useCallback } from "react";
import { Poppins } from "next/font/google";

const popins = Poppins({
  subsets: ["latin"],
  weight: "400",
});
interface SearchBarProps {
  selectedTag: string | null;
  onSearchChange: (query: string) => void;
  outline: boolean;
}
export const SearchBar: React.FC<SearchBarProps> = ({
  selectedTag,
  onSearchChange,
  outline,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(selectedTag || "");

  useEffect(() => {
    setSearchQuery(selectedTag || "");
    if (selectedTag != null) {
      onSearchChange(selectedTag);
    }
  }, [selectedTag]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      onSearchChange(e.target.value);
    },
    [onSearchChange]
  );

  const handleFocus = useCallback(() => {
    setSearchQuery(selectedTag || "");
    onSearchChange(selectedTag || "");
  }, [selectedTag, onSearchChange]);

  return (
    <div className="w-[321px] sm:w-[642px]">
      <form>
        <div className="relative h-[60px] sm:h-[74px] ">
          <div className="absolute py-[25px] flex text-[24px] items-center pl-[24px] pointer-events-none">
            <IoSearch />
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`bg-[var(--color-searchGrey)] pl-[60px] py-[24px] ${
              popins.className
            } rounded-[12px] leading-[26px] text-[16px] sm:text-[20px] placeholder-gray-400 w-full h-full px-0 focus:border-2 ${
              outline
                ? "focus:border-[var(--color-error)] focus:outline focus:outline-[var(--color-error)]"
                : "focus:border-[var(--color-appPurple)] focus:outline focus:outline-[var(--color-appPurple)]"
            }`}
            placeholder="Search technologies we use at DC..."
            required
          />
        </div>
      </form>
    </div>
  );
};
