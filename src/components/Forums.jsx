import React, { useEffect, useState } from "react";
import Forum from "./Forum";
import axios from "axios";

export default function Forums({ slug }) {
  const [forums, setForums] = useState();
  const [isLoadingForums, setIsLoadingForums] = useState(true);

  useEffect(() => {
    setIsLoadingForums(true);

    axios
      .get(`http://localhost:5000/api/categories/${slug}/forums`)
      .then(response => {
        setForums(response.data);
      })
      .catch(error => setForums(null))
      .finally(() => setIsLoadingForums(false));
  }, [slug]);

  if (isLoadingForums) {
    return (
      <div className="max-w-4xl mx-auto border p-4 bg-white rounded-lg space-y-2">
        <div className="flex gap-4 items-center">
          <div className="text-xl font-bold">Форумы</div>
        </div>

        <div className="divide-y space-y-4">Загрузка...</div>
      </div>
    );
  }

  if (forums) {
    return (
      <div className="max-w-4xl mx-auto border p-4 bg-white rounded-lg space-y-2">
        <div className="flex gap-4 items-center">
          <div className="text-xl font-bold">Форумы({forums?.length})</div>
        </div>

        <div className="divide-y space-y-4">
          {forums.map(forum => (
            <Forum forum={forum} key={forum.id} />
          ))}
        </div>
      </div>
    );
  } else {
    return <div>Тут ничего нет, увы</div>;
  }
}
