"use client";
import {
  X,
  BookOpen,
  BarChart2,
  Hash,
  CheckCircle2,
  Circle,
} from "lucide-react";

const difficultyConfig = {
  Easy: {
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    dot: "bg-emerald-400",
  },
  Medium: { color: "text-amber-600", bg: "bg-amber-50", dot: "bg-amber-400" },
  Hard: { color: "text-rose-600", bg: "bg-rose-50", dot: "bg-rose-400" },
};
const OPTION_LABELS = ["A", "B", "C", "D", "E", "F"];

export default function QuestionPreviewModal({
  selectedPaper,
  setSelectedPaper,
}) {
  if (!selectedPaper) return null;
  const d =
    difficultyConfig[selectedPaper.difficulty] || difficultyConfig["Easy"];

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setSelectedPaper(null)}
    >
      <div
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <BookOpen size={18} className="text-blue-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-snug">
                {selectedPaper.topic}
              </h2>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">
                  {selectedPaper.questionType?.map((type) => (
                    <span
                      key={type}
                      className="text-[10px] px-2 py-1 rounded-full bg-blue-50 text-blue-600"
                    >
                      {type}
                    </span>
                  ))}

                  {/* {selectedPaper.questionType} */}
                </span>
                <span
                  className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg ${d.bg} ${d.color}`}
                >
                  <BarChart2 size={11} />
                  {selectedPaper.difficulty}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600">
                  <Hash size={11} />
                  {selectedPaper.questions?.length} Questions
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600">
                  {selectedPaper?.studentClass}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setSelectedPaper(null)}
            className="ml-4 w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors shrink-0"
          >
            <X size={17} />
          </button>
        </div>
        <div className="h-0.5 w-full bg-gray-100">
          <div
            className={`h-full ${d.dot} transition-all`}
            style={{ width: "100%" }}
          />
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
          {selectedPaper.questions?.map((q, index) => (
            <div
              key={index}
              className="border border-gray-100 rounded-2xl p-5 hover:shadow-sm transition-shadow bg-white"
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="shrink-0 w-7 h-7 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <p className="font-semibold text-gray-900 text-sm leading-relaxed pt-0.5">
                  {q.question}
                </p>
              </div>
              {q.options?.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-2 ml-10">
                  {q.options.map((opt, i) => {
                    const isCorrect = i === q.correct;
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm transition-colors ${
                          isCorrect
                            ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                            : "bg-gray-50 border border-gray-100 text-gray-700"
                        }`}
                      >
                        <span
                          className={`shrink-0 w-5 h-5 rounded-md text-[11px] font-bold flex items-center justify-center ${
                            isCorrect
                              ? "bg-emerald-500 text-white"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {OPTION_LABELS[i]}
                        </span>

                        <span className="flex-1 leading-snug">{opt}</span>

                        {/* Correct tick */}
                        {isCorrect && (
                          <CheckCircle2
                            size={14}
                            className="shrink-0 text-emerald-500"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {(!q.options || q.options.length === 0) && q.answer && (
                <div className="ml-10 mt-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                  <p className="text-xs font-semibold text-emerald-600 mb-1">
                    Answer
                  </p>
                  <p className="text-sm text-emerald-800">{q.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/60">
          <p className="text-xs text-gray-400">
            Showing all {selectedPaper.questions?.length} questions
          </p>
          <button
            onClick={() => setSelectedPaper(null)}
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
