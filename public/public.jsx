const handleDownloadPDF =
  async (
    showAnswers = false
  ) => {

    if (!questions.length) {

      toast.error(
        "No questions available"
      );

      return;
    }

    const success =
      await syncQuestionsToDatabase();

    if (!success) {
      return;
    }

    const formattedTitle =
      paperMeta?.topic
        ?.split(" ")
        ?.slice(0, 5)
        ?.join(" ");

    downloadQuestionPDF({

      questions,

      title:
        `${formattedTitle || "Question"} - ${paperMeta?.difficulty || "Easy"}`,

      showAnswers,
    });

    setShowDownloadModal(false);
  };