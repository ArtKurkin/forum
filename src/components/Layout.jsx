import React, { useContext, useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Select from "./Select";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { toast } from "sonner";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";

function Layout() {
  const [topics, setTopics] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const { store } = useContext(Context);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories/")
      .then(res => res.json())
      .then(data => setTopics(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <div className="pb-14">
        <header className="w-full px-4 fixed bg-sky-700 z-50">
          <div className="mx-auto max-w-4xl flex justify-between items-center">
            <div className="flex items-center gap-8">
              <h1 className="font-bold text-white">
                <Link
                  to="/"
                  className="font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  Gamedev Forum
                </Link>
              </h1>
              <div className="space-x-4 flex hidden md:flex">
                <Select items={topics} />
                <NavLink
                  to="/posts/new"
                  className="p-4 text-white hover:bg-sky-600"
                >
                  Создать тему
                </NavLink>
              </div>
            </div>
            <div className="hidden md:block">
              {!store.isAuth ? (
                <NavLink
                  to="/login"
                  className="bg-white text-sky-700 py-2 px-4 rounded-lg hover:bg-sky-50 block text-center"
                >
                  Войти
                </NavLink>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="text-white">{store.user.name}</div>
                  <button
                    onClick={() => store.logout()}
                    className="bg-white text-sky-700 py-2 px-4 rounded-lg hover:bg-sky-50 block text-center"
                  >
                    Выйти
                  </button>
                </div>
              )}
            </div>
            <div
              className="block md:hidden p-4 hover:bg-sky-600"
              onClick={() => setIsOpen(prev => !prev)}
            >
              {isOpen ? (
                <IoCloseOutline color="white" size={24} />
              ) : (
                <RxHamburgerMenu color="white" size={24} />
              )}
            </div>
          </div>
        </header>
        {isOpen ? (
          <div className="fixed md:hidden bg-white w-full h-full z-50 top-14 divide-y">
            <button
              className="block text-xl py-4  px-4 hover:bg-sky-50 w-full text-left"
              onClick={() => {
                setIsOpenCategory(prev => !prev);
              }}
            >
              Разделы
            </button>

            {isOpenCategory && (
              <div className="divide-y">
                {topics?.map(item => {
                  return (
                    <Link
                      to={`category/${item.slug}`}
                      className="p-2 rounded-md hover:bg-sky-50 pl-8 flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <BiChevronRight />
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            )}

            <Link
              to="/posts/new"
              className="block text-xl py-4  underline-offset-2 px-4 hover:bg-sky-50"
              onClick={() => setIsOpen(false)}
            >
              Создать тему
            </Link>
            {!store.isAuth ? (
              <NavLink
                to="/login"
                className="block text-xl py-4 h underline-offset-2 px-4 hover:bg-sky-50"
                onClick={() => setIsOpen(false)}
              >
                Войти
              </NavLink>
            ) : (
              <button
                onClick={() => store.logout()}
                className="text-xl py-2  w-full text-left flex gap-2 items-center hover:bg-sky-50 px-4"
              >
                Выйти
                <div className="bg-sky-700 text-white rounded-md p-1 no-underline">
                  {store.user.name}
                </div>
              </button>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
}

export default observer(Layout);
