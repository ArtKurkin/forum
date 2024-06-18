import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";

export default function SelectSort({ setSortState }) {
  const [sortTitle, setSortTitle] = useState("Сначала старые");
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

  const changeSort = sortType => {
    setSortState(sortType.type);
    setSortTitle(sortType.title);
  };

  return (
    <div className="relative max-w-fit space-y-1">
      <button
        ref={button}
        onClick={dropdown}
        className=" border rounded-lg p-2 flex items-center bg-white"
      >
        <BiChevronDown size={20} className={`${isOpen && "rotate-180"}`} />
        {sortTitle}
      </button>

      {isOpen && (
        <div className="absolute z-40 drop-shadow border bg-white text-black rounded-md overflow-hidden max-h-32 overflow-y-auto min-w-full w-max">
          <button
            href="/programming"
            className="p-2 hover:bg-sky-50 block w-full text-left"
            onClick={() =>
              changeSort({
                title: "Сначала старые",
                type: "downdate",
              })
            }
          >
            Сначала старые
          </button>
          <button
            href="/programming"
            className="p-2 hover:bg-sky-50 block w-full text-left"
            onClick={() =>
              changeSort({
                title: "Сначала новые",
                type: "update",
              })
            }
          >
            Сначала новые
          </button>
          <button
            href="/programming"
            className="p-2 hover:bg-sky-50 block w-full text-left"
            onClick={() =>
              changeSort({
                title: "Сначала популярные",
                type: "uprating",
              })
            }
          >
            Сначала популярные
          </button>
        </div>
      )}
    </div>
  );
}
