import { SlidersHorizontal, Sparkles } from "lucide-react";
import { useState } from "react";
  

const questionTypes = [
  "Multiple Choice",
  "Short Answer",
  "True/False",
  "Essay Prompt",
];
export default function QuestionForm() {
      const [selectedType, setSelectedType] = useState("Multiple Choice");
    return (
        <section className="lg:col-span-5 bg-white p-8 rounder-xl space-y-8 shadow-sm">
            <div className="flex items-center gap-3 text-blue-600">
                <SlidersHorizontal size={20} />
                <h2 className="font-bold text-lg">Configuration</h2>
            </div>
            <form className="space-y-6">
                <div>
                    <label htmlFor="" className="text-xs font-bold uppercase text-gray-500">
                        Topic
                    </label>
                    <input type="text" placeholder="e.g. Photosynthesis"
                        className="w-full border-b py-3 focus:outline-none focus:border-blue-600"
                    />

                </div>
                <div className="grid grid-cols-2 gap-6">
                    <input type="number"
                        defaultValue={10}
                        className="border-b py-3 focus:outline-none"
                    />
                    <select name="" id="" className="border-b py-3 focus:outline-none">
                        <option value="">
                            Begineer
                        </option>
                        <option value="">
                            Intermediate
                        </option>
                        <option value="">
                            Advanced
                        </option>
                    </select>

                </div>
                <div className="text-xs font-bold uppercase text-gray-500 mb-2">
                    <p>
                        Question Type
                    </p>
                <div className="flex flex-wrap gap-2 m-1">
                 {questionTypes.map((type)=>(
                    <button 
                    key={type}
                    type="button"
                    onClick={()=>setSelectctedType(type)}
                   className={`px-4 py-2 rounded-full text-sm transition ${
                        selectedType === type
                          ? "bg-blue-100 text-[#52616a]"
                          : "bg-gray-100 hover:bg-blue-100"
                      }` }
                    
                    >
                     {type}
                    </button>
                 ))}
                </div>
                </div>
              <button className="w-full bg-blue-600 text-white py-4  rounder-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-95">
               <Sparkles size={18} />
               Generate Questions 
              </button>
            </form>
            <p className="text-xs text-blue-600 pt-4 border-t">
              AI will prioritize Blooms Taxonimy in its generation logic.   
            </p>
        </section>
    );
}