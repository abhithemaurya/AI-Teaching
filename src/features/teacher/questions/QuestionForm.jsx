import { SlidersHorizontal, Sparkles } from "lucide-react";
import { useState } from "react";
import { useQuestionStore } from "./stores/questionStore";
import { toast } from "sonner";


const questionTypes = ["Multiple Choice", "True/False", "Subjective", "multiple-response"  ];
const classOptions = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];
export default function QuestionForm() {
  const { generateQuestions, loading } = useQuestionStore();
  const [formData, setFormData] = useState({
    topic: "",
    difficulty: "Beginner",
    questionType: [],
    totalQuestions:1,
    studentClass: "Class 1",
  });

  const handleGenerate = async (e) => {
    e.preventDefault();
      if(formData.questionType.length===0){
       return  toast.error("Please select at least one question type")
      }
      
    await generateQuestions({
      topic: formData.topic,
      difficulty: formData.difficulty,
      questionType: formData.questionType,
      totalQuestions: Number(formData.totalQuestions),
      studentClass: formData.studentClass,
    });
  };

  return (
    <section className="lg:col-span-5 bg-white p-8 rounded-xl space-y-8 shadow-sm">
      <div className="flex items-center gap-3 text-blue-600">
        <SlidersHorizontal size={20} />
        <h2 className="font-bold text-lg">Configuration</h2>
      </div>
      <form onSubmit={handleGenerate} className="space-y-6">
        <div>
          <label className="text-xs font-bold uppercase text-gray-500">
            Topic
          </label>
          <input
            type="text"
            placeholder="e.g. Photosynthesis"
            value={formData.topic}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, topic: e.target.value }))
            }
            className="w-full border-b py-3 focus:outline-none focus:border-blue-600"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold uppercase text-gray-500">
              Total Questions
            </label>
            <input
              type="number"
              min={1}
              max={50}
              value={formData.totalQuestions}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  totalQuestions: Number(e.target.value),
                }))
              }
              className="w-full border-b py-3 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-gray-500">
              Difficulty
            </label>
            <select
              value={formData.difficulty}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, difficulty: e.target.value }))
              }
              className="w-full border-b py-3 focus:outline-none"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
         <label htmlFor="" className="text-xs font-bold uppercase text-gray-500">Class</label>
         <select name="" id=""
         value={formData.studentClass}
         onChange={(e)=>setFormData((prev)=>({
          ...prev, 
          studentClass: e.target.value
         }))}
         className="w-full border-b py-3 focus:outline-none"
         >
         {classOptions.map((cls)=>(
          <option key={cls} value={cls}>
            {cls}
          </option>
         ))}
         </select>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase text-gray-500 mb-3">
            Question Type
          </p>
          <div className="flex flex-wrap gap-2">
            {questionTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                     ...prev,
                     questionType: prev.questionType.includes(type)
                     ? prev.questionType.filter((item)=>item !==type)
                     : [...prev.questionType, type]
                    }))
                }
                className={`px-4 py-2 rounded-full text-sm transition ${
                  formData.questionType.includes(type)
                    ? "bg-blue-100 text-[#52616a]"
                    : "bg-gray-100 hover:bg-blue-100"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading || !formData.topic.trim()}
          className="w-full bg-blue-600 text-white py-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 disabled:opacity-50"
        >
          <Sparkles size={18} />
          {loading ? "Generating..." : "Generate Questions"}
        </button>
      </form>
      <p className="text-xs text-blue-600 pt-4 border-t">
        AI will prioritize Blooms Taxonomy in its generation logic.
      </p>
    </section>
  );
}
