"use client";

import jsPDF from "jspdf";
import { FileText, FileDown } from "lucide-react";

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 10;

    questions.forEach((q, index) => {
      doc.text(`Q${index + 1}. ${q.question}`, 10, y);
      y += 6;

      q.options.forEach((opt, i) => {
        const label = String.fromCharCode(65 + i);
        doc.text(`${label}) ${opt}`, 15, y);
        y += 5;
      });
      y += 5;
      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save("questions.pdf");
  };


export default function WorksheetFooter() {
  return (
    <footer className=" flex flex-col md:flex-row items-center justify-between gap-8 border-t border-gray-200 mt-12">
      
      {/* LEFT: Info */}
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

        <button className="flex-1 md:flex-none border border-gray-300 text-gray-800 font-bold py-3 px-8 rounded flex items-center justify-center gap-2 hover:bg-gray-100 transition">
          <FileText size={18} />
          Word (.docx)
        </button>

        <button
         onClick={handleDownloadPDF}
        className="flex-1 md:flex-none bg-blue-600 text-white font-bold py-3 px-10 rounded flex items-center justify-center gap-2 shadow-lg hover:bg-blue-700 active:scale-95 transition">
          <FileDown size={18} />
          Export PDF
        </button>

      </div>
    </footer>
  );
}