"use client";
import {
  BookOpen,
  Calendar,
  Download,
  Eye,
  Trash2,
  FileText,
  BarChart2,
  Hash,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useQuestionLibraryStore } from "./stores/questionLibraryStore";
import QuestionPreviewModal from "./QuestionPreviewModal";
import { downloadQuestionPDF } from "@/utils/downloadQuestionPDF";
import DeleteConfirmModal from "@/features/common/DeleteConfirmModal";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

const difficultyConfig = {
  Beginner: {
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    bar: "bg-emerald-400",
    width: "w-1/3",
  },
  Intermediate: {
    color: "text-amber-600",
    bg: "bg-amber-50",
    bar: "bg-amber-400",
    width: "w-2/3",
  },
  Advanced: {
    color: "text-rose-600",
    bg: "bg-rose-50",
    bar: "bg-rose-400",
    width: "w-full",
  },
};

export default function QuestionLibrary() {
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [deletePaperId, setDeletePaperId] = useState(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const {
    papers,
    loading,
    getTeacherLibraries,
    deletePaper,
    incrementDownloadCount,
    toggleDownloadStatus,
  } = useQuestionLibraryStore();

  useEffect(() => {
    getTeacherLibraries();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-gray-500 text-sm font-medium">
            Loading library...
          </p>
        </div>
      </div>
    );
  }

  const filteredPapers = papers.filter((paper) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      paper.topic?.toLowerCase().includes(query) ||
      paper.questionType?.toLowerCase().includes(query) ||
      paper.difficulty.toLowerCase().includes(query);
    const matchesFilter =
      activeFilter === "All" || paper.difficulty === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleDownloadPaper = async (paper, showAnswers = false) => {
    if (!paper.downloadEnabled) {
      toast.error("Download is disabled");
      return;
    }
    if (!paper?.questions?.length) {
      toast.error("No questions available");
      return;
    }
    const formattedTitle = paper?.topic
      ?.split(" ")
      ?.slice(0, 5)
      ?.join(" ")
      ?.replace(/\b\w/g, (char) => char.toUpperCase());
    downloadQuestionPDF({
      questions: paper.questions,
      title: `${formattedTitle || "Question"} - ${paper?.difficulty || "Beginner"}`,
      showAnswers,
    });
    await incrementDownloadCount(paper.id);
    setShowDownloadModal(false);
  };

  const diff = (paper) =>
    difficultyConfig[paper.difficulty] || difficultyConfig["Beginner"];

  return (
    <section className="flex-grow min-h-screen bg-gray-50/60 px-1 py-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Question Library
          </h1>
          <p className="text-gray-400 text-sm mt-0.5">
            Manage all generated question papers
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-blue-100 shadow-sm text-blue-600 px-4 py-2 rounded-xl text-sm font-semibold">
          <FileText size={15} />
          {papers.length} Papers
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search papers…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
            <button
              key={level}
              onClick={() => setActiveFilter(level)}
              className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all ${
                activeFilter === level
                  ? level === "All"
                    ? "bg-blue-600 text-white border-blue-600"
                    : level === "Beginner"
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : level === "Intermediate"
                        ? "bg-amber-500 text-white border-amber-500"
                        : "bg-rose-500 text-white border-rose-500"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {!filteredPapers.length ? (
        <div className="flex flex-col items-center justify-center bg-white border border-dashed border-gray-200 rounded-2xl py-20 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
            <BookOpen size={28} className="text-blue-400" />
          </div>
          <h3 className="text-gray-700 font-semibold text-lg">
            No question papers yet
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            Generated papers will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredPapers.map((paper) => {
            const d = diff(paper);
            return (
              <div
                key={paper.id}
                className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col"
              >
                <div className={`h-1 w-full ${d.bar}`} />
                <div className="p-5 flex flex-col flex-1 gap-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <BookOpen size={17} className="text-blue-500" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-gray-900 text-base leading-snug line-clamp-2">
                          {paper.topic}
                        </h2>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {paper.questionType?.map((type) => (
                            <span
                              key={type}
                              className="text-xs text-gray-400 mt-0.5 block"
                            >
                              {type}
                            </span>
                          ))}
                        </div>

                        {/* <span className="text-xs text-gray-400 mt-0.5 block">
                          {paper.questionType}
                        </span> */}
                      </div>
                    </div>
                  </div>
                  {/* Stats Row */}
                  <div className="flex items-center gap-2">
                    {/* Difficulty Badge */}
                    <span
                      className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg ${d.bg} ${d.color}`}
                    >
                      <BarChart2 size={12} />
                      {paper.difficulty}
                    </span>

                    <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600">
                      <Hash size={12} />
                      {paper.totalQuestions} Qs
                    </span>

                    <span className="ml-auto flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={11} />
                      {new Date(paper.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="border-t border-gray-100" />

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">
                      Status
                    </span>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={paper.downloadEnabled}
                        onCheckedChange={(value) =>
                          toggleDownloadStatus(paper.id, value)
                        }
                      />
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          paper.downloadEnabled
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-500"
                        }`}
                      >
                        {paper.downloadEnabled ? "Active" : "Draft"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-auto pt-1">
                    <button
                      onClick={() => setSelectedPaper(paper)}
                      className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 py-2 rounded-xl transition-colors"
                    >
                      <Eye size={15} />
                      Preview
                    </button>
                    <button
                      disabled={!paper.downloadEnabled}
                      onClick={() => {
                        setSelectedPaper(paper);
                        setShowDownloadModal(true);
                      }}
                      className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium py-2 rounded-xl transition-colors relative ${
                        paper.downloadEnabled
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <Download size={15} />
                      Download
                      {paper.downloadCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-blue-800 text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-bold shadow">
                          {paper.downloadCount}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => setDeletePaperId(paper.id)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 border border-gray-200 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <QuestionPreviewModal
        selectedPaper={selectedPaper}
        setSelectedPaper={setSelectedPaper}
      />
      <DeleteConfirmModal
        open={deletePaperId}
        onClose={() => setDeletePaperId(null)}
        onConfirm={async () => {
          await deletePaper(deletePaperId);
          setDeletePaperId(null);
        }}
        title="Delete Question"
        description="Are you sure want to delete this paper? This action cannot be undone."
      />
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
              <Download size={22} className="text-blue-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Download PDF
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Choose how you'd like to export this paper.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleDownloadPaper(selectedPaper, false)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-medium transition-colors"
              >
                <FileText size={16} />
                Without Answers
              </button>
              <button
                onClick={() => handleDownloadPaper(selectedPaper, true)}
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600 font-medium transition-colors"
              >
                <BookOpen size={16} />
                With Answers
              </button>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="w-full py-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-500 font-medium transition-colors"
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
