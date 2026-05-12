import { section } from 'framer-motion/client'
import { Delete, DeleteIcon, DraftingCompassIcon, Grid, Grip, Trash2 } from 'lucide-react'
import React from 'react'

const HomeworkSection = () => {
    const homeworkData=[
        {
            duration: "30 MIN",
            title : "Post Reflaction Journal",
            description: "Write a 300-word analysis on the chromatography results. Compare the pigment concentration between sun-facing and shade-grown leaves.",
        },
        {
            duration: "15 MIN",
            title: "DIagram: The Calvin Cycle",
            description: "Sketch the 3 main stages of the light-independent reaction. Label RuBP, G3P, and the ATP/NADPH input points.",
        }
    ]
    return (

        <section>

            <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 flex items-center justify-center bg-secondary-container text-on-secondary-container rounded-full font-bold">
                    03
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-on-surface">
                    Homework &amp; Assessment
                </h2>

                <div className="flex-1 border-b border-outline-variant/30 ml-4"></div>
            </div>


            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded shadow-sm divide-y divide-outline-variant/10">
              {
                homeworkData.map((item,index)=>(
                   <div key={index} className="p-6 flex items-start gap-8">

                    <div className="w-32 shrink-0">
                        <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block mb-1">
                            Duration
                        </span>
                        <span className="text-lg font-black text-primary">
                            {item?.duration}
                        </span>
                    </div>

                    <div className="flex-1">
                        <h4 className="font-bold text-on-surface mb-2">
                           {item?.title}
                        </h4>

                        <p className="text-sm text-on-surface-variant leading-relaxed">
                           {item.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 self-center">
                        <button className="p-2 hover:bg-surface-container-low rounded transition-colors text-red-600 cursor-pointer">
                           <Trash2 size={18} />
                        </button>

                        <button className="p-2 hover:bg-surface-container-low rounded transition-colors">
                           <Grid size={18}/>
                        </button>
                    </div>
                </div>  
                ))
              }

            

            </div>
        </section>
    )
}

export default HomeworkSection
