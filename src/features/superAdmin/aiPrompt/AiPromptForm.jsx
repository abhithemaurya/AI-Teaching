"use client";
import React, { useEffect, useState } from "react";
import { useAiStore } from "./stores/aiStore";
export default function AiPromptForm({
  title,
  description,
  placeholder,
}) {
  const {
    prompts = [],
    getPrompts,
    savePrompt,
    loading,
  } = useAiStore();
  const [prompt, setPrompt] = useState("");
  useEffect(() => {
    getPrompts();
  }, []);
  useEffect(() => {
    const existingPrompt =
      prompts?.find(
        (item) => item.type === title
      );
    if (existingPrompt) {
      setPrompt(existingPrompt.prompt);
    }
  }, [prompts, title]);
  const handleSave = async () => {
    await savePrompt({
      title,
      type: title,
      prompt,
      description,
    });
  };

  // RESET
  const handleReset = () => {
    setPrompt("");
  };
  return (
    <div className="h-full">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-full flex flex-col">
        <div className="border-b border-slate-100 px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {title}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-gray-100 text-green-700 text-xs font-semibold">
              Active
            </span>
          </div>
        </div>
        <div className="p-6">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Prompt Content
          </label>
          <textarea
            rows={8}
            value={prompt}
            onChange={(e) =>
              setPrompt(e.target.value)
            }
            placeholder={placeholder}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
          <div className="flex items-center justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition-all"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-sm disabled:opacity-50"
            >
              {
                loading
                  ? "Saving..."
                  : "Save Prompt"
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}