import jsPDF from "jspdf";

export const downloadQuestionPDF =
  ({
    questions = [],
    title = "Question Paper",
    fileName,
  }) => {

    if (!questions.length) {
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.setFont(
      undefined,
      "bold"
    );

    const titleY = 15;

    doc.text(
      title,
      105,
      titleY,
      {
        align: "center",
      }
    );

    const lineY =
      titleY + 5;

    doc.setLineWidth(0.5);

    doc.line(
      10,
      lineY,
      200,
      lineY
    );

    let y = lineY + 10;

    questions.forEach(
      (q, index) => {

        if (y > 270) {

          doc.addPage();

          y = 25;
        }

        doc.setFontSize(12);

        doc.setFont(
          undefined,
          "bold"
        );

        const questionText =
          `Q${index + 1}. ${q.question}`;

        const splitQuestion =
          doc.splitTextToSize(
            questionText,
            180
          );

        doc.text(
          splitQuestion,
          10,
          y
        );

        y +=
          splitQuestion.length *
          6;

        doc.setFont(
          undefined,
          "normal"
        );

        q.options.forEach(
          (opt, i) => {

            const label =
              String.fromCharCode(
                65 + i
              );

            const optionText =
              `${label} )  ${opt}`;

            const splitOption =
              doc.splitTextToSize(
                optionText,
                170
              );

            doc.text(
              splitOption,
              15,
              y
            );

            y +=
              splitOption.length *
              5;
          }
        );

        y += 8;
      }
    );
    const safeTitle =
      title
        ?.replace(/[<>:"/\\|?*]+/g, "")
        ?.replace(/\s+/g, "-")
        ?.toLowerCase()
        ?.slice(0, 40);

    const finalFileName =
      fileName ||
      `${safeTitle || "question-paper"}.pdf`;

    doc.save(finalFileName);
  
  };



