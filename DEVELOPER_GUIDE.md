

follow RSC 

Request → Route → Controller → Service → Repository → DB



  1. repository
  2. Services
  3. Controller 
  4. Route





i have this folder structure 

└───src
    ├───app
    │   │   favicon.ico
    │   │   globals.css
    │   │   layout.js
    │   │   page.js
    │   │
    │   ├───(auth)
    │   │   ├───login
    │   │   │       page.jsx
    │   │   │
    │   │   ├───services
    │   │   │       auth.service.js
    │   │   │
    │   │   └───signup
    │   │           page.jsx
    │   │
    │   └───api
    │       ───auth
    │          ├───controllers
    │          │       auth.controller.js
    │          │
    │          ├───repositories
    │          │       auth.repositories.js
    │          │
    |          ├───services
    │              auth.service.js
    │          └───route
    │                 route.js
    │      
    │
    ├───features
    │   └───auth
    │       ├───api
    │       ├───components
    │       │       LoginForm.jsx
    │       │       SignupForm.jsx
    │       │
    │       ├───hooks
    │       ├───stores
    │       └───styles
    


as you know aboute my project and yesterday you have complete Configuration part. and you have design my project so i hope i don't need to explain you to much but i am giving you a breafing to it will help you a lot 
so let's start
=> i am making a project for a question generater there super have a option for configuration there they can change api key model etc. thats you now 
now other task is super admin have also option for for add a prompt so according to this question generater will work so not i am giving you a my model so make sure it will help you for design a baceknd and also giving you a frontend so it will help you 


=> FrontEnd 
"use client"
import React, { useEffect, useState } from 'react'
import { useAiStore } from './stores/aiStore'

export default function AiPromptForm  ({

    title,
    description,
    placeholder,
}) 
{
   const {prompts, getPrompts, savePrompt,loading}= useAiStore()
   const [prompt, setPrompt]= useState("");

   useEffect(()=>{
    getPrompts()
   },[])

  useEffect(() => {

    const existingPrompt =
      prompts.find(
        (item) => item.type === title
      );

    if (existingPrompt) {
      setPrompt(existingPrompt.prompt);
    }

  }, [prompts, title]);

  const handleSave = async () => {

    await savePrompt({
      type: title,
      prompt,
    });

  };

   const handleReset=()=>{
    setPrompt("")
   }


  return (
    <div className="h-full">
     <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-full flex flex-col">
       <div className='border-b border-slate-100 px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div>
            <h2 className='text-xl font-bold text-slate-900'>
              {title}
            </h2>
            <p className='text-sm text-slate-500 mt-1'>
                {description}

            </p>
         </div>
          <div className='flex items-center gap-2 '>
            <span className='px-3 py-1 rounded-full bg-gray-100 text-green-700 text-xs font-semibold'>
                Active
            </span>
 
          </div>
        </div> 
         <div className='p-6'>
          <label htmlFor="" className='block text-sm font-semibold text-slate-700 mb-3'>
            Prompt Content</label>
            <textarea name="" id=""
             rows={6}
             value={prompt}
             onChange={(e)=>setPrompt(e.target.value)}
             placeholder={placeholder}
             className='w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none'
            />
            <div className="flex items-center justify-end gap-3 mt-5">
                <button 
                onClick={handleReset}
                className='px-5 py-2.5 rounded-xl border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition-all'>
                    Reset
                     </button>
               <button
                onClick={handleSave}
                disabled={loading}
               className='px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-sm' >
                {
                  loading ? "Saving..." : "Save Prompt"
                }
                 Save Prompt
               </button>
            </div>
         </div>
      </div>
    </div>
  )
}


this is my model
 
 
 generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id Int @id @default(autoincrement())

  name      String
  email     String   @unique
  password  String
  phone     String   @unique
  role      Role     @default(TEACHER)
  school    String?
  status    String   @default("PENDING") @db.VarChar(20)
  isActive  Boolean  @default(true)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // RELATIONS
  generatedQuestions GeneratedQuestion[]
}

enum Role {
  TEACHER
  ADMIN
  SUPERADMIN
}

