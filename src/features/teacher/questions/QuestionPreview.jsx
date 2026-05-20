import { Download, Pencil, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useQuestionStore } from "./stores/questionStore";
import { downloadQuestionPDF } from "@/utils/downloadQuestionPDF";

export default function QuestionPreview() {
  const {
    questions = [],
    generatedPaperId,
    paperMeta,
    updateQuestion,
    syncQuestionsToDatabase,
  } = useQuestionStore();

  const [tempQuestion, setTempQuestion] = useState(null);
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
    const success = await syncQuestionsToDatabase();
    if (success) {
      toast.success("Saved to library!");
    }
  };
  const handleDownloadPDF = async () => {
    if (!questions.length) {
      toast.error("No questions available");
      return;
    }
    const success = await syncQuestionsToDatabase();
    if (!success) {
      return;
    }
    const formattedTitle = paperMeta?.topic?.split(" ")?.slice(0, 5)?.join(" ");
    downloadQuestionPDF({
      questions,
      title: `${formattedTitle || "Question"}-${paperMeta?.difficulty || "EASY"}`,
    });
  };
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
              {questions.map((q, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between text-xs text-blue-600 font-mono">
                    <span>Question {String(index + 1).padStart(2, "0")}</span>

                    <Pencil
                      size={14}
                      className="opacity-0 group-hover:opacity-100 cursor-pointer"
                      onClick={() => {
                        setEditId(index);

                        setTempQuestion({
                          ...q,
                        });
                      }}
                    />
                  </div>
                  {editId === index ? (
                    <input
                      value={tempQuestion?.question || ""}
                      onChange={(e) => handleQuestionChange(e.target.value)}
                      className="border p-2 w-full mt-2 rounded"
                    />
                  ) : (
                    <p className="font-semibold mt-2">{q.question}</p>
                  )}
                  <div className="grid md:grid-cols-2 gap-2 mt-3">
                    {q.options.map((opt, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded ${
                          i === q.correct
                            ? "bg-blue-100 font-medium"
                            : "bg-gray-100"
                        }`}
                      >
                        {editId === index ? (
                          <input
                            value={tempQuestion?.options[i] || ""}
                            onChange={(e) =>
                              handleOptionChange(i, e.target.value)
                            }
                            className="w-full border p-1 rounded"
                          />
                        ) : (
                          <>
                            {String.fromCharCode(65 + i)}) {opt}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  {editId === index && (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => {
                          updateQuestion(index, tempQuestion);
                          setTimeout(async () => {
                            await syncQuestionsToDatabase();
                          }, 0);
                          setEditId(null);
                          setTempQuestion(null);
                          toast.success("Question updated");
                        }}
                        className="text-sm bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
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
            <div className="p-6 border-t flex justify-end gap-3">
              <button
                onClick={handleSaveToLibrary}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded"
              >
                <Save size={16} />
                Save to Library
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded"
              >
                <Download size={16} />
                Download (PDF)
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
