import { Download, Pencil, Save, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useQuestionStore } from "./stores/questionStore";
import { downloadQuestionPDF } from "@/utils/downloadQuestionPDF";

export default function QuestionPreview() {
  const {
    questions = [],
    paperMeta,
    updateQuestion,
    removeQuestion,
    saveQuestionsToDatabase,
  } = useQuestionStore();

  const [tempQuestion, setTempQuestion] = useState(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const handleQuestionChange = (value) => {
    setTempQuestion((prev) => ({
      ...prev,
      question: value,
    }));
  };
  const handleOptionChange = (index, value) => {
    setTempQuestion((prev) => {
      const updated = [...prev.options];
      updated[index] = value;
      return { ...prev, options: updated };
    });
  };
  const handleSaveToLibrary = async () => {
    const success = await saveQuestionsToDatabase();

    if (success) {
      toast.success("Saved to library!");
    }
  };
  const handleDownloadPDF = async (showAnswers = false) => {
    if (!questions.length) {
      toast.error("No questions available");
      return;
    }
    const success = await saveQuestionsToDatabase("DOWNLOADED");
    if (!success) {
      return;
    }
    const formattedTitle = paperMeta?.topic?.split(" ")?.slice(0, 5)?.join(" ");
    downloadQuestionPDF({
      questions,
      title: `${formattedTitle || "Question"}-${paperMeta?.difficulty || "EASY"}`,
      showAnswers,
    });
    setShowDownloadModal(false);
  };
  const groupedQuestions = questions.reduce((acc, question) => {
  const section = question.section || "Other";

  if (!acc[section]) {
    acc[section] = [];
  }

  acc[section].push(question);

  return acc;
}, {});
  return (
    <section className="lg:col-span-7 flex flex-col min-h-[600px]">
      <div className="flex justify-between mb-6">
        <h2 className="font-bold text-lg">Preview</h2>
        <div className="flex gap-2 text-xs">
          <span className="bg-gray-100 px-3 py-1 rounded-full">
            {questions.length} Items
          </span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">Ready</span>
        </div>
      </div>
      <div className="flex-grow bg-white border rounded-xl flex flex-col">
        {!questions.length ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            No questions generated yet
          </div>
        ) : (
          <>
  <div className="p-6 space-y-8 overflow-y-auto max-h-[500px]">

  {Object.entries(groupedQuestions).map(
    ([section, sectionQuestions]) => (
      <div key={section} className="space-y-6">

        <div className="top-0 bg-white z-10 py-2 border-b">
          <h2 className="text-lg font-bold text-blue-600">
            {section}
          </h2>
        </div>

        {sectionQuestions.map((q, index) => (
          <div key={index} className="group">

            <div className="flex justify-between items-center text-xs text-blue-600 font-mono">

              <span>
                Question {String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">

                <Pencil
                  size={14}
                  className="cursor-pointer"
                  onClick={() => {
                    setEditId(index);

                    setTempQuestion({
                      ...q,
                    });
                  }}
                />

              </div>
            </div>

            {editId === index ? (
              <input
                value={tempQuestion?.question || ""}
                onChange={(e) =>
                  handleQuestionChange(e.target.value)
                }
                className="border p-2 w-full mt-2 rounded"
              />
            ) : (
              <p className="font-semibold mt-2">
                {q.question}
              </p>
            )}

            {q.options?.length > 0 && (
              <div className="grid md:grid-cols-2 gap-2 mt-3">

                {q.options.map((opt, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded ${
                      Array.isArray(q.correct)
                        ? q.correct.includes(i)
                          ? "bg-green-100 border border-green-400"
                          : "bg-gray-50"
                        : q.correct === i
                          ? "bg-green-100 border border-green-400"
                          : "bg-gray-50"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}) {opt}
                  </div>
                ))}

              </div>
            )}

            {editId === index && (
              <div className="mt-3 flex gap-2">

                <button
                  onClick={() => {
                    setEditId(null);
                    setTempQuestion(null);
                  }}
                  className="text-sm bg-gray-300 px-3 py-1 rounded"
                >
                  Cancel
                </button>

              </div>
            )}

          </div>
        ))}

      </div>
    )
  )}

</div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button
                onClick={handleSaveToLibrary}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded"
              >
                <Save size={16} />
                Save to Library
              </button>
              <button
                onClick={() => setShowDownloadModal(true)}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded"
              >
                <Download size={16} />
                Download (PDF)
              </button>
            </div>
          </>
        )}
      </div>
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Download PDF</h2>

            <p className="text-gray-600 mb-6">
              Choose how you want to download the paper.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleDownloadPDF(false)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Download Without Answers
              </button>
              <button
                onClick={() => handleDownloadPDF(true)}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
              >
                Download With Answers
              </button>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="w-full bg-gray-100 py-3 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
