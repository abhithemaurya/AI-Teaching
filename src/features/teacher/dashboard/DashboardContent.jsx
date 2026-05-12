"use client";

import {
  HelpCircle,
  FileText,
  BookOpen,
  CalendarDays,
  ArrowRight,
  Route,
} from "lucide-react";
import DashboardAnalyticsActivity from "./DashboardAnalyticsActivity";
import { useRouter } from "next/navigation";

const cards = [
  {
    title: "Question Generator",
    desc: "Instantly create high-quality assessment questions across various difficulty levels and subjects.",
    icon: HelpCircle,
    route:   "/teacher/questions"
  },
  {
    title: "Worksheet Maker",
    desc: "Design curriculum-aligned worksheets with practice problem, diagrams, and explanations.",
    icon: FileText,
    route :"/teacher/worksheets"
  },
  {
    title: "Lesson Planner",
    desc: "Craft comprehensive lesson structures including objectives, activities, and success criteria",
    icon: BookOpen,
    route: "/teacher/lessons"
  },
  {
    title: "Weekly Planner",
    desc: "Organize your entire week's curriculum flow with balanced pacing and milestone tracking.",
    icon: CalendarDays,
    route: "/teacher/weekly-planner"
  },
];

export default function DashboardContent() {
     const router = useRouter();
  return (
    <div  className="flex-grow ">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
             onClick={() => card.route && router.push(card.route)} 
              className="group bg-white p-5 md:p-6 rounded-xl flex flex-col transition hover:shadow-xl border-b-2 border-transparent hover:border-blue-500"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 group-hover:scale-110 transition">
                <Icon size={22} className="md:hidden" />
                <Icon size={28} className="hidden md:block" />
              </div>
              <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2">
                {card.title}
              </h3>

              <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6 flex-1">
                {card.desc}
              </p>

              <button className="flex items-center justify-center gap-2 text-sm bg-blue-100 hover:bg-blue-600 hover:text-white text-blue-600 py-2 rounded transition">
                Start <ArrowRight size={14} className="md:hidden" />
                <ArrowRight size={16} className="hidden md:block" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="w-full">
        <DashboardAnalyticsActivity />
      </div>
    </div>
  );
}