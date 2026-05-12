"use client"
import { Edit, Pencil } from 'lucide-react'
import React from 'react'

const InstructionSteps = () => {
    const lessons = [
  {
    id: 1,
    title: "Conceptual Overview",
    time: "15 MIN",
    description:
      "Introduce core terminology and the primary chemical equation. Use visual aids for chlorophyll function.",
  },
  {
    id: 2,
    title: "The Light Reaction Cycle",
    time: "25 MIN",
    description:
      "Deep dive into Thylakoid structures. Explain conversion of solar energy into ATP/NADPH.",
  }

];

    return (
        <section>
            <div className='flex items-center gap-4 mb-6'>
                <div className='w-10 h-10 flex items-center justify-center bg-secondary-container text-on-secondary-container rounded-full font-bold'>
                    01
                </div>
                <h2 className='text-2xl font-bold tracking-tight text-on-surface'>
                    Instructional Steps
                </h2>
                <div className='flex-1 border-b border-outline-variant/30 ml-4'>

                </div>
              </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {
                    lessons.map((item, index) => (
                        <div key={index} className="bg-surface-container-lowest p-6 rounded border-l-4 border-primary shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-on-surface">
                                    {item.title}
                                </h3>
                                <div className="bg-surface-container-high px-2 py-1 rounded text-[10px] font-bold text-primary flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">
                                        timer
                                    </span>
                                    {item.time}
                                </div>
                            </div>
                            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                                {item.description}
                            </p>

                            <button className="text-xs font-bold text-primary flex items-center gap-1 uppercase tracking-wider cursor-pointer">
                                <span className="material-symbols-outlined text-sm">
                                    <Pencil size={14} />
                                </span>
                                Edit Detail
                            </button>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default InstructionSteps
