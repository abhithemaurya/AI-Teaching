export default function Footer() {
  return (
    <footer
      className="
        w-full mt-auto
        px-4 sm:px-6 md:px-8
        py-4 md:py-5
        flex flex-col items-center
        gap-3 md:gap-4
        border-t border-gray-200
        bg-[#f6fafe] dark:bg-slate-950
      "
    >
     
      <div
        className="
          flex flex-wrap justify-center
          gap-4 sm:gap-6 md:gap-8
          text-center
        "
      >
        <a
          href="#"
          className="text-[#52616a] dark:text-slate-500 text-[10px] md:text-xs uppercase tracking-widest hover:text-[#005cba] transition-colors"
        >
          Privacy Policy
        </a>

        <a
          href="#"
          className="text-[#52616a] dark:text-slate-500 text-[10px] md:text-xs uppercase tracking-widest hover:text-[#005cba] transition-colors"
        >
          Terms of Service
        </a>

        <a
          href="#"
          className="text-[#52616a] dark:text-slate-500 text-[10px] md:text-xs uppercase tracking-widest hover:text-[#005cba] transition-colors"
        >
          Documentation
        </a>

        <a
          href="#"
          className="text-[#52616a] dark:text-slate-500 text-[10px] md:text-xs uppercase tracking-widest hover:text-[#005cba] transition-colors"
        >
          Support
        </a>
      </div>
      <p
        className="
          text-[#52616a] dark:text-slate-500
          text-[10px] md:text-xs
          uppercase tracking-widest
          opacity-80 text-center
        "
      >
        © 2024 EduBlueprint AI. Architectural Precision in Pedagogy.
      </p>
    </footer>
  );
}