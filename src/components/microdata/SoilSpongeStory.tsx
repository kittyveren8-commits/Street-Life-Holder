import React, { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export const SoilSpongeStory: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [rainMode, setRainMode] = useState<'gentle' | 'cloudburst'>('cloudburst');
  // Continuous 0..1 progress across a 5000ms (5-second) loop
  const [loopProgress, setLoopProgress] = useState<number>(0.35);

  useEffect(() => {
    if (!isPlaying) return;

    let frameId: number;
    const loopDurationMs = 5000;
    let startTimestamp: number | null = null;
    const initialOffset = loopProgress * loopDurationMs;

    const tick = (now: number) => {
      if (startTimestamp === null) {
        startTimestamp = now - initialOffset;
      }
      const elapsed = (now - startTimestamp) % loopDurationMs;
      setLoopProgress(elapsed / loopDurationMs);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying]);

  const dropOffsets = rainMode === 'cloudburst' ? [0, 0.2, 0.4, 0.6, 0.8] : [0, 0.33, 0.66];
  const concreteRunoffLevel =
    rainMode === 'cloudburst'
      ? 10 + Math.sin(loopProgress * Math.PI) * 14
      : 6 + Math.sin(loopProgress * Math.PI) * 7;

  const spongeMoistureGlow = 0.25 + Math.sin(loopProgress * Math.PI) * 0.45;
  const elapsedSeconds = (loopProgress * 5).toFixed(1);

  return (
    <article className="pt-12 pb-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Narrative & Controls */}
        <div className="lg:col-span-5">
          <p className="text-xs text-[#5A6B62] mb-2.5">
            03. The Soil Sponge <span aria-hidden="true">·</span> 5-Second Rain Cycle
          </p>
          <h3 className="font-serif text-2xl sm:text-[1.75rem] leading-snug text-[#1D2D27] text-balance mb-3.5">
            Healthy neighborhood soil drinks sudden downpours like a honeycomb sponge.
          </h3>
          <p className="text-sm sm:text-base leading-relaxed text-[#42524A] mb-6">
            Packed dirt and sealed concrete shed nearly 90% of a summer cloudburst straight into
            curb drains, creating ankle-deep crosswalk puddles. Soil rich with roots, compost, and
            earthworm channels pulls rainwater deep underground—cooling tree roots for weeks.
          </p>

          {/* Controls: Rain Intensity + Play/Pause 5s Loop */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex items-center gap-1 p-1 bg-[#EBE6DC] rounded-lg">
              <button
                type="button"
                onClick={() => setRainMode('gentle')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                  rainMode === 'gentle'
                    ? 'bg-[#FBF9F5] text-[#1D2D27] shadow-xs'
                    : 'text-[#4C5D54] hover:text-[#1D2D27]'
                }`}
              >
                Morning Shower
              </button>
              <button
                type="button"
                onClick={() => setRainMode('cloudburst')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                  rainMode === 'cloudburst'
                    ? 'bg-[#FBF9F5] text-[#1D2D27] shadow-xs'
                    : 'text-[#4C5D54] hover:text-[#1D2D27]'
                }`}
              >
                Summer Cloudburst
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-[#1D2D27]/15 bg-[#FBF9F5] text-[#1D2D27] hover:border-[#1F3A2E] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Pause 5s Loop</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Resume 5s Loop</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#1D2D27]/10">
            <div>
              <span className="block text-xs text-[#5A6B62] mb-1">Packed Concrete</span>
              <span className="font-mono text-2xl font-semibold tabular-nums text-[#8C4A32]">
                90% runoff
              </span>
              <span className="block text-xs text-[#4C5D54] mt-0.5">
                Rushes into storm grates
              </span>
            </div>
            <div>
              <span className="block text-xs text-[#5A6B62] mb-1">Living Garden Soil</span>
              <span className="font-mono text-2xl font-semibold tabular-nums text-[#1F3A2E]">
                85% soaked in
              </span>
              <span className="block text-xs text-[#4C5D54] mt-0.5">
                20,000 gal/acre per +1% humus
              </span>
            </div>
          </div>
        </div>

        {/* 5-Second Looping Micro-Animation Split Stage */}
        <div className="lg:col-span-7 bg-[#F3EFE6] border border-[#1D2D27]/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between text-xs text-[#5A6B62] mb-3">
            <span>Side-by-Side Curb Cross-Section</span>
            <span className="font-mono tabular-nums">{elapsedSeconds}s / 5.0s cycle</span>
          </div>

          <svg
            viewBox="0 0 580 290"
            role="img"
            aria-label="5-second looping cross-section animation comparing stormwater pooling on packed concrete versus soaking into porous living soil"
            className="w-full h-auto block"
          >
            {/* Left Panel: Packed Concrete & Compacted Subbase */}
            <g transform="translate(14, 10)">
              <rect x={0} y={0} width={264} height={254} rx={10} fill="#EAE5DB" />
              <text x={16} y={24} fontSize={12} fontWeight={600} fill="#1D2D27">
                Packed Concrete
              </text>
              <text x={248} y={24} textAnchor="end" fontSize={11} fill="#8C4A32" fontWeight={600}>
                Pools &amp; Floods
              </text>

              {/* Falling Raindrops */}
              {dropOffsets.map((offset, idx) => {
                const p = (loopProgress + offset) % 1;
                const xBase = 42 + idx * 46;
                const yRain = 38 + p * 82;
                return (
                  <line
                    key={`left-drop-${idx}`}
                    x1={xBase}
                    y1={yRain}
                    x2={xBase - 3}
                    y2={yRain + 11}
                    stroke="#4B7B8B"
                    strokeWidth={2}
                    strokeLinecap="round"
                    opacity={p < 0.92 ? 0.75 : 0}
                  />
                );
              })}

              {/* Standing Surface Puddle / Runoff Sheet */}
              <rect
                x={8}
                y={126 - concreteRunoffLevel}
                width={248}
                height={concreteRunoffLevel}
                rx={3}
                fill="#5A8D9F"
                opacity={0.55}
              />

              {/* Horizontal Runoff Arrows Toward Storm Drain */}
              <g
                transform={`translate(${(loopProgress * 36) % 28}, 0)`}
                stroke="#356576"
                strokeWidth={1.6}
                fill="none"
                strokeLinecap="round"
              >
                <path d="M36 118 L64 118 L59 114" />
                <path d="M110 118 L138 118 L133 114" />
                <path d="M180 118 L208 118 L203 114" />
              </g>

              {/* Impervious Concrete Slab */}
              <rect x={8} y={126} width={248} height={26} rx={2} fill="#9A9890" />
              {/* Storm Grate Notch on Right Edge */}
              <rect x={224} y={126} width={28} height={10} fill="#464A48" />

              {/* Dry Compacted Subsoil Beneath (No Water Reaching Roots) */}
              <rect x={8} y={152} width={248} height={94} rx={4} fill="#B8AC99" />
              <text x={132} y={204} textAnchor="middle" fontSize={11} fill="#5C5346">
                Dry, compacted dirt beneath slab
              </text>
            </g>

            {/* Right Panel: Healthy Living Soil Sponge */}
            <g transform="translate(302, 10)">
              <rect x={0} y={0} width={264} height={254} rx={10} fill="#E5ECE6" />
              <text x={16} y={24} fontSize={12} fontWeight={600} fill="#1F3A2E">
                Healthy Living Soil
              </text>
              <text x={248} y={24} textAnchor="end" fontSize={11} fill="#1F3A2E" fontWeight={600}>
                Drinks &amp; Filters
              </text>

              {/* Falling Raindrops */}
              {dropOffsets.map((offset, idx) => {
                const p = (loopProgress + offset) % 1;
                const xBase = 44 + idx * 46;
                const yRain = 38 + p * 78;
                return (
                  <line
                    key={`right-drop-${idx}`}
                    x1={xBase}
                    y1={yRain}
                    x2={xBase - 3}
                    y2={yRain + 11}
                    stroke="#4B7B8B"
                    strokeWidth={2}
                    strokeLinecap="round"
                    opacity={p < 0.9 ? 0.75 : 0}
                  />
                );
              })}

              {/* Native Clover & Grasses on Surface */}
              <g stroke="#3F624D" strokeWidth={2.2} strokeLinecap="round" fill="none">
                <path d="M44 126 Q38 106 32 98" />
                <path d="M48 126 Q54 102 62 96" />
                <path d="M126 126 Q120 100 112 92" />
                <path d="M132 126 Q138 104 146 98" />
                <path d="M206 126 Q200 104 194 96" />
                <path d="M212 126 Q218 106 226 100" />
              </g>

              {/* Rich Porous Humus Top Layer */}
              <rect x={8} y={124} width={248} height={22} rx={3} fill="#594433" />

              {/* Deep Sponge Soil Matrix */}
              <rect x={8} y={146} width={248} height={100} rx={4} fill="#6E5541" />

              {/* Cool Underground Moisture Recharge Glow */}
              <rect
                x={14}
                y={192}
                width={236}
                height={48}
                rx={6}
                fill="#5A8D9F"
                opacity={spongeMoistureGlow}
              />

              {/* Branching Root Channels */}
              <g stroke="#BC9F82" strokeWidth={1.6} fill="none" strokeLinecap="round" opacity={0.75}>
                <path d="M46 126 Q42 158 30 186 M44 150 Q58 172 66 196" />
                <path d="M130 126 Q126 164 114 202 M128 154 Q146 178 154 206" />
                <path d="M208 126 Q204 160 192 194 M206 152 Q222 174 230 198" />
              </g>

              {/* Percolating Water Droplets Traveling Gently Down Soil Pores */}
              {[0, 0.25, 0.5, 0.75].map((offset, idx) => {
                const p = (loopProgress + offset) % 1;
                const cx = 56 + idx * 52;
                const cy = 132 + p * 96;
                return (
                  <circle
                    key={`pore-drop-${idx}`}
                    cx={cx}
                    cy={cy}
                    r={3.5}
                    fill="#8AC4D6"
                    opacity={0.85 - p * 0.45}
                  />
                );
              })}

              <text x={132} y={232} textAnchor="middle" fontSize={11} fill="#FBF9F5">
                Stored in cool root &amp; groundwater pores
              </text>
            </g>

            {/* Thin 5-Second Loop Progress Bar at Base */}
            <rect x={14} y={276} width={552} height={4} rx={2} fill="#DED8CC" />
            <rect
              x={14}
              y={276}
              width={Math.max(8, Math.round(552 * loopProgress))}
              height={4}
              rx={2}
              fill="#1F3A2E"
            />
          </svg>
        </div>
      </div>
    </article>
  );
};
