import React, { useState } from 'react';

interface SurfaceProfile {
  id: string;
  label: string;
  offsetFromAirF: number;
  surfaceColor: string;
  comfortNote: string;
  pawSafety: string;
}

const SURFACES: SurfaceProfile[] = [
  {
    id: 'asphalt',
    label: 'Dark Asphalt',
    offsetFromAirF: 50,
    surfaceColor: '#505653',
    comfortNote: 'Stores intense solar heat and radiates warmth well past sunset',
    pawSafety: 'Uncomfortable for bare feet & dog paws',
  },
  {
    id: 'concrete',
    label: 'Bare Sidewalk',
    offsetFromAirF: 27,
    surfaceColor: '#B8B3A8',
    comfortNote: 'Reflects bright afternoon glare and warms leg-level air',
    pawSafety: 'Warm radiant glare on sunny blocks',
  },
  {
    id: 'sunlit-grass',
    label: 'Sunlit Lawn',
    offsetFromAirF: 5,
    surfaceColor: '#7D9B76',
    comfortNote: 'Evaporating moisture from blades prevents heat buildup',
    pawSafety: 'Gentle warmth underfoot',
  },
  {
    id: 'shaded-grass',
    label: 'Shaded Grass',
    offsetFromAirF: -9,
    surfaceColor: '#3F624D',
    comfortNote: 'Canopy blocks direct sun while living turf cools the breeze',
    pawSafety: 'Cool enough to sit and linger',
  },
];

