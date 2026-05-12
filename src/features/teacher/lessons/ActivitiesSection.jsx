import { Download, FlaskConical, List, ListCheck, ListCheckIcon, ListCollapse, Printer, Save } from 'lucide-react'
import React from 'react'

const ActivitiesSection = () => {
    return (
        <section>
            <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 flex items-center justify-center bg-secondary-container text-on-secondary-container rounded-full font-bold">
                    02
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-on-surface">
                    Interactive Activities
                </h2>
                <div className="flex-1 border-b border-outline-variant/30 ml-4"></div>
            </div>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-7 bg-surface-container p-8 rounded relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <span className="material-symbols-outlined text-8xl">
                           <FlaskConical size={55} />
                        </span>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-primary text-on-primary text-[10px] font-bold text-white uppercase rounded">
                                Group Lab
                            </span>
                            <span className="text-xs font-mono text-on-surface-variant">
                                40 MIN
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-on-surface mb-4">
                            Leaf Chromatography Experiment
                        </h3>

                        <p className="text-on-surface-variant mb-6 text-sm max-w-md">
                            Students will extract pigments using alcohol and filter paper.
                        </p>

                        <div className="flex gap-4">
                            <button className="bg-surface-container-highest px-4 py-2 rounded text-xs font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">
                                    <List />
                                </span>
                                Equipment List
                            </button>

                            <button className="bg-surface-container-highest px-4 py-2 rounded text-xs font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">
                                    <Download />
                                </span>
                                Worksheet
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-5 bg-surface-container-high p-8 rounded flex flex-col justify-between relative">

                    {/* CONTENT */}
                    <div>
                        <h3 className="text-xl font-bold text-on-surface mb-4">
                            The Global Impact Debate
                        </h3>
                        <p className="text-on-surface-variant text-sm italic">
                            "How would life evolve if photosynthesis used infrared?"
                        </p>
                    </div>

                    <div className="absolute bottom-4 right-4 flex gap-3">

                        <button className="w-10 h-10 bg-surface-container-highest text-primary rounded-full shadow flex items-center justify-center hover:scale-105 transition">
                            <span className="material-symbols-outlined text-sm"><Printer /></span>
                        </button>

                        <button className="w-10 h-10 text-on-primary rounded-full shadow flex items-center justify-center hover:scale-110 transition">
                            <span className="material-symbols-outlined text-sm"><Save /></span>
                        </button>

                    </div>
                </div>

            </div>

        </section>
    )
}

export default ActivitiesSection
