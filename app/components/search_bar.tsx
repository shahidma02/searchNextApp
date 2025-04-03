"use client";

import { IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";

export default function SearchBar({
  selectedTag,
  onSearchChange,
}: {
  selectedTag: string | null;
  onSearchChange: (query: string) => void;
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
    setIsFocused(true);
  };

  return (
    <div className="w-[642px]">
      <form>
        <div className="relative h-[74px]">
          <div className="absolute inset-y-0 start-0 flex text-[24px] items-center ps-3 pointer-events-none">
            <IoSearch />
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={handleChange}
            onFocus={handleFocus}
            className="bg-[#f2f4f8] rounded-[12px] text-[20px] placeholder-gray-400 w-full h-full pl-12 focus:border-1 focus:border-[var(--color-appPurple)] focus:outline focus:outline-[var(--color-appPurple)]"
            placeholder="Search technologies we use at DC..."
            required
          />
        </div>
      </form>
    </div>
  );
}
