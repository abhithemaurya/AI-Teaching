"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useConfigurationStore } from "./stores/configuration.Store";


const MODEL_OPTIONS = {
  openai: [
    "gpt-4o",
    "gpt-4",
    "gpt-3.5-turbo",
  ],

  anthropic: [
    "claude-3-opus",
    "claude-3-sonnet",
  ],

  google: [
    "gemini-2.0-flash",
    "gemini-1.5-pro",
  ],

  grok: [
    "grok-2-latest",
    "grok-beta",
    "grok-4.20-reasoning",
  ],
};

export default function ConfigurationForm() {
  const [showKey, setShowKey] = useState(false)
  const [form, setForm] = useState({
    provider: "openai",
    model: "",
    apiKey: "",
  });

  const {
    configuration,
    saveConfiguration,
    getConfiguration,
    loading
  } = useConfigurationStore()

  useEffect(() => {
    getConfiguration()
  }, [])

  useEffect(() => {
    if (configuration) {
      setForm({
        provider: configuration.provider ||
          "openai",
        model: configuration.model || "",

        apiKey: configuration.apiKey || "",
      })
    }
  }, [configuration])

  const inputClass =
    "w-full h-11 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "provider") {
      setForm({
        ...form,
        provider: value,
        model: ""
      });
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await saveConfiguration(form)
    
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
            <option value="grok">Grok (xAI)</option>
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
              className="absolute right-3 top-1/2 -translate-y-1/2 "
            >
              {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {
            loading ? "Saving" : "Save Configuration"
          }
         
        </button>
      </form>

    </div>
  );
}