"use client";
import Image from "next/image";
import { FaSquareArrowUpRight } from "react-icons/fa6";

export default function Result({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className="w-[321px] h-[80px] sm:w-[642px] sm:h-[100px] mt-5 rounded-[12px] p-[12px] flex space-x-[10px] sm:space-x-[30px] hover:bg-[#edeaf8] group">
      <div className="flex items-center">
        <Image
          src={image}
          alt="Remote Image"
          width={76}
          height={76}
          className="rounded-[10px] sm:w-[76px] sm:h-[76px] w-[50px] h-[50px]"
        />
      </div>
      <div className="w-[200px] h-[50px] sm:w-[468px] sm:h-[76px] flex flex-col justify-center">
        <p className="text-[18px] sm:text-[20px] font-[400]">{title}</p>
        <p className="text-[14px] sm:text-[16px] font-[400] text-gray-400 overflow-ellipsis overflow-hidden whitespace-nowrap">
          {description}
        </p>
      </div>

      <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <FaSquareArrowUpRight className="text-[26px] text-[#e0e3e8]" />
      </div>
    </div>
  );
}
