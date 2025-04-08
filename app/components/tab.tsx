"use client";

import { LuTag } from "react-icons/lu";
import { Poppins } from "next/font/google";

const popins = Poppins({
  subsets: ["latin"],
  weight: "500",
});
interface TabProps {
  tag_text: string;
  isSelected: boolean;
  onSelect: (tag: string) => void;
}

export const Tab: React.FC<TabProps> = ({ tag_text, isSelected, onSelect }) => {
  const toggleSelected = () => {
    onSelect(tag_text);
  };

  return (
    <div
      className={`${
        isSelected
          ? "bg-[var(--color-appPurple)]"
          : "bg-[var(--color-searchGrey)]"
      } group h-[32] rounded-[20px] flex justify-center items-center cursor-pointer hover:bg-[#7c52f9] px-[16px]`}
      onClick={toggleSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(tag_text);
        }
      }}
    >
      <LuTag
        className={`${
          isSelected ? "text-white" : "text-[var(--color-appPurple)]"
        } group-hover:text-gray-200 pr-[8px] text-[20px]`}
      />
      <p
        className={`${
          isSelected ? "text-white" : "text-[var(--color-appPurple)]"
        } text-[14px] ${
          popins.className
        } group-hover:text-gray-200 py-[7px] leading-[18px]`}
      >
        {tag_text}
      </p>
    </div>
  );
};