export const MicroClimateStory: React.FC = () => {
  const [selectedSurfaceId, setSelectedSurfaceId] = useState<string>('asphalt');
  const [airTempF, setAirTempF] = useState<number>(88);

  const selectedSurface =
    SURFACES.find((s) => s.id === selectedSurfaceId) || SURFACES[0];
  const shadedGrassSurface = SURFACES[3];

  const selectedSurfaceTempF = airTempF + selectedSurface.offsetFromAirF;
  const shadedGrassTempF = airTempF + shadedGrassSurface.offsetFromAirF;
  const coolingGapF = selectedSurfaceTempF - shadedGrassTempF;

  // Map 60°F..155°F onto 0..160px mercury column height
  const toMercuryHeight = (temp: number) => {
    const clamped = Math.max(60, Math.min(155, temp));
    return Math.round(((clamped - 60) / (155 - 60)) * 156);
  };

  const selectedHeight = toMercuryHeight(selectedSurfaceTempF);
  const shadedHeight = toMercuryHeight(shadedGrassTempF);

  return (
    <article className="py-12 border-b border-[#1D2D27]/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Interactive Visual Thermometer Stage (Left on Desktop for Rhythm) */}
        <div className="lg:col-span-7 order-2 lg:order-1 bg-[#F3EFE6] border border-[#1D2D27]/10 rounded-2xl p-5 sm:p-6">
          <svg
            viewBox="0 0 580 300"
            role="img"
            aria-label={`Visual thermometer comparing ${selectedSurface.label} at ${selectedSurfaceTempF} degrees Fahrenheit against tree-shaded grass at ${shadedGrassTempF} degrees Fahrenheit`}
            className="w-full h-auto block"
          >
            {/* Subtle Temperature Scale Reference Lines */}
            {[
              { temp: 140, label: '140°F' },
              { temp: 110, label: '110°F' },
              { temp: 80, label: '80°F' },
            ].map((tick) => {
              const yPos = 224 - toMercuryHeight(tick.temp);
              return (
                <g key={tick.temp}>
                  <line
                    x1={56}
                    y1={yPos}
                    x2={530}
                    y2={yPos}
                    stroke="#1D2D27"
                    strokeOpacity={0.09}
                    strokeDasharray="3 4"
                  />
                  <text
                    x={46}
                    y={yPos + 4}
                    textAnchor="end"
                    fontSize={10}
                    fontFamily="IBM Plex Mono, monospace"
                    fill="#5A6B62"
                  >
                    {tick.label}
                  </text>
                </g>
              );
            })}

            {/* Left Thermometer Column: Selected Surface */}
            <g transform="translate(175, 0)">
              {/* Surface Patch Preview */}
              <rect
                x={-68}
                y={244}
                width={136}
                height={18}
                rx={4}
                fill={selectedSurface.surfaceColor}
              />

              {/* Thermometer Glass Tube */}
              <rect
                x={-14}
                y={52}
                width={28}
                height={176}
                rx={14}
                fill="#FBF9F5"
                stroke="#1D2D27"
                strokeOpacity={0.2}
                strokeWidth={1.5}
              />

              {/* Mercury Fill */}
              <rect
                x={-8}
                y={224 - selectedHeight}
                width={16}
                height={selectedHeight + 10}
                rx={8}
                fill={selectedSurfaceTempF > 105 ? '#B85D3B' : '#4A6E58'}
              />
              <circle
                cx={0}
                cy={232}
                r={16}
                fill={selectedSurfaceTempF > 105 ? '#B85D3B' : '#4A6E58'}
              />

              {/* Numeric Callout */}
              <text
                x={0}
                y={36}
                textAnchor="middle"
                fontSize={20}
                fontWeight={600}
                fontFamily="IBM Plex Mono, monospace"
                fill="#1D2D27"
              >
                {selectedSurfaceTempF}°F
              </text>
              <text
                x={0}
                y={280}
                textAnchor="middle"
                fontSize={12}
                fontWeight={600}
                fill="#1D2D27"
              >
                {selectedSurface.label}
              </text>
            </g>

            {/* Center Comparison Delta Callout */}
            <g transform="translate(295, 138)">
              <rect
                x={-52}
                y={-26}
                width={104}
                height={52}
                rx={10}
                fill="#FBF9F5"
                stroke="#1D2D27"
                strokeOpacity={0.12}
              />
              <text
                x={0}
                y={-3}
                textAnchor="middle"
                fontSize={15}
                fontWeight={600}
                fontFamily="IBM Plex Mono, monospace"
                fill="#1F3A2E"
              >
                {coolingGapF > 0 ? `−${coolingGapF}°F` : 'Same Cool'}
              </text>
              <text x={0} y={14} textAnchor="middle" fontSize={10} fill="#5A6B62">
                in tree shade
              </text>
            </g>

            {/* Right Thermometer Column: Shaded Grass Benchmark */}
            <g transform="translate(415, 0)">
              {/* Subtle Canopy Leaf Silhouette Overhead */}
              <path
                d="M-54 24 Q0 -4 54 24"
                stroke="#3F624D"
                strokeWidth={2}
                strokeOpacity={0.35}
                fill="none"
              />
              <rect x={-68} y={244} width={136} height={18} rx={4} fill="#3F624D" />

              {/* Thermometer Glass Tube */}
              <rect
                x={-14}
                y={52}
                width={28}
                height={176}
                rx={14}
                fill="#FBF9F5"
                stroke="#1D2D27"
                strokeOpacity={0.2}
                strokeWidth={1.5}
              />

              {/* Cool Sage Fill */}
              <rect
                x={-8}
                y={224 - shadedHeight}
                width={16}
                height={shadedHeight + 10}
                rx={8}
                fill="#3F624D"
              />
              <circle cx={0} cy={232} r={16} fill="#3F624D" />

              <text
                x={0}
                y={36}
                textAnchor="middle"
                fontSize={20}
                fontWeight={600}
                fontFamily="IBM Plex Mono, monospace"
                fill="#1F3A2E"
              >
                {shadedGrassTempF}°F
              </text>
              <text
                x={0}
                y={280}
                textAnchor="middle"
                fontSize={12}
                fontWeight={600}
                fill="#1F3A2E"
              >
                Tree-Shaded Grass
              </text>
            </g>
          </svg>

          <div className="mt-3 pt-3 border-t border-[#1D2D27]/10 flex flex-wrap items-center justify-between gap-2 text-xs text-[#4C5D54]">
            <span>
              <strong className="text-[#1D2D27]">{selectedSurface.label}:</strong>{' '}
              {selectedSurface.comfortNote}.
            </span>
            <span className="font-semibold text-[#1F3A2E]">{selectedSurface.pawSafety}</span>
          </div>
        </div>

        {/* Narrative & Controls Column */}
        <div className="lg:col-span-5 order-1 lg:order-2">
          <p className="text-xs text-[#5A6B62] mb-2.5">
            02. The Micro-Climate <span aria-hidden="true">·</span> Surface Touch &amp; Shade
          </p>
          <h3 className="font-serif text-2xl sm:text-[1.75rem] leading-snug text-[#1D2D27] text-balance mb-3.5">
            Two steps to the left, shaded grass can be nearly 60°F cooler than sunny asphalt.
          </h3>
          <p className="text-sm sm:text-base leading-relaxed text-[#42524A] mb-6">
            Weather apps report a single citywide air temperature—yet what your body feels on an
            errand depends on the surface beneath your shoes. Living leaves intercept sunlight and
            release cool water vapor like a natural evaporative breeze.
          </p>

          {/* Surface Selector Segmented Buttons */}
          <div className="mb-5">
            <span className="block text-xs font-semibold text-[#1D2D27] mb-2">
              Compare a street surface against shaded grass
            </span>
            <div className="flex flex-wrap gap-1.5 p-1 bg-[#EBE6DC] rounded-lg">
              {SURFACES.map((surface) => {
                const active = surface.id === selectedSurfaceId;
                return (
                  <button
                    key={surface.id}
                    type="button"
                    onClick={() => setSelectedSurfaceId(surface.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#FBF9F5] text-[#1D2D27] shadow-xs'
                        : 'text-[#4C5D54] hover:text-[#1D2D27]'
                    }`}
                  >
                    {surface.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Afternoon Air Temp Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <label htmlFor="air-temp-slider" className="font-semibold text-[#1D2D27]">
                Weather-App Air Temperature
              </label>
              <span className="font-mono tabular-nums text-[#4C5D54]">{airTempF}°F afternoon</span>
            </div>
            <input
              id="air-temp-slider"
              type="range"
              min={76}
              max={98}
              value={airTempF}
              onChange={(e) => setAirTempF(Number(e.target.value))}
              className="w-full calm-slider"
            />
          </div>
        </div>
      </div>
    </article>
  );
};
