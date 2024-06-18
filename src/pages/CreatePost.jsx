import React, { useContext, useEffect, useRef, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { postValidation } from "../validations/postValidation";
import $api from "../http";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { BiChevronDown } from "react-icons/bi";

function CreatePost() {
  const [isOpen, setOpen] = useState(false);
  const [topics, setTopics] = useState([]);
  const [title, setTitle] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const button = useRef(null);
  const { store } = useContext(Context);

  const handleClickOutside = event => {
    if (button.current && !button.current?.contains(event.target)) {
      setOpen(false);
    }
  };
  const dropdown = event => {
    setOpen(prev => !prev);
  };

  const keyUp = e => {
    e.target.style.height = `auto`;
    let scHeight = e.target.scrollHeight;
    e.target.style.height = `${scHeight}px`;
    setContent(e.target.value.trim());
  };

  const newPost = async () => {
    const newPost = {
      userId: store.user.id,
      forumId: selectedTopic?.id,
      content: content,
      title: title,
    };

    const { error } = postValidation(newPost);

    if (error) {
      toast.error(error.message);
      return;
    }

    await $api
      .post(`/topics`, newPost)
      .then(response => {
        navigate(`/topic/${response.data.slug}`);
      })
      .catch(error => {
        console.log(error);
        if (error.response) {
          if (error.response.status == 401) {
            store.logout(() => navigate("/login", { replace: true }));
            return;
          }

          if (error.response.status >= 300 || error.response.status < 200) {
            toast.error(error.response.data.message);
            return;
          }
        } else {
          toast.error("Ошибка запроса");
          return;
        }
      });
  };

  useEffect(() => {
    $api
      .get("http://localhost:5000/api/forums/")
      .then(response => setTopics(response.data))
      .catch(error => {
        console.log(error);
        toast.error(error);
      })
      .finally(() => setLoading(false));

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (loading) return <div>Загрузка</div>;

  return (
    <div className="space-y-2 max-w-4xl mx-auto border p-4 bg-white rounded-lg ">
      <h2 className="font-bold text-lg">Новая тема</h2>
      <div className="relative max-w-fit space-y-1">
        <button
          ref={button}
          onClick={dropdown}
          className=" border rounded-lg p-2 flex items-center"
        >
          {selectedTopic ? selectedTopic.title : "Выберете форум"}
          <BiChevronDown size={20} className={`${isOpen && "rotate-180"}`} />
        </button>

        {isOpen && (
          <div className="absolute drop-shadow border bg-white text-black rounded-md overflow-hidden max-h-32 overflow-y-auto min-w-full w-max">
            {topics.map(topic => {
              return (
                <button
                  className="p-2 hover:bg-sky-50 block w-full text-left"
                  onClick={() => setSelectedTopic(topic)}
                >
                  {topic.title}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <input
        type="text"
        name="title"
        placeholder="Введите заголовок поста"
        className="border rounded-lg p-2 w-full "
        onChange={e => setTitle(e.target.value.trim())}
      />
      <textarea
        type="text"
        className="border rounded-lg p-2 w-full resize-none outline-none overflow-hidden"
        onChange={keyUp}
        placeholder="Введите текст поста"
      />

      <button
        className="bg-sky-700 text-white p-2 rounded-lg border hover:bg-sky-600"
        onClick={newPost}
      >
        Написать
      </button>
    </div>
  );
}

export default observer(CreatePost);
