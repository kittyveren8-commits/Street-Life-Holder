import React from 'react';
import { VISUAL_ASSETS } from '../data/ecologyContent';
import { ResilientImage } from './ResilientImage';

export const EditorialInterlude: React.FC = () => {
  return (
    <section aria-label="Field photography and reflection" className="py-20 border-b border-[#1D2D27]/10">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Centered Calm Pull Quote with Top/Bottom Hairlines */}
        <blockquote className="max-w-3xl mx-auto py-10 mb-16 border-y border-[#1D2D27]/12 text-center">
          <p className="font-serif italic text-2xl sm:text-3xl leading-relaxed text-[#1D2D27] text-balance">
            “Lasting care rarely starts from alarm. It begins the moment you notice that cooler
            sidewalks, quieter mornings, and cleaner tap water are part of the very same living
            system.”
          </p>
          <footer className="mt-4 text-xs tracking-wide text-[#5A6B62]">
            Behavioral Ecology Principle <span aria-hidden="true">·</span> Agency Over Perfection
          </footer>
        </blockquote>

        {/* 2-Column Documentary Field Photography Spread */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <figure>
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#E7E2D8]">
              <ResilientImage
                src={VISUAL_ASSETS.editorialCanopy}
                alt="Golden morning sunlight filtering through green street tree leaves onto a calm stone walkway"
                fallbackTitle="Morning Canopy Shade"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-xs font-serif italic text-[#5A6B62]">
              Fig. 01 — Mature neighborhood canopies lower afternoon cooling energy demand in
              adjacent apartments by up to 25 percent while inviting longer daily walks.
            </figcaption>
          </figure>

          <figure>
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#E7E2D8]">
              <ResilientImage
                src={VISUAL_ASSETS.editorialSoil}
                alt="Dark loamy living soil in a terracotta planter with young native clover, thyme, and fern fronds"
                fallbackTitle="Living Planter Soil"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-xs font-serif italic text-[#5A6B62]">
              Fig. 02 — Even a windowsill terracotta box feeds local pollinators and reconnects
              daily routines to beneficial soil microbes linked to calmer mood regulation.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};
