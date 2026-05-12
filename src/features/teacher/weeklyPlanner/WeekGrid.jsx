import { PlusCircle } from 'lucide-react'
import React from 'react'

const WeekGrid = () => {
     const weeklyData = [
        {
            day: "Monday",
            date: "Oct 21",
            topic: "Introduction to Stram Engines",
            worksheet: false,
            worksheetFile: "",
            text: "10-min Diagnostic Quiz",
            friday: false,
        },
        {
            day: "Tuesday",
            date: "Oct 22",
            topic: "Urbanization & Factory Life",
            worksheet: true,
            WorksheetFile: "Primary_Source_Analysis.pdf",
            test: "No scheduled text",
            friday: false,
        },
        {
            day: "Wednesday",
            date: "Oct 23",
            topic: "Technological Innovations",
            worksheet: false,
            worksheetFile: "",
            text: "No scheduled test",
            friday: false,
        },
        {
            day: "Thursday",
            date: "Oct 24",
            topic: "Child labor & Social Reform",
            worksheet: true,
            worksheetFile: "Reform_Acts_Comparison.xlsx",
            text: "Unit Vocab Check",
            friday: false,
        },
        {
            day: "Friday",
            date: "Oct 25",
            topic: "Weekly Synthesis Seminor",
            worksheet: false,
            worksheetFile: "",
            text: "Mid-Unit Assessment",
            friday: true
        }
    ]
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-full min-h-[600px]">

        {weeklyData.map((item, index) => (
          <div
            key={index}
            className={`bg-surface-container-lowest flex flex-col border-t-2 ${
              item.friday
                ? "border-primary"
                : "border-primary/20"
            }`}
          >
            <div
              className={`p-4 ${
                item.friday
                  ? "bg-surface-container-highest"
                  : "bg-[#eef4fa]"
              }`}
            >
              <span
                className={`block text-[10px] font-black tracking-tighter uppercase ${
                  item.friday
                    ? "text-primary"
                    : "text-on-surface-variant"
                }`}
              >
                {item.day}
              </span>

              <span className="text-sm font-bold text-on-surface">
                {item.date}
              </span>
            </div>

         
            <div className="p-4 flex-1 space-y-6 blueprint-grid">

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-primary uppercase">
                  Topic
                </span>

                <div
                  className={`h-12 bg-surface-container-low/80 rounded border-l-2 border-primary flex items-center px-3 text-sm text-on-surface-variant italic ${
                    item.friday ? "font-bold" : ""
                  }`}
                >
                  {item.topic}
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-secondary uppercase">
                  Worksheets
                </span>

                {item.worksheet ? (
                  <div className="p-2 bg-surface-container-high/40 rounded flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-on-surface-variant">
                      description
                    </span>

                    <span className="text-[10px] font-medium truncate">
                      {item.worksheetFile}
                    </span>
                  </div>
                ) : (
                  <div className="aspect-video bg-[#eef4fa] rounded border border-dashed border-outline-variant/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-outline-variant/40">
                      <PlusCircle/>
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-error uppercase">
                  Tests
                </span>

                {item.test === "No scheduled test" ? (
                  <div className="h-8 border-l-2 border-outline-variant/20 flex items-center px-3 text-xs text-outline-variant italic">
                    {item.test}
                  </div>
                ) : (
                  <div
                    className={`flex items-center px-3 ${
                      item.friday
                        ? "h-12 bg-error-container/20 border-l-4 border-error text-sm font-bold text-on-error-container"
                        : "h-8 bg-error-container/10 border-l-2 border-error/40 text-xs text-on-surface-variant"
                    }`}
                  >
                    {item.test}
                  </div>
                )}
              </div>

            </div>
          </div>
        ))}

      </div>
  )
}

export default WeekGrid
