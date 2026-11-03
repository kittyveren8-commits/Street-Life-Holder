import React from 'react';
import { QuietFilterStory } from './microdata/QuietFilterStory';
import { MicroClimateStory } from './microdata/MicroClimateStory';
import { SoilSpongeStory } from './microdata/SoilSpongeStory';

export const MicroDataSection: React.FC = () => {
  return (
    <section id="micro-data" className="py-20 md:py-28 border-b border-[#1D2D27]/10">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Editorial Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-xs tracking-wide text-[#5A6B62] mb-3">
            Micro-Data Field Stories <span aria-hidden="true">·</span> Human-Scale Metrics
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1D2D27] text-balance mb-4">
            Skip the global megatons. Here is what nature does on your block between breakfast and
            bedtime.
          </h2>
          <p className="text-base leading-relaxed text-[#42524A]">
            Environmental numbers often feel too vast to touch. When we zoom down to a single window
            frame, sidewalk slab, or planter bed, the connection between local greenery and how your
            body feels becomes unmistakable.
          </p>
        </div>

        {/* Three Interactive Micro-Data Vignettes */}
        <div>
          <QuietFilterStory />
          <MicroClimateStory />
          <SoilSpongeStory />
        </div>
      </div>
    </section>
  );
};
