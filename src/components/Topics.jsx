import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import Topic from "./Topic";

export default function Topics({ topics }) {
  return (
    <div className="max-w-4xl mx-auto border p-4 bg-white rounded-lg space-y-2">
      <div className="flex gap-4 items-center">
        <div className="text-xl font-bold">Темы({topics?.length || 0})</div>
      </div>

      <div className="divide-y space-y-4">
        {topics?.map(topic => (
          <Topic topic={topic} key={topic.id} />
        ))}
      </div>
    </div>
  );
}
