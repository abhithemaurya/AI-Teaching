"use client";

import React, { useState } from "react";
import WorksheetForm from "./WorksheetForm";
import WorksheetPreview from "./WorksheetPreview";
import WorksheetFooter from "./WorksheetFooter";
import { FileDown, FileText } from "lucide-react";
import jsPDF from "jspdf";

const WorksheetsContent = () => {
       const [questions, setQuestions] = useState([
    {
      id: "02",
      type: "mcq",
      question: "Which molecule is a byproduct of light-dependent reactions?",
      options: [
        { text: "A) Glucose" },
        { text: "B) Oxygen", correct: true },
        { text: "C) CO2" },
        { text: "D) Water" },
      ],
    },
    {
      id: "03",
      type: "image",
      question: "Explain electron flow in Photosystem II.",
    },
  ]);

   
   const handleDownloadPDF = () => {
     const doc = new jsPDF();

     doc.setFontSize(16);
     doc.setFont(undefined, "bold");
     doc.text("Worksheet", 105, 12, { align: "center" });
   
     let y = 20;
   
     questions.forEach((q, index) => {
   
      
       if (y > 270) {
         doc.addPage();
         y = 20;
       }
       doc.setFontSize(12);
       doc.setFont(undefined, "bold");
   
       const questionText = `Q${index + 1}. ${q.question}`;
       const splitQ = doc.splitTextToSize(questionText, 180);
   
       doc.text(splitQ, 10, y);
       y += splitQ.length * 6;
   
       if (q.type === "mcq" && q.options) {
         doc.setFont(undefined, "normal");
   
         q.options.forEach((opt) => {
           const splitOpt = doc.splitTextToSize(opt.text, 170);
   
           doc.text(splitOpt, 15, y);
           y += splitOpt.length * 5;
         });
       }
   
       y += 8;
     });
   
     doc.save("questions.pdf");
   };
  return (
    <main  className="flex-grow ">
      
      <div className="mb-10">
        <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">
          Content Creation
        </span>

        <h1 className="text-3xl font-bold text-gray-800 mt-1">
          Worksheet Generator
        </h1>

        <p className="text-sm text-gray-500 max-w-xl mt-1">
          Generate structured worksheet with AI-powered logic and clean layout.
        </p>
      </div>
      <WorksheetForm />  
      <div className="mt-12">
       <WorksheetPreview questions={questions} />
      </div>

       <footer className=" flex flex-col md:flex-row items-center justify-between gap-8 border-t border-gray-200 mt-12">

      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">
            File Readiness
          </span>
          <span className="text-gray-800 font-semibold">
            1,240 Words • 3 Pages • 12 Questions
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto">
        
        {/* <button className="flex-1 md:flex-none border border-gray-300 text-gray-800 font-bold py-3 px-8 rounded flex items-center justify-center gap-2 hover:bg-gray-100 transition">
          <FileText size={18} />
          Word (.docx)
        </button> */}

        <button
         onClick={handleDownloadPDF}
        className="flex-1 md:flex-none bg-blue-600 text-white font-bold py-3 px-10 rounded flex items-center justify-center gap-2 shadow-lg hover:bg-blue-700 active:scale-95 transition">
          <FileDown size={18} />
          Export PDF
        </button>

      </div>
    </footer>
    </main>
  );
};

export default WorksheetsContent;