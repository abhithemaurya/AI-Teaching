"use client";

import { Eye, Loader2, Mail, Pencil, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useEmailStore } from "./stores/emailStore";

const EmailContent = () => {
  const {
    fetchTemplates,
    updateTemplate,
    templates,
    loading,
    editTemplate,
    setEditTemplate,
  } = useEmailStore();

  const [formData, setFormData] = useState({
    subject: "",
    html: "",
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    if (editTemplate) {
      setFormData({
        subject: editTemplate.subject || "",
        html: editTemplate.html || "",
      });
    }
  }, [editTemplate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (!editTemplate?.id) return;

    try {
      await updateTemplate(editTemplate.id, formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* LEFT SIDE */}
      <div className="bg-white rounded-2xl border shadow p-4">
        <div className="flex items-center gap-2 mb-5">
          <Mail className="w-5 h-5" />
          <h2 className="text-xl font-semibold">
            Email Templates
          </h2>
        </div>
        { loading && templates.length === 0 ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
         ) : (
          <div className="space-y-3">
            {templates?.map((template) => (
              <div
                key={template.id}
                className={`flex items-center justify-between border rounded-xl p-3 cursor-pointer transition ${
                  editTemplate?.id === template.id
                    ? "border-blue-500 bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() =>
                  setEditTemplate(template)
                }
              >
                <div>
                  <h3 className="font-semibold">
                    {template.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {template.key}
                  </p>
                </div>

                <Pencil className="w-4 h-4" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="lg:col-span-2 bg-white rounded-2xl border shadow p-6">
        {editTemplate ? (
          <>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  Edit Template
                </h2>

                <p className="text-gray-500">
                  {editTemplate.key}
                </p>
              </div>

              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2 rounded-xl"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}

                {loading ? "Saving..." : "Save"}
              </button>
            </div>

            <div className="mb-5">
              <label className="block mb-2 font-medium">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* HTML */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">
                HTML Content
              </label>

              <textarea
                name="html"
                rows={18}
                value={formData.html}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4" />

                <h3 className="font-semibold">
                  Live Preview
                </h3>
              </div>

              <div className="border rounded-xl p-5 bg-gray-50 overflow-auto">
                <div
                  dangerouslySetInnerHTML={{
                    __html: formData.html,
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a template to edit
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailContent;