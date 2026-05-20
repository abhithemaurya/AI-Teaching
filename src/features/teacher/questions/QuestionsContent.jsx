"use client";

import { useState } from "react";
import QuestionForm from "./QuestionForm";
import QuestionPreview from "./QuestionPreview";

const questionTypes = [
  "Multiple Choice",
  "Short Answer",
  "True/False",
  "Essay Prompt",
];

export default function QuestionsContent() {
  const [selectedType, setSelectedType] = useState("Multiple Choice");
  return (
    <main className="flex-grow ">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            Question Generator
          </h1>
          <p className="text-gray-500 max-w-2xl">
            Engineer precise pedagogical assessments using AI
          </p>
        </header>
        <div className="grid lg:grid-cols-12 gap-12">
          <QuestionForm />
          <QuestionPreview />
        </div>
      </div>
    </main>
  );
}
