import React from "react";

const Card = ({ item }) => {
  return (
    <>
      <div class="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl">
        <div class="h-48 bg-gray-700 rounded-xl"></div>
        {item && <div class="flex flex-col gap-4">
          <div class="flex flex-col">
            <div class="flex justify-between">
              <span class="text-xl font-bold">{item.name}</span>
              <p class="text-gray-700">{item.desc}</p>
            </div>
            <div className="flex justify-between">
              <span class="font-boldtext-black">
                {"$".repeat(item.category)}
              </span>
              <span class="text-black">{item.price}</span>
            </div>
            <div className="flex justify-between">
              <p class="text-gray-700">{item.date.startdate}</p>
              <p class="text-gray-700">{item.date.enddate}</p>
            </div>
            <div className="flex justify-between">
              <p class="text-gray-700">{item.venue}</p>
              <p class="text-gray-700">{item.venuelink}</p>
            </div>
          </div>
          <button class="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2 rounded-md">
            Details
          </button>
        </div>}
      </div>
    </>
  );
};

export default Card;
