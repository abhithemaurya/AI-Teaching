export default function DashboardAnalyticsActivity() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
      <div className="lg:col-span-2 bg-white p-5 md:p-6 lg:p-8 rounded-xl">
        <h4 className="text-xs md:text-sm font-bold uppercase mb-4 md:mb-6 text-gray-500">
          Pedagogical Insight
        </h4>
        <p className="text-xs md:text-sm text-gray-500">
          Your content generation increased by{" "}
          <span className="text-blue-600 font-bold">24%</span> this week
        </p>
      </div>
      <div className="bg-blue-100 p-5 md:p-6 lg:p-8 rounded-xl">
        <h4 className="text-xs md:text-sm font-bold uppercase mb-4 md:mb-6 text-gray-500">
          Active focus
        </h4>
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-lg">
            <span className="text-blue-600 text-lg md:text-xl">⏳</span>
            <div className="flex-1">
              <p className="text-xs md:text-sm font-bold">
                Finalizing Quiz
              </p>
              <p className="text-[10px] md:text-xs text-gray-500">
                Biology: Cellular Processes
              </p>
            </div>
            <span className="text-xs text-blue-600 font-bold cursor-pointer hover:underline">
              Resume
            </span>
          </div>
          <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-400 text-lg md:text-xl">✔</span>
            <div className="flex-1">
              <p className="text-xs md:text-sm font-bold">
                Draft Exported
              </p>
              <p className="text-[10px] md:text-xs text-gray-500">
                Math: Quadratic Equations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}