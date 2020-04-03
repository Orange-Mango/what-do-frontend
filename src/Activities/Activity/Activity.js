import React, { useState } from "react";

const Activity = ({ index, removeActivity }) => {
  return (
    <div
      style={{
        transform: `translateY(${index * 10}px)`,
        border: "1px solid grey",
      }}
      className={`absolute max-w-sm rounded overflow-hidden shadow-lg bg-white z-${index} ml-8 mt-8`}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-purple-500 text-xl mb-2">Excercise</div>
        <p className="text-gray-700 text-base">
          Just lift some weights or something, idk.
        </p>
      </div>
      <div className="px-6 py-4">
        <span
          onClick={() => {
            removeActivity(index);
          }}
          className="inline-block bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
        >
          x
        </span>
        <span className="inline-block bg-green-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          ✓
        </span>
      </div>
    </div>
  );
};

export default Activity;