model EmailTemplate {
  id        Int      @id @default(autoincrement())
  key       String   @unique
  subject   String
  html      String   @db.Text

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model AIConfiguration {
  id Int @id @default(autoincrement())

  provider String
  model    String
  apiKey   String   @db.Text

  isActive Boolean @default(true)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model AIPrompt {
  id Int @id @default(autoincrement())

  title       String
  type        String
  prompt      String   @db.Text
  description String?

  isActive Boolean @default(true)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model GeneratedQuestion {
  id Int @id @default(autoincrement())

  // TEACHER RELATION
  teacherId Int
  teacher   User @relation(fields: [teacherId], references: [id])

  topic           String
  difficulty      String
  questionType    String
  totalQuestions  Int

  // GENERATED AI QUESTIONS
  questions Json

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}


this is my folder structure 
 ───auth
    │          ├───controllers
    │          │       auth.controller.js
    │          │
    │          ├───repositories
    │          │       auth.repositories.js
    │          │
    |          ├───services
    │              auth.service.js
    │          └───route
    │                 route.js
    │      























as you know aboute my project and recently you have also write a code 
aboute question generater and and next task is write a api for configuration where should be option for model-provide, model-version and apikey. this is connect iwth my question generater and also in future it will connect to the other page that you know
this will bs flow of then project that yesterday you have desogn it.
SUPER ADMIN
   ↓
Create AI Prompt
Create AI Configuration
(API Key + Model)

TEACHER LOGIN
   ↓
Enter Topic + Type + Difficulty
   ↓
Backend calls AI API
   ↓
Questions Generated
   ↓
Save Questions in DB
   ↓
Teacher can only see own questions
 i hope now you have understad aboute my problem
 and this will be folder structure 
                 ──auth
    │       │   ├───controllers
    │       │   │       auth.controller.js
    │       │   │
    │       │   ├───repositories
    │       │   │       auth.repositories.js
    │       │   │
    |       |   ├───services
    │       │       auth.service.js
    │       │   └───route
    │       │           route.js

for more ideas i im giving you schema.prisma code 



and also my frontend code make sure it will help you 







src/
 ├── app/
 │   ├── (dashboard)/                # route group (keeps URL clean)
 │   │   ├── layout.jsx              # 🔥 main layout (sidebar + header)
 │   │   ├── dashboard/
 │   │   │   └── page.jsx
 │   │   ├── worksheets/
 │   │   │   └── page.jsx
 │   │   ├── questions/
 │   │   │   └── page.jsx
 │   │   ├── lessons/
 │   │   │   └── page.jsx
 │   │
 │   ├── auth/
 │   │   └── page.jsx
 │   │
 │   └── layout.js                  # global layout (html, body)
 │
 ├── components/
 │   ├── layout/
 │   │   ├── Sidebar.jsx
 │   │   ├── Header.jsx
 │   │   ├── Footer.jsx
 │
 ├── features/
 │   ├── dashboard/
 │   ├── worksheets/
 │   ├── questions/
 │   ├── lessons/












src/
 ├── app/
 │   ├── (dashboard)/
 │   │   ├── layout.jsx
 │   │   ├── dashboard/
 │   │   │   └── page.jsx   👈 MAIN CONTENT
 │
 ├── components/
 │   ├── layout/
 │   │   ├── Sidebar.jsx
 │   │   ├── Header.jsx
 │   │   ├── Footer.jsx
 │
 ├── features/
 │   ├── dashboard/
 │   │   └── DashboardContent.jsx 👈 UI moved here








<p>
  as you know about i am working on a ptoject that is a Ai Teaching 
  based project where.  will use AI api.
  and my task will be one place where i will add a prompt. and in second page 
  there will be a option for a topic question and those type
   and according to those question will generate and and show on my UI and.
  and one task is there will me lotes of teacher so if any teacher 
  is login then they can see only self generate question 
  form more understaind i will provide you a related UI so according
   to that you build and design a login for backend and if need you can 
   also add in frontend. and for database im using a postgraceSql.

  This is my code 
  QuestionForm.jsx 
  import { SlidersHorizontal, Sparkles } from "lucide-react";
import { useState } from "react";
  

const questionTypes = [
  "Multiple Choice",
//   "Short Answer",
  "True/False",
//   "Essay Prompt",
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
this is
QuestionPreview.jsx 
import { button, p, section } from "framer-motion/client";
import jsPDF from "jspdf";
import { Download, Pencil, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function QuestionPreview() {
    const [tempQuestion, setTempQuestion] = useState(null);
    const [questions, setQuestions] = useState([
        {
            id: 1,
            question: "Which process convert light into chemical energy?",
            options: [
                "Glycolysis",
                "Photophosphorylation",
                "Respiration",
                "Fermentation"
            ], correct: 1
        },
        {
            id: 2,
            question: "Which process convert light into chemical energy?",
            options: [
                "Glycolysis",
                "Photophosphorylation",
                "Respiration",
                "Fermentation"
            ], correct: 1
        },
        {
            id: 3,
            question: "Which process convert light into chemical energy?",
            options: [
                "Glycolysis",
                "Photophosphorylation",
                "Respiration",
                "Fermentation"
            ], correct: 1
        },
        {
            id: 4,
            question: "Which process convert light into chemical energy?",
            options: [
                "Glycolysis",
                "Photophosphorylation",
                "Respiration",
                "Fermentation"
            ], correct: 1
        },
        {
            id: 5,
            question: "Which process convert light into chemical energy?",
            options: [
                "Glycolysis",
                "Photophosphorylation",
                "Respiration",
                "Fermentation"
            ], correct: 1
        },


    ])
    const [editId, setEditId] = useState(null);
    const handleQuestionChange = (value) => {
        setTempQuestion(prev => ({
            ...prev,
            question: value
        }));
    };
    const handleOptionChange = (index, value) => {
        setTempQuestion(prev => {
            const updated = [...prev.options];
            updated[index] = value;
            return { ...prev, options: updated };
        });
    };

    const handleSaveToLibrary = () => {
        localStorage.setItem("questions", JSON.stringify(questions));
        toast.success("Saved to library!")
    }

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.setFont(undefined, "bold");

        const titleY = 15;
        doc.text("My Exam Paper", 105, titleY, { align: "center" });

        const lineY = titleY + 5;
        doc.setLineWidth(0.5);
        doc.line(10, lineY, 200, lineY);

        let y = lineY + 10;

        questions.forEach((q, index) => {

            if (y > 270) {
                doc.addPage();
                y = 25; // reset nicely
            }

            doc.setFontSize(12);
            doc.setFont(undefined, "bold");

            const questionText = `Q${index + 1}. ${q.question}`;
            const splitQuestion = doc.splitTextToSize(questionText, 180);

            doc.text(splitQuestion, 10, y);
            y += splitQuestion.length * 6;
            doc.setFont(undefined, "normal");
            q.options.forEach((opt, i) => {
                const label = String.fromCharCode(65 + i);

                const optionText = `${label}) ${opt}`;
                const splitOption = doc.splitTextToSize(optionText, 170);
                doc.text(splitOption, 15, y);
                y += splitOption.length * 5;
            });

            y += 8;
        });

        doc.save("questions.pdf");
    };
    return (
        <section className="lg:col-span-7 flex flex-col min-h-[600px]">
            <div className="flex justify-between mb-6 ">
                <h2 className="font-bold text-lg">
                    Preview
                </h2>
                <div className="flex gap-2 text-xs">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                        10 Items
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                        Ready
                    </span>
                </div>
            </div>
            <div className="flex-grow bg-white border-white rounded-xl flex flex-col">
                <div className="p-6 space-y-8 overflow-y-auto max-h-[500px]">
                    {questions.map((q, index) => (
                        <div key={q.id} className="group">
                            <div className="flex justify-between text-xs text-blue-600 font-mono">
                                <span>Question {String(index + 1).padStart(2, "0")}</span>
                                <Pencil size={14} className="opacity-0 group-hover:opacity-100"
                                    onClick={() => {
                                        setEditId(q.id);

                                        setTempQuestion({ ...q })
                                    }}
                                />
                            </div>
                            {
                                editId === q.id ? (
                                    <input
                                        value={tempQuestion?.question || ""}
                                      onChange={(e) => handleQuestionChange(e.target.value)}
                                        className="border p-2 w-full mt-2 rounded"
                                    />
                                ) : (
                                    <p className="font-semibold mt-2">
                                        {q.question}
                                    </p>
                                )
                            }

                            <div className="grid md:grid-cols-2 gap-2 mt-3">
                                {
                                    q.options.map((opt, i) => (
                                        <div
                                            key={i}
                                            className={`p-2 rounded ${i === q.correct
                                                ? "bg-blue-100 font-medium"
                                                : "bg-gray-100"
                                                }`}>
                                            {
                                                editId === q.id ? (
                                                    <input
                                                        value={tempQuestion?.options[i] || ""}
                                                        onChange={(e) =>
                                                           handleOptionChange(i, e.target.value)
                                                        }
                                                        className="w-full border p-1 rounded"
                                                    />

                                                ) : (
                                                    <>
                                                        {String.fromCharCode(65 + i)}) {opt}
                                                    </>
                                                )
                                            }


                                        </div>
                                    ))
                                }
                            </div>
                            {
                                editId === q.id && (
                                    <div className="mt-3 flex gap-2">
                                        <button
                                            onClick={() => {
                                                setQuestions(prev =>
                                                    prev.map(q =>
                                                        q.id === editId ? tempQuestion : q
                                                    )
                                                );
                                                setEditId(null);
                                                setTempQuestion(null);
                                            }}
                                            className="text-sm bg-blue-600 text-white px-3 py-1 rounded"
                                        >
                                            Save
                                        </button>

                                        <button
                                            onClick={() => {
                                                setEditId(null);
                                                setTempQuestion(null); 
                                            }}
                                            className="text-sm bg-gray-300 px-3 py-1 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    ))}

                </div>
                <div className="p-6 border-t flex justify-end gap-3">
                    <button
                        onClick={handleSaveToLibrary}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded">
                        <Save size={16} />
                        Save to Library
                    </button>
                    <button
                        onClick={handleDownloadPDF}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded">
                        <Download />
                        Download(PDF)
                    </button>
                </div>
            </div>
        </section>
    );
}

QuestionForm.jsx
import { SlidersHorizontal, Sparkles } from "lucide-react";
import { useState } from "react";
  

const questionTypes = [
  "Multiple Choice",
//   "Short Answer",
  "True/False",
//   "Essay Prompt",
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

this is ConfigurationForm.jsx 
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const MODEL_OPTIONS = {
  openai: ["gpt-4o", "gpt-4", "gpt-3.5-turbo"],
  anthropic: ["claude-3-opus", "claude-3-sonnet"],
  google: ["gemini-pro", "gemini-1.5-pro"],
};

export default function ConfigurationForm() {
  const [showKey, setShowKey] = useState(false);

  const [form, setForm] = useState({
    provider: "openai",
    model: "",
    prompt: "",
    apiKey: "",
  });

  const inputClass =
    "w-full h-11 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "provider") {
      setForm({ ...form, provider: value, model: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="w-full     p-6 rounded-xl shadow-sm border">

      <h2 className="text-lg font-semibold mb-4">
        AI Configuration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div >
          <label className="text-sm text-gray-600">
            Model Provider
          </label>
          <select
            name="provider"
            value={form.provider}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
            <option value="google">Google</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">
            Model Version
          </label>
          <select
            name="model"
            value={form.model}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select model</option>
            {MODEL_OPTIONS[form.provider]?.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* <div>
          <label className="text-sm text-gray-600">
            Prompt
          </label>
          <textarea
            name="prompt"
            value={form.prompt}
            onChange={handleChange}
            placeholder="Enter system prompt..."
            className="w-full h-24 p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div> */}
        <div>
          <label className="text-sm text-gray-600">
            API Key
          </label>

            <div className="relative">
        <input
          type={showKey ? "text" : "password"}
          name="apiKey"
          value={form.apiKey}
          onChange={handleChange}
          placeholder="sk--------------------------"
          className={inputClass}
        />

        <button
          type="button"
          onClick={() => setShowKey(!showKey)}
       className="absolute right-3 top-1/2 -translate-y-1/2 mt-[2px]"
        >
          {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save Configuration
        </button>
      </form>

    </div>
  );
}
this is 
aiPromptform.jsx 
import React from 'react'

export default function AiPromptForm  ({
    title,
    description,
    placeholder,

}) {
  return (
    <div className="h-full">
     <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-full flex flex-col">
       <div className='border-b border-slate-100 px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div>
            <h2 className='text-xl font-bold text-slate-900'>
              {title}
            </h2>
            <p className='text-sm text-slate-500 mt-1'>
                {description}

            </p>
         </div>
          <div className='flex items-center gap-2 '>
            <span className='px-3 py-1 rounded-full bg-gray-100 text-green-700 text-xs font-semibold'>
                Active
            </span>
 
          </div>
        </div> 
         <div className='p-6'>
          <label htmlFor="" className='block text-sm font-semibold text-slate-700 mb-3'>
            Prompt Content</label>
            <textarea name="" id=""
             rows={6}
             placeholder={placeholder}
             className='w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none'
            />
            <div className="flex items-center justify-end gap-3 mt-5">
                <button className='px-5 py-2.5 rounded-xl border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition-all'>
                    Reset
                     </button>
               <button className='px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-sm' >
                 Save Prompt
               </button>
            </div>

            
         </div>
      </div>
    </div>
  )
}



</p>