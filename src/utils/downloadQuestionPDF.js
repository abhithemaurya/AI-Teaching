import jsPDF from "jspdf";

export const downloadQuestionPDF = ({
  questions = [],
  title = "Question Paper",
  fileName,
  showAnswers = false,
}) => {
  if (!questions.length) {
    return;
  }

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.setFont(undefined, "bold");

  const titleY = 15;

  doc.text(title, 105, titleY, {
    align: "center",
  });

  const lineY = titleY + 5;

  doc.setLineWidth(0.5);

  doc.line(10, lineY, 200, lineY);

  let y = lineY + 10;

  // GROUP QUESTIONS BY SECTION
  const groupedQuestions = questions.reduce((acc, question) => {
    const section = question.section || "Other";

    if (!acc[section]) {
      acc[section] = [];
    }

    acc[section].push(question);

    return acc;
  }, {});

  // LOOP THROUGH SECTIONS
  Object.entries(groupedQuestions).forEach(
    ([sectionName, sectionQuestions]) => {
      
      // PAGE BREAK
      if (y > 250) {
        doc.addPage();
        y = 20;
      }

      // SECTION TITLE
      doc.setFontSize(15);
      doc.setFont(undefined, "bold");

      doc.text(sectionName, 10, y);

      y += 8;

      sectionQuestions.forEach((q, index) => {

        if (y > 270) {
          doc.addPage();
          y = 20;
        }

        // QUESTION
        doc.setFontSize(12);
        doc.setFont(undefined, "bold");

        const questionText = `Q${index + 1}. ${q.question}`;

        const splitQuestion = doc.splitTextToSize(
          questionText,
          180
        );

        doc.text(splitQuestion, 10, y);

        y += splitQuestion.length * 6;

        // OPTIONS
        if (q.options?.length > 0) {

          doc.setFont(undefined, "normal");

          q.options.forEach((opt, i) => {

            const label = String.fromCharCode(65 + i);

            const optionText = `${label}) ${opt}`;

            const splitOption = doc.splitTextToSize(
              optionText,
              170
            );

            doc.text(splitOption, 15, y);

            y += splitOption.length * 5;
          });
        }

        // ANSWERS
        if (showAnswers) {

          doc.setTextColor(0, 128, 0);
          doc.setFont(undefined, "bold");

          let answerText = "";

          // MULTIPLE RESPONSE
          if (Array.isArray(q.correct)) {

            answerText = q.correct
              .map((ans) => q.options?.[ans])
              .join(", ");

          } 
          
          // MCQ / TRUE FALSE
          else if (q.options?.length > 0) {

            answerText = q.options?.[q.correct];
          }

          // SUBJECTIVE
          else {

            answerText = "Subjective Answer";
          }

          doc.text(
            `Answer: ${answerText}`,
            15,
            y
          );

          doc.setTextColor(0, 0, 0);
          doc.setFont(undefined, "normal");

          y += 8;
        }

        y += 10;
      });

      y += 5;
    }
  );

  const safeTitle = title
    ?.replace(/[<>:"/\\|?*]+/g, "")
    ?.replace(/\s+/g, "-")
    ?.toLowerCase()
    ?.slice(0, 40);

  const finalFileName =
    fileName ||
    `${safeTitle || "question-paper"}.pdf`;

  doc.save(finalFileName);
};