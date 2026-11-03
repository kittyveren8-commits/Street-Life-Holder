import React, { useEffect, useRef, useState } from 'react';
import { Wind, ArrowDown } from 'lucide-react';
import { VISUAL_ASSETS } from '../data/ecologyContent';

export const HeroSection: React.FC = () => {
  // 0 = dense gray concrete, 100 = balanced urban green
  const [greenBalance, setGreenBalance] = useState<number>(78);
  const animFrameRef = useRef<number | null>(null);

  const animateTo = (target: number) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    const start = greenBalance;
    const distance = target - start;
    const duration = 680;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setGreenBalance(Math.round(start + distance * eased));
      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const handleToggleBreathe = () => {
    if (greenBalance > 55) {
      animateTo(12);
    } else {
      animateTo(88);
    }
  };

  const ratio = greenBalance / 100;
  const walkwayTempF = Math.round(92 - ratio * 15);
  const streetNoiseDb = (68.2 - ratio * 9.0).toFixed(1);
  const rainSoakedPct = Math.round(12 + ratio * 74);

  const stateDescription =
    greenBalance >= 65
      ? 'Balanced Canopy · Shaded & Porous'
      : greenBalance >= 35
        ? 'Transitional Block · Partial Relief'
        : 'Dense Concrete · Heat-Retaining';

  const splitX = Math.round(greenBalance * 8);

  return (
    <section id="top" className="pt-10 pb-16 md:pt-16 md:pb-24 border-b border-[#1D2D27]/10">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* 2-Column Editorial Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Human-Centric Hook */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs tracking-wide text-[#5A6B62] mb-5">
                Everyday Ecology <span aria-hidden="true">·</span> Calm Field Guide{' '}
                <span aria-hidden="true">·</span> Human Scale
              </p>

              <h1 className="font-serif text-[clamp(2.15rem,3.6vw,3.35rem)] leading-[1.13] font-normal text-[#1D2D27] text-balance mb-6">
                Nature isn’t far away. It’s in the air in your room, the soil under your street,
                and the rhythm of your day.
              </h1>

              <p className="text-base leading-relaxed text-[#42524A] max-w-[52ch] mb-8">
                You don’t need a wilderness trip—or overwhelming global charts—to feel how a
                healthier earth supports your body. Explore how a single street tree, a patch of
                living soil, and gentle 5-minute habits make daily life quieter, cooler, and
                clearer.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#micro-data"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#FBF9F5] bg-[#1F3A2E] rounded-lg hover:bg-[#294B3C] transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <span>Explore Your Street</span>
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#daily-ripple"
                className="px-3 py-2.5 text-sm font-semibold text-[#1F3A2E] hover:text-[#A84E32] underline underline-offset-4 transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                See how daily habits ripple
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Ambient Neighborhood Stage */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#F3EFE6] border border-[#1D2D27]/10 rounded-2xl p-4 sm:p-5">
            {/* Stage Top Header + Interactive Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
              <div className="text-xs text-[#4C5D54]">
                <span className="font-semibold text-[#1D2D27]">{stateDescription}</span>
                <span aria-hidden="true"> · </span>
                <span className="font-mono tabular-nums">{greenBalance}% green cover</span>
              </div>

              <button
                type="button"
                onClick={handleToggleBreathe}
                aria-pressed={greenBalance > 55}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#FBF9F5] text-[#1F3A2E] border border-[#1D2D27]/15 hover:border-[#1F3A2E] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Wind className="w-3.5 h-3.5 text-[#5A7665]" aria-hidden="true" />
                <span>
                  {greenBalance > 55
                    ? 'Compare bare concrete street'
                    : 'See your neighborhood breathe'}
                </span>
              </button>
            </div>

            {/* Pure SVG Split-Curtain Architectural Illustration Stage */}
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#E5E0D5] select-none">
              <svg
                viewBox="0 0 800 500"
                role="img"
                aria-label="Interactive street comparison transitioning between dense gray concrete pavement and balanced urban green tree canopy"
                className="w-full h-full block"
              >
                <defs>
                  <clipPath id="hero-green-curtain">
                    <rect x={0} y={0} width={splitX} height={500} />
                  </clipPath>
                  <linearGradient id="hero-bottom-scrim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#121A16" stopOpacity="0" />
                    <stop offset="100%" stopColor="#121A16" stopOpacity="0.68" />
                  </linearGradient>
                </defs>

                {/* Fallback warm architectural canvas underneath */}
                <rect x={0} y={0} width={800} height={500} fill="#E6E1D6" />

                {/* Base Layer: Dense Gray Concrete Street */}
                <image
                  href={VISUAL_ASSETS.heroConcrete}
                  x={0}
                  y={0}
                  width={800}
                  height={500}
                  preserveAspectRatio="xMidYMid slice"
                />

                {/* Clipped Layer: Balanced Urban Green Canopy Street */}
                <g clipPath="url(#hero-green-curtain)">
                  <rect x={0} y={0} width={800} height={500} fill="#DCE5DD" />
                  <image
                    href={VISUAL_ASSETS.heroCanopy}
                    x={0}
                    y={0}
                    width={800}
                    height={500}
                    preserveAspectRatio="xMidYMid slice"
                  />
                </g>

                {/* Measured Bottom Scrim */}
                <rect x={0} y={410} width={800} height={90} fill="url(#hero-bottom-scrim)" />

                {/* Curtain Divider & Handle */}
                <g transform={`translate(${splitX}, 0)`}>
                  <line
                    x1={0}
                    y1={0}
                    x2={0}
                    y2={500}
                    stroke="#FBF9F5"
                    strokeWidth={2.5}
                    strokeOpacity={0.92}
                  />
                  <circle
                    cx={0}
                    cy={250}
                    r={18}
                    fill="#FBF9F5"
                    stroke="#1D2D27"
                    strokeOpacity={0.28}
                    strokeWidth={1.5}
                  />
                  <path
                    d="M-6 250 L-2 246 M-6 250 L-2 254 M6 250 L2 246 M6 250 L2 254"
                    stroke="#1F3A2E"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </g>
              </svg>

              <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-[11px] font-medium text-[#FBF9F5] pointer-events-none">
                <span>Living Canopy &amp; Bioswales</span>
                <span>Sealed Pavement &amp; Bare Curb</span>
              </div>
            </div>

            {/* Interactive Scrubbing Control */}
            <div className="mt-4 pt-1">
              <div className="flex items-center justify-between text-xs text-[#4C5D54] mb-1.5">
                <label htmlFor="hero-breathe-slider" className="font-semibold text-[#1D2D27]">
                  Slide to see your neighborhood breathe
                </label>
                <span className="font-mono tabular-nums text-[#4C5D54]">
                  {greenBalance}% balanced green
                </span>
              </div>
              <input
                id="hero-breathe-slider"
                type="range"
                min={0}
                max={100}
                value={greenBalance}
                onChange={(e) => setGreenBalance(Number(e.target.value))}
                className="w-full calm-slider"
              />
            </div>
          </div>
        </div>

        {/* Full-Width Human-Scale Neighborhood Readout Strip Below Hero Split */}
        <div className="mt-10 pt-8 border-t border-[#1D2D27]/10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <div>
            <p className="text-xs text-[#5A6B62] mb-1">
              Walkway Radiant Feel <span aria-hidden="true">·</span> Afternoon Walk
            </p>
            <div className="flex items-baseline gap-2.5">
              <span className="font-mono text-2xl font-semibold tabular-nums text-[#1D2D27]">
                {walkwayTempF}°F
              </span>
              <span className="text-xs text-[#4C5D54]">
                {walkwayTempF <= 81 ? 'Cool dappled shade' : 'Unshaded pavement warmth'}
              </span>
            </div>
          </div>

          <div className="md:border-l md:border-[#1D2D27]/10 md:pl-8">
            <p className="text-xs text-[#5A6B62] mb-1">
              Second-Floor Window Sound <span aria-hidden="true">·</span> Curbside
            </p>
            <div className="flex items-baseline gap-2.5">
              <span className="font-mono text-2xl font-semibold tabular-nums text-[#1D2D27]">
                {streetNoiseDb} dB
              </span>
              <span className="text-xs text-[#4C5D54]">
                {Number(streetNoiseDb) <= 62
                  ? 'Softened by leaf layers'
                  : 'Hard-surface street echo'}
              </span>
            </div>
          </div>

          <div className="md:border-l md:border-[#1D2D27]/10 md:pl-8">
            <p className="text-xs text-[#5A6B62] mb-1">
              Summer Rain Soaked In <span aria-hidden="true">·</span> Street Beds
            </p>
            <div className="flex items-baseline gap-2.5">
              <span className="font-mono text-2xl font-semibold tabular-nums text-[#1D2D27]">
                {rainSoakedPct}%
              </span>
              <span className="text-xs text-[#4C5D54]">
                {rainSoakedPct >= 60 ? 'Drinks rain into cool roots' : 'Mostly storm-drain runoff'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
