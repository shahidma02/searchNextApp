import Image from "next/image";
import React from "react";

interface MessageProps {
  imageURL: string;
}

export const Message: React.FC<MessageProps> = ({ imageURL }) => {
  return (
    <div className="h-[207px] sm:h-[414px] flex justify-center items-center">
      <Image
        src={imageURL}
        alt="Remote Image"
        width={247}
        height={213}
        className="rounded-[10px] w-[200px] h-[180] sm:w-[247px] sm:h-[213px]"
        priority
      />
    </div>
  );
};
