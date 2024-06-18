import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";

export default function Select({ items }) {
  const [isOpen, setOpen] = useState(false);
  const button = useRef(null);

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const dropdown = event => {
    setOpen(prev => !prev);
  };

  const handleClickOutside = event => {
    if (button.current && !button.current?.contains(event.target)) {
      setOpen(false);
    }
  };
  return (
    <div className="relative max-w-fit ">
      <button
        ref={button}
        onClick={dropdown}
        className="p-4  text-white hover:bg-sky-600 flex items-center"
      >
        <BiChevronDown size={20} className={`${isOpen && "rotate-180"}`} />
        Разделы
      </button>

      {items && isOpen && (
        <div className="absolute drop-shadow border bg-white text-black rounded-md overflow-hidden max-h-32 overflow-y-auto min-w-full w-max ">
          {items?.map(item => {
            return (
              <Link
                to={`category/${item.slug}`}
                className="p-2 rounded-md hover:bg-sky-50 block"
                key={item.id}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
