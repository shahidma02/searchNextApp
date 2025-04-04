"use client";

import { LuTag } from "react-icons/lu";
import { useState } from "react";

export default function Tab({
  tag_text,
  isSelected,
  onSelect,
}: {
  tag_text: string;
  isSelected: boolean;
  onSelect: (tag: string) => void;
}) {
  const toggleSelected = () => {
    onSelect(tag_text);
  };

  return (
    <div
      className={`${
        isSelected ? "bg-[var(--color-appPurple)]" : "bg-[#f2f4f8]"
      } h-[32] rounded-[20px] flex justify-center items-center space-x-2 px-5 cursor-pointer`}
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
        }`}
      />
      <p
        className={`${
          isSelected ? "text-white" : "text-[var(--color-appPurple)]"
        } text-[14px] font-[500]`}
      >
        {tag_text}
      </p>
    </div>
  );
}
