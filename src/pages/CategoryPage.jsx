import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Forums from "../components/Forums";

export default function CategoryPage() {
  const [forums, setForums] = useState([]);
  const [category, setCategory] = useState();
  const [isLoadingCategory, setIsLoadingCategory] = useState(true);
  const [isLoadingForums, setIsLoadingForums] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoadingCategory(true);
    setIsLoadingForums(true);

    axios
      .get(`http://localhost:5000/api/categories/${slug}/forums`)
      .then(response => {
        setForums(response.data);
      })
      .catch(error => setForums(null))
      .finally(() => setIsLoadingForums(false));

    axios
      .get(`http://localhost:5000/api/categories/slug/${slug}`)
      .then(response => {
        setCategory(response.data);
      })
      .catch(error => {
        setCategory(null);
      })
      .finally(() => setIsLoadingCategory(false));
  }, [slug]);

  console.log(isLoadingCategory);

  if (isLoadingCategory) {
    return (
      <div className="space-y-2">
        <div className="max-w-4xl mx-auto border p-4 bg-white rounded-lg space-y-2">
          <div className="text-2xl font-bold block bg-gray-200 h-8 w-1/2 rounded"></div>
          <div className="block bg-slate-200 h-6 w-1/4 rounded"></div>
        </div>
      </div>
    );
  }

  if (category)
    return (
      <div className="space-y-2">
        <div className="max-w-4xl mx-auto border p-4 bg-white rounded-lg space-y-2">
          <h1 className="text-2xl font-bold">Раздел {category.title}</h1>
          <p>{category.description}</p>
        </div>

        {/* {forums ? ( */}
        <Forums slug={slug} />
        {/* ) : (
      //   <div className="mx-auto text-center">Здесь пока нет форумов</div>
      // )}*/}
      </div>
    );
  else
    return (
      <div className="mx-auto text-center text-xl font-bold">
        Не удалось найти тему
      </div>
    );
}
