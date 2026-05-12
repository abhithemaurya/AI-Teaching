"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";

const WorksheetForm = () => {
  const [difficulty, setDifficulty] = useState("Introductory");

  return (
    <section className="bg-[#eef4fa] border border-gray-200 rounded-xl p-4 sm:p-6 lg:p-8 w-full">

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-end">

        <div className="w-full">
          <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">
            Class Grade
          </label>

          <select className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
            <option>Elementary (3-5)</option>
            <option>Middle School</option>
            <option>High School</option>
          </select>
        </div>

        <div className="w-full md:col-span-2 xl:col-span-1">
          <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">
            Subject/Topic
          </label>

          <input
            placeholder="e.g., Photosynthesis & Carbon Cycle"
            className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>


        <div className="w-full">
          <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">
            Difficulty
          </label>

          <div className="flex flex-wrap gap-2">
            {["Introductory", "Standard", "Advanced"].map((level) => (
              <button
                type="button"
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-4 py-2 text-xs sm:text-sm rounded-full font-semibold transition whitespace-nowrap ${difficulty === level
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-500 hover:bg-blue-50"
                  }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full">
          <button className="w-full h-12 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 rounded-lg shadow hover:scale-[1.02] active:scale-95 transition">
            <Sparkles size={16} />
            Generate Blueprint
          </button>
        </div>
      </div>
    </section>
  );
};

export default WorksheetForm;