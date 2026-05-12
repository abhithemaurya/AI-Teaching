import { main } from "framer-motion/client";
import { Sparkles, Workflow } from "lucide-react";
import WeekGrid from "./WeekGrid";

export default function WeeklyPlannerContent() {
   
    return (
        <main className="flex-grow ">
            <section className="p-8 max-w-7xl mx-auto w-full flex-1">
                <div className="bg-surface-container-low p-8 rounded-xl mb-8 flex flex-col md:flex-row gap-8 items-end">

                    <div className="w-full md:w-32">
                        <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-widest">
                            Week Number
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. 42"
                            className="w-full bg-surface-container-low border-b border-outline-variant/50 focus:border-primary focus:ring-0 text-lg font-headline font-bold py-2 transition-all outline-none"
                        />
                    </div>

                    <div className="flex-1 w-full">
                        <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-widest">
                            Main Topics
                        </label>

                        <input
                            type="text"
                            placeholder="The Industrial Revolution & Global Economic Shifts"
                            className="w-full bg-surface-container-low border-b border-outline-variant/50 focus:border-primary focus:ring-0 text-lg font-headline font-medium py-2 transition-all outline-none"
                        />
                    </div>

                    <button className="bg-surface-container-highest text-primary p-3 rounded hover:bg-primary hover:text-on-primary transition-all duration-200">
                        <Sparkles size={18} />
                    </button>
                </div>
            <WeekGrid/>
            
            </section>
        </main>
    );
}