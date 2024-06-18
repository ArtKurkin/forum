import React, {
  Suspense,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  Await,
  Navigate,
  useAsyncValue,
  useLoaderData,
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
import { toast } from "sonner";
import { Context } from "../main";
import axios, { Axios } from "axios";
import Posts from "../components/Posts";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import $api from "../http";
import { observer } from "mobx-react-lite";

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

function TopicPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { store } = useContext(Context);
  const [topic, setTopic] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();

  const getTopic = async () => {
    $api
      .get(`http://localhost:5000/api/topics/slug/${slug}`)
      .then(response => {
        const result = response.data.topicUsers.find(element => {
          return element.userId == store.user.id;
        });

        if (result?.ratingValue == 1) {
          dispatch({ type: "like" });
        }

        if (result?.ratingValue == -1) {
          dispatch({ type: "dislike" });
        }

        if (!result) {
          dispatch({ type: "unlike" });
        }
        setTopic(response.data);
      })
      .catch(error => {
        console.log(error);
        navigate("/notfound");
        return;
      });
  };

  useEffect(() => {
    getTopic();
  }, []);

  const like = async () => {
    $api
      .post(`/topics/${topic.id}/like`)
      .then(response => {
        getTopic();
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
      .post(`/topics/${topic.id}/dislike`)
      .then(response => {
        getTopic();
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

  if (topic)
    return (
      <div className="max-w-4xl mx-auto">
        <div className="border p-4 bg-white rounded-lg space-y-2">
          <div>
            <div className="font-bold text-2xl">{topic.title}</div>
            <div className="text-gray-400 flex gap-1">
              <Link
                to={`/category/${topic.category.slug}`}
                className="hover:underline"
              >
                {topic.category.title}
              </Link>
              {" > "}
              <Link
                to={`/forum/${topic.forum.slug}`}
                className="hover:underline"
              >
                {topic.forum.title}
              </Link>
            </div>
          </div>
          <hr />
          <div className=" flex gap-2">
            <div className="text-black font-bold">{topic.user.name}</div>
            <div className="text-gray-400">
              {new Date(topic.createdAt).getDate()}.
              {new Date(topic.createdAt).getMonth()}.
              {new Date(topic.createdAt).getFullYear()}
            </div>
          </div>
          <div>{topic.content}</div>
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
                  topic?.ratingValue >= 0
                    ? "text-green-500 font-bold"
                    : "text-red-500 font-bold"
                }
              >
                {topic?.ratingValue || 0}
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
        <Posts slug={slug} topicId={topic.id} />
      </div>
    );
}

export default observer(TopicPage);
