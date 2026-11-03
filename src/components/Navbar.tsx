import React from 'react';

interface NavbarProps {
  onJumpToToolkit: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onJumpToToolkit }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/92 backdrop-blur-md border-b border-[#1D2D27]/10">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-8 px-6 h-16">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-serif text-xl font-semibold tracking-tight text-[#1D2D27] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1F3A2E]"
        >
          Grounded
        </a>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-7 text-sm text-[#43534B]"
        >
          <a
            href="#micro-data"
            className="hover:text-[#1D2D27] underline-offset-4 hover:underline transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Micro-Data
          </a>
          <a
            href="#daily-ripple"
            className="hover:text-[#1D2D27] underline-offset-4 hover:underline transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Daily Ripple
          </a>
          <a
            href="#action-toolkit"
            className="hover:text-[#1D2D27] underline-offset-4 hover:underline transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Toolkit
          </a>
          <a
            href="#community-ripple"
            className="hover:text-[#1D2D27] underline-offset-4 hover:underline transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Community
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onJumpToToolkit}
            className="px-4 py-2 text-xs font-semibold text-[#FBF9F5] bg-[#1F3A2E] rounded-lg hover:bg-[#294B3C] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F3A2E]"
          >
            Take One Small Step
          </button>
        </div>
      </div>
    </header>
  );
};
