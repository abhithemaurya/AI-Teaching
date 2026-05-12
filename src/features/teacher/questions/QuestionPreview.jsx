import { button, p, section } from "framer-motion/client";
import jsPDF from "jspdf";
import { Download, Pencil, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function QuestionPreview() {
    const [tempQuestion, setTempQuestion] = useState(null);
    const [questions, setQuestions] = useState([
        {
            id: 1,
            question: "Which process convert light into chemical energy?",
            options: [
                "Glycolysis",
                "Photophosphorylation",
                "Respiration",
                "Fermentation"
            ], correct: 1
        },
        {
            id: 2,
            question: "Which process convert light into chemical energy?",
            options: [
                "Glycolysis",
                "Photophosphorylation",
                "Respiration",
                "Fermentation"
            ], correct: 1
        },
        {
            id: 3,
            question: "Which process convert light into chemical energy?",
            options: [
                "Glycolysis",
                "Photophosphorylation",
                "Respiration",
                "Fermentation"
            ], correct: 1
        },
        {
            id: 4,
            question: "Which process convert light into chemical energy?",
            options: [
                "Glycolysis",
                "Photophosphorylation",
                "Respiration",
                "Fermentation"
            ], correct: 1
        },
        {
            id: 5,
            question: "Which process convert light into chemical energy?",
            options: [
                "Glycolysis",
                "Photophosphorylation",
                "Respiration",
                "Fermentation"
            ], correct: 1
        },


    ])
    const [editId, setEditId] = useState(null);
    const handleQuestionChange = (value) => {
        setTempQuestion(prev => ({
            ...prev,
            question: value
        }));
    };
    const handleOptionChange = (index, value) => {
        setTempQuestion(prev => {
            const updated = [...prev.options];
            updated[index] = value;
            return { ...prev, options: updated };
        });
    };

    const handleSaveToLibrary = () => {
        localStorage.setItem("questions", JSON.stringify(questions));
        toast.success("Saved to library!")
    }

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.setFont(undefined, "bold");

        const titleY = 15;
        doc.text("My Exam Paper", 105, titleY, { align: "center" });

        const lineY = titleY + 5;
        doc.setLineWidth(0.5);
        doc.line(10, lineY, 200, lineY);

        let y = lineY + 10;

        questions.forEach((q, index) => {

            if (y > 270) {
                doc.addPage();
                y = 25; // reset nicely
            }

            doc.setFontSize(12);
            doc.setFont(undefined, "bold");

            const questionText = `Q${index + 1}. ${q.question}`;
            const splitQuestion = doc.splitTextToSize(questionText, 180);

            doc.text(splitQuestion, 10, y);
            y += splitQuestion.length * 6;
            doc.setFont(undefined, "normal");
            q.options.forEach((opt, i) => {
                const label = String.fromCharCode(65 + i);

                const optionText = `${label}) ${opt}`;
                const splitOption = doc.splitTextToSize(optionText, 170);
                doc.text(splitOption, 15, y);
                y += splitOption.length * 5;
            });

            y += 8;
        });

        doc.save("questions.pdf");
    };
    return (
        <section className="lg:col-span-7 flex flex-col min-h-[600px]">
            <div className="flex justify-between mb-6 ">
                <h2 className="font-bold text-lg">
                    Preview
                </h2>
                <div className="flex gap-2 text-xs">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                        10 Items
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                        Ready
                    </span>
                </div>
            </div>
            <div className="flex-grow bg-white border-white rounded-xl flex flex-col">
                <div className="p-6 space-y-8 overflow-y-auto max-h-[500px]">
                    {questions.map((q, index) => (
                        <div key={q.id} className="group">
                            <div className="flex justify-between text-xs text-blue-600 font-mono">
                                <span>Question {String(index + 1).padStart(2, "0")}</span>
                                <Pencil size={14} className="opacity-0 group-hover:opacity-100"
                                    onClick={() => {
                                        setEditId(q.id);

                                        setTempQuestion({ ...q })
                                    }}
                                />
                            </div>
                            {
                                editId === q.id ? (
                                    <input
                                        value={tempQuestion?.question || ""}
                                      onChange={(e) => handleQuestionChange(e.target.value)}
                                        className="border p-2 w-full mt-2 rounded"
                                    />
                                ) : (
                                    <p className="font-semibold mt-2">
                                        {q.question}
                                    </p>
                                )
                            }

                            <div className="grid md:grid-cols-2 gap-2 mt-3">
                                {
                                    q.options.map((opt, i) => (
                                        <div
                                            key={i}
                                            className={`p-2 rounded ${i === q.correct
                                                ? "bg-blue-100 font-medium"
                                                : "bg-gray-100"
                                                }`}>
                                            {
                                                editId === q.id ? (
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
                                                )
                                            }


                                        </div>
                                    ))
                                }
                            </div>
                            {
                                editId === q.id && (
                                    <div className="mt-3 flex gap-2">
                                        <button
                                            onClick={() => {
                                                setQuestions(prev =>
                                                    prev.map(q =>
                                                        q.id === editId ? tempQuestion : q
                                                    )
                                                );
                                                setEditId(null);
                                                setTempQuestion(null);
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
                                )
                            }
                        </div>
                    ))}

                </div>
                <div className="p-6 border-t flex justify-end gap-3">
                    <button
                        onClick={handleSaveToLibrary}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded">
                        <Save size={16} />
                        Save to Library
                    </button>
                    <button
                        onClick={handleDownloadPDF}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded">
                        <Download />
                        Download(PDF)
                    </button>
                </div>
            </div>
        </section>
    );
}