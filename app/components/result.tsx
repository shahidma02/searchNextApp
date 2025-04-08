"use client";
import Image from "next/image";
import Link from "next/link";
import { FaSquareArrowUpRight } from "react-icons/fa6";
import { Poppins } from "next/font/google";

const popins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

interface ResultProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

export const Result: React.FC<ResultProps> = ({
  title,
  description,
  image,
  url,
}) => {
  return (
    <Link href={url}>
      <div className="w-[321px] h-[80px] sm:w-[642px] sm:h-[100px] mb-[10px] rounded-[12px] p-[6px] sm:p-[12px] flex space-x-[10px] sm:space-x-[20px] hover:bg-[var(--color-searchGrey)] group">
        <div className="flex items-center relative sm:w-[76px] sm:h-[76px] w-[60px] h-[60px]">
          <Image
            src={image}
            alt="Remote Image"
            sizes="76px"
            fill
            className="rounded-[10px] object-cover"
          />
        </div>

        <div className="w-[193px] h-[50px] sm:w-[468px] sm:h-[76px] flex flex-col justify-center">
          <p
            className={`text-[18px] sm:text-[20px] font-[400] leading-[26px] ${popins.className} pb-[8px]`}
          >
            {title}
          </p>
          <p
            className={`${popins.className} text-[14px] sm:text-[16px] font-[400] leading-[20px] text-gray-400 overflow-ellipsis overflow-hidden whitespace-nowrap`}
          >
            {description}
          </p>
        </div>

        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <FaSquareArrowUpRight className="text-[26px] text-[#e0e3e8]" />
        </div>
      </div>
    </Link>
  );
};
