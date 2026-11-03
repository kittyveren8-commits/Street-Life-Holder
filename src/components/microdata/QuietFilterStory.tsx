import React, { useState } from 'react';

export const QuietFilterStory: React.FC = () => {
  // 0 = bare curb, 100 = mature oak canopy + understory shrub border
  const [canopyDensity, setCanopyDensity] = useState<number>(72);

  const ratio = canopyDensity / 100;
  // Acoustic drop: 68.0 dB bare street -> 59.0 dB mature multi-layered canopy
  const windowDb = (68 - ratio * 9).toFixed(1);
  // Particulate PM2.5 capture at 2nd-floor window height: 0% -> 24%
  const dustCapturedPct = Math.round(ratio * 24);

  const perceivedComparison =
    canopyDensity >= 70
      ? 'Like stepping from a busy sidewalk into a quiet morning study'
      : canopyDensity >= 35
        ? 'Harsh tire hiss and brake dust noticeably softened'
        : 'Unbuffered street echo bouncing straight to upper windows';

  const foliageScale = 0.25 + ratio * 0.75;
  const foliageOpacity = canopyDensity === 0 ? 0.08 : 0.2 + ratio * 0.8;
  const postWaveOpacity = Math.max(0.14, 0.78 - ratio * 0.62);

  return (
    <article className="py-12 first:pt-4 border-b border-[#1D2D27]/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Narrative & Interactive Control Column */}
        <div className="lg:col-span-5">
          <p className="text-xs text-[#5A6B62] mb-2.5">
            01. The Quiet Filter <span aria-hidden="true">·</span> Street Acoustics &amp; Air
          </p>
          <h3 className="font-serif text-2xl sm:text-[1.75rem] leading-snug text-[#1D2D27] text-balance mb-3.5">
            A single mature street tree acts as a living acoustic curtain and dust trap outside your
            window.
          </h3>
          <p className="text-sm sm:text-base leading-relaxed text-[#42524A] mb-6">
            Hard brick and asphalt bounce traffic noise upward into second-story bedrooms. Thousands
            of overlapping leaves scatter mid- and high-frequency tire hum, while microscopic leaf
            hairs capture airborne brake and road dust before you breathe it indoors.
          </p>

          {/* Preset Quick Buttons */}
          <div className="flex items-center gap-1 p-1 bg-[#EBE6DC] rounded-lg w-fit mb-5">
            {[
              { label: 'Bare Curb', val: 0 },
              { label: 'Young Sapling', val: 40 },
              { label: 'Mature Canopy', val: 85 },
            ].map((preset) => {
              const isActive = Math.abs(canopyDensity - preset.val) <= 12;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setCanopyDensity(preset.val)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#FBF9F5] text-[#1D2D27] shadow-xs'
                      : 'text-[#4C5D54] hover:text-[#1D2D27]'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* Slider */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs mb-2">
              <label htmlFor="canopy-filter-slider" className="font-semibold text-[#1D2D27]">
                Curbside Canopy Density
              </label>
              <span className="font-mono tabular-nums text-[#4C5D54]">{canopyDensity}% foliage</span>
            </div>
            <input
              id="canopy-filter-slider"
              type="range"
              min={0}
              max={100}
              value={canopyDensity}
              onChange={(e) => setCanopyDensity(Number(e.target.value))}
              className="w-full calm-slider"
            />
          </div>

          {/* Human-Scale Metric Pair */}
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#1D2D27]/10">
            <div>
              <span className="block text-xs text-[#5A6B62] mb-1">Room Window Sound</span>
              <span className="font-mono text-2xl font-semibold tabular-nums text-[#1D2D27]">
                {windowDb} dB
              </span>
              <span className="block text-xs text-[#4C5D54] mt-0.5">
                {canopyDensity >= 65 ? 'Nearly half as loud' : 'Conversational traffic hum'}
              </span>
            </div>
            <div>
              <span className="block text-xs text-[#5A6B62] mb-1">Fine Street Dust Caught</span>
              <span className="font-mono text-2xl font-semibold tabular-nums text-[#1F3A2E]">
                −{dustCapturedPct}%
              </span>
              <span className="block text-xs text-[#4C5D54] mt-0.5">
                PM2.5 held on leaf surfaces
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Diagram Stage */}
        <div className="lg:col-span-7 bg-[#F3EFE6] border border-[#1D2D27]/10 rounded-2xl p-5 sm:p-6">
          <svg
            viewBox="0 0 580 300"
            role="img"
            aria-label={`Diagram showing traffic sound waves softening to ${windowDb} decibels and ${dustCapturedPct}% dust filtered before reaching an apartment window`}
            className="w-full h-auto block"
          >
            {/* Ground & Sidewalk Baseline */}
            <rect x={0} y={252} width={580} height={48} fill="#E6E0D4" rx={6} />
            <line x1={16} y1={252} x2={564} y2={252} stroke="#1D2D27" strokeOpacity={0.18} />

            {/* Left: Street Vehicle Source */}
            <g transform="translate(34, 198)">
              <rect x={0} y={18} width={76} height={26} rx={6} fill="#6F7A74" />
              <path d="M12 18 L22 4 L56 4 L66 18 Z" fill="#88938D" />
              <rect x={24} y={7} width={28} height={9} rx={2} fill="#FBF9F5" opacity={0.85} />
              <circle cx={18} cy={46} r={8} fill="#2B3732" />
              <circle cx={58} cy={46} r={8} fill="#2B3732" />
              <text x={38} y={74} textAnchor="middle" fontSize={11} fill="#4C5D54">
                Curb Traffic (68 dB)
              </text>
            </g>

            {/* Incoming Unfiltered Sound Arcs (Before Tree) */}
            <g stroke="#A84E32" fill="none" strokeLinecap="round">
              <path d="M128 215 Q142 195 128 175" strokeWidth={2.4} strokeOpacity={0.72} />
              <path d="M148 224 Q168 190 148 156" strokeWidth={2.2} strokeOpacity={0.62} />
              <path d="M168 232 Q194 185 168 138" strokeWidth={2} strokeOpacity={0.5} />
            </g>

            {/* Airborne Particulate Specks Before Canopy */}
            <g fill="#A84E32" opacity={0.65}>
              <circle cx={142} cy={166} r={2.5} />
              <circle cx={162} cy={184} r={2} />
              <circle cx={176} cy={152} r={2.8} />
              <circle cx={188} cy={196} r={2.2} />
              <circle cx={196} cy={138} r={2} />
            </g>

            {/* Center: Dynamic Street Tree & Hedge Canopy */}
            <g transform="translate(275, 252)">
              {/* Tree pit soil */}
              <rect x={-34} y={-4} width={68} height={8} rx={3} fill="#7B5E48" opacity={0.75} />
              {/* Trunk & Branches */}
              <path
                d="M0 0 L0 -128 M0 -82 L-28 -114 M0 -96 L28 -126 M0 -64 L20 -88"
                stroke="#5A4638"
                strokeWidth={canopyDensity === 0 ? 3 : 7}
                strokeLinecap="round"
                opacity={canopyDensity === 0 ? 0.3 : 0.9}
              />

              {/* Scaling Leaf Canopy Clusters */}
              <g
                transform={`translate(0, -132) scale(${foliageScale})`}
                opacity={foliageOpacity}
              >
                <circle cx={0} cy={-16} r={54} fill="#3F624D" />
                <circle cx={-42} cy={8} r={42} fill="#527760" />
                <circle cx={44} cy={6} r={44} fill="#4A6E58" />
                <circle cx={-18} cy={28} r={36} fill="#668B73" />
                <circle cx={24} cy={28} r={34} fill="#5C8069" />
              </g>

              {/* Understory Curb Shrubs */}
              <g transform={`scale(${0.2 + ratio * 0.8})`} opacity={foliageOpacity}>
                <ellipse cx={-34} cy={-8} rx={22} ry={14} fill="#5A7E67" />
                <ellipse cx={34} cy={-8} rx={22} ry={14} fill="#4D705A" />
              </g>

              <text x={0} y={24} textAnchor="middle" fontSize={11} fill="#1F3A2E" fontWeight={600}>
                {canopyDensity === 0 ? 'Empty Tree Pit' : 'Leaf Acoustic Buffer'}
              </text>
            </g>

            {/* Attenuated Sound Waves (After Canopy -> Toward Window) */}
            <g stroke="#3F624D" fill="none" strokeLinecap="round" opacity={postWaveOpacity}>
              <path d="M358 164 Q372 146 358 128" strokeWidth={1.6} strokeDasharray="4 4" />
              <path d="M388 158 Q404 136 388 114" strokeWidth={1.5} strokeDasharray="4 5" />
              <path d="M418 152 Q434 128 418 104" strokeWidth={1.3} strokeDasharray="3 6" />
            </g>

            {/* Remaining Dust Specks Reaching Window (fewer as canopy grows) */}
            <g fill="#A84E32" opacity={Math.max(0.08, 0.65 - ratio * 0.56)}>
              <circle cx={376} cy={142} r={2.2} />
              {canopyDensity < 75 && <circle cx={404} cy={126} r={2} />}
              {canopyDensity < 45 && <circle cx={426} cy={148} r={2.4} />}
              {canopyDensity < 25 && <circle cx={438} cy={118} r={2.1} />}
            </g>

            {/* Right: Limestone Apartment Facade & Open Second-Floor Window */}
            <g transform="translate(454, 44)">
              <rect
                x={0}
                y={0}
                width={102}
                height={208}
                rx={4}
                fill="#EAE4D8"
                stroke="#1D2D27"
                strokeOpacity={0.18}
              />
              {/* Second-story Open Window */}
              <rect
                x={22}
                y={34}
                width={58}
                height={74}
                rx={3}
                fill="#DCE6DF"
                stroke="#1F3A2E"
                strokeOpacity={0.35}
                strokeWidth={1.5}
              />
              {/* Warm interior lamp glow */}
              <circle cx={51} cy={68} r={14} fill="#F5E6C8" opacity={0.85} />
              <line x1={22} y1={72} x2={80} y2={72} stroke="#1F3A2E" strokeOpacity={0.25} />
              {/* Terracotta Sill Box */}
              <rect x={18} y={108} width={66} height={10} rx={2} fill="#B86B4B" />

              {/* Ground floor door */}
              <rect
                x={32}
                y={146}
                width={38}
                height={62}
                rx={2}
                fill="#D5CEC0"
                stroke="#1D2D27"
                strokeOpacity={0.16}
              />
              <text x={51} y={232} textAnchor="middle" fontSize={11} fill="#4C5D54">
                Your Room ({windowDb} dB)
              </text>
            </g>
          </svg>

          <p className="mt-3 pt-3 border-t border-[#1D2D27]/10 text-xs text-[#4C5D54]">
            <span className="font-semibold text-[#1D2D27]">Human-scale feel: </span>
            {perceivedComparison}.
          </p>
        </div>
      </div>
    </article>
  );
};
