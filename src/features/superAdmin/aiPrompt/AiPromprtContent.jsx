"use client"
import React, { useState } from "react";
import AiPromptForm from "./AiPromptForm";

const AiPromprtContent = () => {
  const [activeTab, setActiveTab] = useState(1);

  const promptTypes = [
    {
      id: 1,
      title: "Multiple Choice",
      type: "Multiple Choice",
      description: "Create prompt for MCQ generation.",
      placeholder: "Enter MCQ generation prompt here...",
    },
    {
      id: 2,
      title: "True/False",
      type: "True/False",
      description: "Create prompt for True False questions.",
      placeholder: "Enter True False prompt here...",
    },
    {
      id: 3,
      title: "Subjective",
      type: "Subjective",
      description: "Create prompt for Subjective questions.",
      placeholder: "Enter Subjective prompt here...",
    },
    {
      id: 4,
      title: "Multiple Response",
      type: "multiple-response",
      description: "Create prompt for multi-answer questions.",
      placeholder: "Enter Multiple Response prompt here...",
    },
  ];

  const activePrompt = promptTypes.find((item) => item.id === activeTab);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">
            Prompt Generation
          </h1>
          <p className="text-slate-500 mt-2 text-sm md:text-base">
            Manage and customize AI prompt used across the platform
          </p>
        </div>

        {/* Tabs + Panel */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden">

          {/* Tab Row */}
          <div className="flex flex-wrap bg-slate-50 border-b border-slate-200">
            {promptTypes.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-5 py-3 text-sm font-medium transition-all border-b-2 -mb-px
                  ${
                    activeTab === item.id
                      ? "border-slate-900 text-slate-900 bg-white"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                  }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Active Panel */}
          <div className="bg-white p-6">
            {activePrompt && (
              <AiPromptForm
                title={activePrompt.title}
                type={activePrompt.type}
                description={activePrompt.description}
                placeholder={activePrompt.placeholder}
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AiPromprtContent;