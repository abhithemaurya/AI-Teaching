import React from 'react'
import AiStateCards from './AiStateCards'
import AiPromptForm from './AiPromptForm'

const AiPromprtContent = () => {
    const promptTypes = [
        {
            id: 1,
            title: "Question Generator",
            description: "Create AI prompt for generating a pizzes, MCQs, description question, and assessments.",
            placeholder: "Enter question generation prompt here",
        },
        {
            id: 2,
            title: "Worksheet",
            description: "Manage prompt for worksheet generation with activities and  practice exercises.",
            placeholder: "Enter worksheet prompt here..."
        },
        {
            id: 3,
            title: "Lesson",
            description: "Create lesson generation prompts including explanations, concepts, and activities.",
            placeholder: "Enter lesson generation prompt here..."
        },
        {
            id: 4,
            title: "Weekly Planner",
            description: "Manage prompts for weekly teachung planner and classroom schedules.",
            placeholder: "Enter weekly planner prompt here..."
        }
    ]
    return (
        <div className='min-h-screen bg-slate-50 p-4 md:p-8'>
            <div className='max-w-7xl mx-auto'>
                <div className='mb-8'>
                    <h1 className='text-3xl font-black text-slate-900'>Prompt Generation</h1>
                    <p className='text-slate-500 mt-2 text-sm md:text-base'>
                        Manage and customize AI prompt used across the platform
                    </p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
                    {
                        promptTypes.map((item) => (
                            <AiStateCards
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                description={item.description}
                            />
                        ))
                    }
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {promptTypes.map((item) => (
                        <AiPromptForm
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            placeholder={item.placeholder}
                        />
                    ))}

                </div>
            </div>
        </div>
    )
}

export default AiPromprtContent
