import React from "react";
import { Link } from "react-router-dom";
import { BsFileEarmarkPost } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TfiCommentAlt } from "react-icons/tfi";

export default function Forum({ forum }) {
  return (
    <div className="block space-y-1 pt-4">
      <Link to={`/forum/${forum.slug}`}>
        <div className="text-lg font-bold">{forum.title}</div>
        <div className="">{forum.description}</div>
      </Link>
      <div className="flex items-center flex-wrap space-x-2">
        <div className="flex gap-0.5 items-center text-gray-400">
          <IoNewspaperOutline />
          Темы: {forum?.topics?.length}
        </div>
      </div>
    </div>
  );
}
