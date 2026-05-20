"use client";

export default function QuestionPreviewModal({
  selectedPaper,
  setSelectedPaper,
}) {

  if (!selectedPaper) {
    return null;
  }

  return (

    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-4xl rounded-2xl max-h-[90vh] overflow-hidden">

        <div className="flex items-center justify-between p-5 border-b">

          <div>

            <h2 className="text-xl font-bold">

              {selectedPaper.topic}

            </h2>

            <p className="text-sm text-gray-500 mt-1">

              {selectedPaper.questionType}
              {" • "}
              {selectedPaper.difficulty}

            </p>

          </div>

          <button
            onClick={() =>
              setSelectedPaper(null)
            }
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>

        </div>

        <div className="p-6 overflow-y-auto max-h-[75vh] space-y-8">

          {
            selectedPaper.questions.map(
              (q, index) => (

                <div
                  key={index}
                  className="border rounded-xl p-5"
                >

                  <h3 className="font-semibold mb-4">

                    Q{index + 1}. {q.question}

                  </h3>

                  <div className="grid md:grid-cols-2 gap-3">

                    {
                      q.options.map(
                        (opt, i) => (

                          <div
                            key={i}
                            className={`p-3 rounded-lg ${
                              i === q.correct
                                ? "bg-blue-100 border border-blue-300"
                                : "bg-gray-100"
                            }`}
                          >

                            <span className="font-medium">

                              {
                                String.fromCharCode(
                                  65 + i
                                )
                              }
                              

                            </span>

                            {" "}
                            {opt}

                          </div>
                        )
                      )
                    }

                  </div>

                </div>
              )
            )
          }

        </div>

      </div>

    </div>
  );
}