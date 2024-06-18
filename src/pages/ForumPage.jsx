import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoNewspaperOutline } from "react-icons/io5";
import { GoComment } from "react-icons/go";
import { TfiCommentAlt } from "react-icons/tfi";
import axios from "axios";
import Forums from "../components/Forums";
import Topics from "../components/Topics";

export default function ForumPage() {
  const [topics, setTopics] = useState([]);
  const [forum, setForum] = useState();
  const { slug } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/forums/${slug}/topics`)
      .then(response => {
        setTopics(response.data);
      })
      .catch(error => setTopics(null));

    axios
      .get(`http://localhost:5000/api/forums/slug/${slug}`)
      .then(response => {
        setForum(response.data);
      })
      .catch(error => {
        setForum(null);
      });
  }, [slug]);

  if (forum)
    return (
      <div className="space-y-2">
        <div className="max-w-4xl mx-auto border p-4 bg-white rounded-lg space-y-2">
          <h1 className="text-2xl font-bold">Форум {forum.title}</h1>
          <p>{forum.description}</p>
          <div className="flex items-center flex-wrap space-x-4">
            <div className="flex gap-0.5 items-center text-gray-400">
              <IoNewspaperOutline />
              Темы: {topics?.length || 0}
            </div>
            <div className="flex gap-0.5 items-center text-gray-400">
              <TfiCommentAlt />
              Постов: {forum.postsCount}
            </div>
          </div>
        </div>

        {topics ? (
          <Topics topics={topics} />
        ) : (
          <div className="mx-auto text-center">Здесь пока нет постов</div>
        )}
      </div>
    );
  else
    return (
      <div className="mx-auto text-center text-xl font-bold">
        Не удалось найти тему
      </div>
    );
}
