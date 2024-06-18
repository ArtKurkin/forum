import React from "react";
import { Link } from "react-router-dom";
import { BsFileEarmarkPost } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TfiCommentAlt } from "react-icons/tfi";

export default function Topic({ topic }) {
  return (
    <div className="block space-y-1 pt-4">
      <Link to={`/topic/${topic.slug}`}>
        <div className="text-lg font-bold">{topic.title}</div>
      </Link>
      <div className="flex items-center flex-wrap space-x-4">
        <div className="flex gap-0.5 items-center text-gray-400">
          Рейтинг:{" "}
          <div
            className={
              topic?.ratingValue >= 0
                ? "text-green-500 font-bold"
                : "text-red-500 font-bold"
            }
          >
            {topic?.ratingValue || 0}
          </div>
        </div>
        <div className="flex gap-0.5 items-center text-gray-400">
          <TfiCommentAlt />
          Постов: {topic?.posts?.length || 0}
        </div>
      </div>
    </div>
  );
}
