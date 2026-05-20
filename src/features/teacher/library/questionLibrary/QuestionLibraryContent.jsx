"use client";

import {
  BookOpen,
  Calendar,
  Download,
  Eye,
  Trash2,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useQuestionLibraryStore } from "./stores/questionLibraryStore";
import QuestionPreviewModal from "./QuestionPreviewModal";
import { downloadQuestionPDF } from "@/utils/downloadQuestionPDF";
import DeleteConfirmModal from "@/features/common/DeleteConfirmModal";



export default function QuestionLibrary() {
    const [selectedPaper, setSelectedPaper]= useState(null)
    const [deletePaperId, setDeletePaperId]= useState(null)

  const {
    papers,
    loading,
    getTeacherLibraries,
    deletePaper,
  } = useQuestionLibraryStore();

  useEffect(() => {
    getTeacherLibraries();
  }, []);

  if (loading) {

    return (

      <div className="p-6">

        Loading library...

      </div>
    );
  }

  const handleDownloadPaper=(paper)=>{
    const formattedTitle= 
    paper?.topic
    ?.split(" ")
    ?.slice(0,5)
    ?.join(" ")
    ?.replace(/\b\w/g,
        char =>char.toUpperCase()
    )
    downloadQuestionPDF({
        questions: paper.questions,
     title:
        `${formattedTitle || "Question"} - ${paper?.difficulty || "Easy"}`,
    })
}

  return (

    <section className="p-6">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h1 className="text-2xl font-bold">
            Question Library
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Manage all generated question papers
          </p>

        </div>

        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">

          {papers.length} Papers

        </div>

      </div>

      {
        !papers.length ? (

          <div className="bg-white border rounded-xl p-12 text-center text-gray-500">

            No question papers found

          </div>

        ) : (

          <div className="grid gap-4">

            {
              papers.map((paper) => (

                <div
                  key={paper.id}
                  className="bg-white border rounded-xl p-5 hover:shadow-md transition"
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <div className="flex items-center gap-2 mb-2">

                        <BookOpen
                          size={18}
                          className="text-blue-600"
                        />

                        <h2 className="font-semibold text-lg">

                          {paper.topic}

                        </h2>

                      </div>

                      <div className="flex flex-wrap gap-2 text-sm">

                        <span className="bg-gray-100 px-3 py-1 rounded-full">

                          {paper.questionType}

                        </span>

                        <span className="bg-gray-100 px-3 py-1 rounded-full">

                          {paper.difficulty}

                        </span>

                        <span className="bg-gray-100 px-3 py-1 rounded-full">

                          {paper.totalQuestions} Questions

                        </span>

                      </div>

                      <div className="flex items-center gap-2 text-gray-500 text-sm mt-3">

                        <Calendar size={14} />

                        {
                          new Date(
                            paper.createdAt
                          ).toLocaleDateString()
                        }

                      </div>

                    </div>

                    <div className="flex gap-2">

                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        onClick={()=>setSelectedPaper(paper)}
                      >

                        <Eye size={18} />

                      </button>

                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        onClick={()=>handleDownloadPaper(
                            paper
                        )}
                      >

                        <Download size={18} />

                      </button>

                      <button
                        onClick={() =>
                            
                          setDeletePaperId(
                            paper.id
                          )
                        }
                        className="p-2 hover:bg-red-100 text-red-600 rounded-lg"
                      >

                        <Trash2 size={18} />

                      </button>

                    </div>

                  </div>

                </div>
              ))
            }

          </div>
        )
      }
     <QuestionPreviewModal  
      selectedPaper={selectedPaper}
      setSelectedPaper={setSelectedPaper}
     />

     <DeleteConfirmModal 
     open={deletePaperId}
     onClose={()=>setDeletePaperId(null)}
     onConfirm={async()=>{
        await deletePaper(
            deletePaperId
        );
        setDeletePaperId(null)
     }}
     title="Delete Question"
     description="Are you sure want to delete this paper?
     This action cannot be undone.
     "
     />
    </section>
  );
}

