"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const MODEL_OPTIONS = {
  openai: ["gpt-4o", "gpt-4", "gpt-3.5-turbo"],
  anthropic: ["claude-3-opus", "claude-3-sonnet"],
  google: ["gemini-pro", "gemini-1.5-pro"],
};

export default function ConfigurationForm() {
  const [showKey, setShowKey] = useState(false);

  const [form, setForm] = useState({
    provider: "openai",
    model: "",
    prompt: "",
    apiKey: "",
  });

  const inputClass =
    "w-full h-11 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "provider") {
      setForm({ ...form, provider: value, model: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="w-full     p-6 rounded-xl shadow-sm border">

      <h2 className="text-lg font-semibold mb-4">
        AI Configuration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div >
          <label className="text-sm text-gray-600">
            Model Provider
          </label>
          <select
            name="provider"
            value={form.provider}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
            <option value="google">Google</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">
            Model Version
          </label>
          <select
            name="model"
            value={form.model}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select model</option>
            {MODEL_OPTIONS[form.provider]?.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">
            Prompt
          </label>
          <textarea
            name="prompt"
            value={form.prompt}
            onChange={handleChange}
            placeholder="Enter system prompt..."
            className="w-full h-24 p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">
            API Key
          </label>

            <div className="relative">
        <input
          type={showKey ? "text" : "password"}
          name="apiKey"
          value={form.apiKey}
          onChange={handleChange}
          placeholder="sk--------------------------"
          className={inputClass}
        />

        <button
          type="button"
          onClick={() => setShowKey(!showKey)}
       className="absolute right-3 top-1/2 -translate-y-1/2 mt-[2px]"
        >
          {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save Configuration
        </button>
      </form>

    </div>
  );
}