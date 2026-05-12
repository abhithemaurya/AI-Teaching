"use client";

import { RefreshCcw, Edit, Image as ImageIcon, Wand2 } from "lucide-react";

export default function WorksheetPreview({ questions }) {
    const answers = [
        {
            id: "01",
            title: "Stomata:",
            text: "Gas exchange pores allowing CO2 intake and O2 release.",
        },
        {
            id: "02",
            title: "Answer:",
            text: "Oxygen (O2) is released during photolysis.",
        },
        {
            id: "03",
            title: "Explanation:",
            text: "Electron flow involves photon absorption → excitation → transport chain.",
        },
    ];
    return (
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 items-start mt-2">
            <section className="space-y-6">
                <div className="flex justify-between items-end border-b pb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                        Generated Questions
                    </h2>
                    <span className="text-blue-600 text-xs font-bold bg-blue-100 px-2 py-1 rounded">
                        Draft 01
                    </span>
                </div>
                <div className="space-y-6">
     
                    <div className="bg-white p-5 rounded-lg border relative group min-h-[160px] flex flex-col justify-between">
                        <div className="flex items-start gap-3 mb-3">
                            <span className="mt-1 w-6  bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center rounded">
                                01
                            </span>
                            <h3 className="font-semibold text-gray-800 leading-snug">
                                Define the primary function of the stomata during photosynthesis.
                            </h3>
                        </div>
                        <div className="h-12 border-b border-dashed mt-3" />

                        <div className="flex gap-4 mt-3 opacity-0 group-hover:opacity-100 text-xs">
                            <button className="text-blue-600 flex items-center gap-1">
                                <RefreshCcw size={14} /> Regenerate
                            </button>
                            <button className="text-gray-500 flex items-center gap-1 hover:text-blue-600">
                                <Edit size={14} /> Edit
                            </button>
                        </div>
                    </div>
                    {questions.map((q, index) => (
                        <div key={q.id} className="bg-white p-5 rounded-lg border min-h-[160px]">
                            <span>
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <div className="flex items-start gap-3 mb-3">
                                <span className="mt-1 w-6 h-6 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center rounded">
                                    {q.id}

                                </span>

                                <h3 className="font-semibold text-gray-800 leading-snug">
                                    {q.question}
                                </h3>
                            </div>
                            {q.type === "mcq" && (
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    {q.options.map((opt, i) => (
                                        <div
                                            key={i}
                                            className={`p-2 rounded ${opt.correct
                                                ? "bg-blue-100 text-blue-600 font-medium"
                                                : "bg-gray-100"
                                                }`}
                                        >
                                            {opt.text}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {q.type === "image" && (
                                <div className="w-full aspect-video bg-gray-100 rounded flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 opacity-10">
                                        <svg height="100%" width="100%">
                                            <line
                                                stroke="currentColor"
                                                strokeWidth="1"
                                                x1="0"
                                                x2="100%"
                                                y1="100%"
                                                y2="0"
                                            />
                                        </svg>
                                    </div>
                                    <ImageIcon className="text-gray-400" size={36} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
            <section className="space-y-6">

                <div className="flex justify-between items-end border-b pb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                        Answer Key
                    </h2>
                    <span className="text-xs text-gray-500 font-bold uppercase">
                        Confidential
                    </span>
                </div>

                <div className="space-y-6">
                    {
                        answers.map((ans) => (
                            <div key={ans.id} className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600 min-h-[160px]">
                                <div className="flex gap-3">
                                    <span className="font-bold text-blue-600">{ans.id}</span>
                                    <p className="text-sm text-gray-700">
                                        <strong>{ans.title}</strong>{ans.text}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="p-6 bg-white rounded-lg border text-center">
                    <Wand2 className="mx-auto text-blue-600 mb-2" size={28} />
                    <h4 className="font-semibold text-gray-800">
                        AI Insight
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                        Follows Bloom’s taxonomy from recall → application.
                    </p>
                </div>

            </section>
        </div>
    );
}