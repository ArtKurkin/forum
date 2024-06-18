import React, { useContext, useEffect, useReducer, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TfiComment } from "react-icons/tfi";
import { GoComment } from "react-icons/go";
import { BiCommentDetail } from "react-icons/bi";
import $api from "../http";
import { toast } from "sonner";
import { Context } from "../main";
import { MdOutlineDeleteForever } from "react-icons/md";

const initialState = { isLike: false, isDislike: false };

function reducer(state, action) {
  switch (action.type) {
    case "like":
      return { isLike: true, isDislike: false };
    case "dislike":
      return { isLike: false, isDislike: true };
    case "unlike":
      return { isLike: false, isDislike: false };
    default:
      return state;
  }
}

export default function Post({ post, getPosts }) {
  const [rating, setRating] = useState(post.ratingValue);
  const [state, dispatch] = useReducer(reducer, initialState);
  const data = new Date(post.createdAt);
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const getPost = async () => {
    $api
      .get(`/posts/id/${post.id}`)
      .then(response => {
        const result = response.data.postUsers.find(
          element => element.userId == store.user.id
        );

        if (result?.ratingValue == 1) {
          dispatch({ type: "like" });
        }

        if (result?.ratingValue == -1) {
          dispatch({ type: "dislike" });
        }

        if (!result) {
          dispatch({ type: "unlike" });
        }
        setRating(response.data.ratingValue);
      })
      .catch(error => {
        console.log(error);
        if (error.response) {
          if (error.response.status == 401) {
            store.logout(() => navigate("/login", { replace: true }));
            return;
          }
          toast.error(error.response.data.message);
          return;
        } else {
          toast.error("Ошибка запроса");
          return;
        }
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  const deletePost = async () => {
    $api
      .delete(`/posts/${post.id}`)
      .then(response => {
        getPosts();
      })
      .catch(error => {
        console.log(error);
        if (error.response) {
          if (error.response.status == 401) {
            store.logout(() => navigate("/login", { replace: true }));
            return;
          }
          toast.error(error.response.data.message);
          return;
        } else {
          toast.error("Ошибка запроса");
          return;
        }
      });
  };

  const like = async () => {
    $api
      .post(`/posts/${post.id}/like`)
      .then(response => {
        getPost();
      })
      .catch(error => {
        console.log(error);
        if (error.response) {
          if (error.response.status == 401) {
            store.logout(() => navigate("/login", { replace: true }));
            return;
          }
          toast.error(error.response.data.message);
          return;
        } else {
          toast.error("Ошибка запроса");
          return;
        }
      });
  };

  const disLike = async () => {
    $api
      .post(`/posts/${post.id}/dislike`)
      .then(response => {
        getPost();
      })
      .catch(error => {
        console.log(error);
        if (error.response) {
          if (error.response.status == 401) {
            store.logout(() => navigate("/login", { replace: true }));
            return;
          }
          toast.error(error.response.data.message);
          return;
        } else {
          toast.error("Ошибка запроса");
          return;
        }
      });
  };

  return (
    <div className="border p-4 bg-white rounded-lg space-y-2">
      <div className=" flex gap-2 justify-between">
        <div className="flex gap-2">
          <div className="text-black font-bold">{post?.user?.name}</div>
          <div className="text-gray-400">
            {new Date(data).getDate()}.{new Date(data).getMonth()}.
            {new Date(data).getFullYear()}
          </div>
        </div>

        {store?.user?.role == "admin" && (
          <button
            className="bg-red-400  hover:bg-red-500 p-1 rounded-md flex text-white items-center"
            onClick={() => deletePost()}
          >
            <MdOutlineDeleteForever color="white" /> Удалить
          </button>
        )}
      </div>
      <div>{post.content}</div>
      <div className=" top-1 flex gap-4">
        <div className="flex items-center gap-0.5">
          <button
            className={
              state.isDislike
                ? "bg-red-200 hover:bg-slate-200 rounded-full p-0.5"
                : "hover:bg-slate-200 rounded-full p-0.5"
            }
            onClick={disLike}
          >
            <IoIosArrowDown />
          </button>
          <div
            className={
              rating >= 0
                ? "text-green-500 font-bold"
                : "text-red-500 font-bold"
            }
          >
            {rating}
          </div>
          <button
            className={
              state.isLike
                ? "bg-green-200 hover:bg-slate-200 rounded-full p-0.5"
                : "hover:bg-slate-200 rounded-full p-0.5"
            }
            onClick={like}
          >
            <IoIosArrowUp />
          </button>
        </div>
      </div>
    </div>
  );
}
