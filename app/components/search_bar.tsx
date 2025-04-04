"use client";

import { IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";

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
          <div className="absolute inset-y-0 start-0 flex text-[24px] items-center ps-3 pointer-events-none">
            <IoSearch />
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`bg-[#f2f4f8] rounded-[12px] text-[16px] sm:text-[20px] placeholder-gray-400 w-full h-full pl-12 focus:border-2 ${
              outline
                ? "focus:border-[#ed2e7e] focus:outline focus:outline-[#ed2e7e]"
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
