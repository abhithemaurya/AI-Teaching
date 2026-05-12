
import React from 'react'
import InstructionSteps from './InstructionSteps'
import ActivitiesSection from './ActivitiesSection'
import HomeworkSection from './HomeworkSection'

const LessonContent = () => {
    return (
        <main className="flex-grow">
            <header className="mb-12">

                <div className="flex items-baseline gap-4 mb-8">
                    <h1 className="text-4xl font-black text-on-surface tracking-tighter uppercase">
                        New Lesson Plan
                    </h1>
                    <span className="text-primary font-medium font-mono text-sm">
                        [ID: LP-2024-082]
                    </span>
                </div>

                <div className="grid grid-cols-12 gap-8 p-8 bg-surface-container-low rounded shadow-sm">

                    <div className="col-span-8">
                        <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                            Lesson Topic
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Introduction to Photosynthesis"
                            className="w-full bg-surface-container-low border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all text-xl font-semibold py-2"
                        />
                    </div>
                    <div className="col-span-4">
                        <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                            Number of Periods
                        </label>
                        <input
                            type="number"
                            placeholder="2"
                            className="w-full bg-surface-container-low border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all text-xl font-semibold py-2"
                        />
                    </div>

                </div>
            </header>
           <div className='space-y-16'>
            <InstructionSteps />
            <ActivitiesSection />
            <HomeworkSection />
           </div>

        </main>
    )
}

export default LessonContent
