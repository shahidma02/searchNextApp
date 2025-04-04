"use client";
import Image from "next/image";
import Link from "next/link";
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
          className="rounded-[10px]"
        />
      </div>
      <div className="w-[200px] h-[50px] sm:w-[468px] sm:h-[76px] flex flex-col justify-center">
        <p className="text-[18px] sm:text-[20px] font-[400]">{title}</p>
        <p className="text-[14px] sm:text-[16px] font-[400] text-gray-400 overflow-ellipsis overflow-hidden whitespace-nowrap">
          {description}
        </p>
      </div>

      <div className="flex items-center sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity sm:duration-200">
        <Link href="/details">
          <FaSquareArrowUpRight className="text-[26px] text-[#e0e3e8] opacity-100" />
        </Link>
      </div>
    </div>
  );
}
