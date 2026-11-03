import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-[#FBF9F5]">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="font-serif text-lg font-semibold text-[#1D2D27]">Grounded</span>
          <p className="text-xs text-[#5A6B62] mt-1 max-w-md">
            Calm data storytelling connecting urban trees, living soil, and micro-climates to
            everyday human well-being. Metrics synthesized from USDA Urban Forestry, EPA Heat
            Island &amp; Stormwater Studies, and WHO Environmental Noise Guidelines.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-[#4C5D54]">
          <a href="#micro-data" className="hover:text-[#1D2D27] underline-offset-4 hover:underline">
            Micro-Data
          </a>
          <a
            href="#daily-ripple"
            className="hover:text-[#1D2D27] underline-offset-4 hover:underline"
          >
            Daily Ripple
          </a>
          <a
            href="#action-toolkit"
            className="hover:text-[#1D2D27] underline-offset-4 hover:underline"
          >
            3-Tier Toolkit
          </a>
          <a
            href="#community-ripple"
            className="hover:text-[#1D2D27] underline-offset-4 hover:underline"
          >
            Community Counter
          </a>
        </div>
      </div>
    </footer>
  );
};
