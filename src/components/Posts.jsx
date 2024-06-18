import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Context } from "../main";
import { toast } from "sonner";
import Post from "./Post";
import $api from "../http";
import { useSearchParams } from "react-router-dom";
import SelectSort from "./SelectSort";

export default function Posts({ slug, topicId }) {
  const [content, setContent] = useState();
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [isNextPost, setIsNextPost] = useState(null);
  const [sortType, setSortType] = useState("downdate");
  const { store } = useContext(Context);

  const getPosts = () => {
    axios
      .get(
        `http://localhost:5000/api/topics/${slug}/posts${
          nextPage ? "?page=" + nextPage : ""
        }&limit=10${sortType ? "&sort=" + sortType : ""}`
      )
      .then(response => {
        setTotalCount(response.data.totalCount);
        setPosts(prev => [...prev, ...response.data.results]);
        if (response.data?.next) {
          setNextPage(prev => prev + 1);
          setIsNextPost(true);
        } else {
          setIsNextPost(false);
        }
      });
  };

  const getPostSort = sort => {
    setSortType(sort);
    axios
      .get(
        `http://localhost:5000/api/topics/${slug}/posts?page=1&limit=10${
          sort ? "&sort=" + sort : ""
        }`
      )
      .then(response => {
        setTotalCount(response.data.totalCount);
        setPosts(response.data.results);
        if (response.data?.next) {
          setIsNextPost(true);
          setNextPage(2);
        } else {
          setIsNextPost(false);
        }
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const keyUp = e => {
    e.target.style.height = `auto`;
    let scHeight = e.target.scrollHeight;
    e.target.style.height = `${scHeight}px`;
    setContent(e.target.value);
  };

  const addPost = async () => {
    if (!store?.user?.id) {
      toast.error("Зайдите в аккаунт");
      return;
    }
    await $api
      .post(`/posts`, {
        userId: store.user.id,
        topicId: topicId,
        content: content,
      })
      .then(response => {
        setContent("");
        getPostSort("update");
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
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 px-2 py-4">
        <h2 className="text-xl font-bold ">Сообщения({totalCount})</h2>
        <SelectSort sortState={sortType} setSortState={getPostSort} />
      </div>
      <div className="space-y-2 mb-2">
        {posts?.length ? (
          posts.map(post => {
            return <Post key={post.id} post={post} getPosts={getPostSort} />;
          })
        ) : (
          <div className="p-2">Нет сообщений</div>
        )}
      </div>
      {isNextPost ? (
        <button
          className="border p-4 bg-white rounded-lg space-y-2 w-full mb-2"
          onClick={() => getPosts()}
        >
          Загрузить еще
        </button>
      ) : (
        ""
      )}

      <div className="border p-4 bg-white rounded-lg sticky bottom-0 shadow">
        <textarea
          value={content}
          type="text"
          className="border rounded-lg p-2 w-full resize-none outline-none overflow-hidden"
          onChange={keyUp}
          placeholder="Введите текст комментария"
        />
        <button
          className="bg-sky-700 text-white p-2 rounded-lg border hover:bg-sky-600"
          onClick={addPost}
        >
          Написать
        </button>
      </div>
    </div>
  );
}
