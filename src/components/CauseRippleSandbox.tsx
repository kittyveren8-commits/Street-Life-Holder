import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { ROUTINE_OPTIONS } from '../data/ecologyContent';

interface CauseRippleSandboxProps {
  onRecordRipple: (actionTitle: string, tierLabel: string) => Promise<void>;
}

export const CauseRippleSandbox: React.FC<CauseRippleSandboxProps> = ({ onRecordRipple }) => {
  const [selectedId, setSelectedId] = useState<string>(ROUTINE_OPTIONS[0].id);
  const [daysByRoutine, setDaysByRoutine] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    for (const r of ROUTINE_OPTIONS) {
      map[r.id] = r.defaultDaysPerWeek;
    }
    return map;
  });
  const [loggedIds, setLoggedIds] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const activeRoutine =
    ROUTINE_OPTIONS.find((r) => r.id === selectedId) || ROUTINE_OPTIONS[0];
  const daysPerWeek = daysByRoutine[activeRoutine.id] ?? activeRoutine.defaultDaysPerWeek;

  const annualPrimaryCount = Math.round(daysPerWeek * activeRoutine.multiplierPerDay);
  const annualSecondaryValue =
    activeRoutine.secondaryPerDay % 1 === 0
      ? Math.round((daysPerWeek / activeRoutine.defaultDaysPerWeek) * activeRoutine.secondaryPerDay)
      : Number(
          (
            (daysPerWeek / activeRoutine.defaultDaysPerWeek) *
            activeRoutine.secondaryPerDay
          ).toFixed(1)
        );

  const isAlreadyLogged = Boolean(loggedIds[activeRoutine.id]);

  const handleCommitHabit = async () => {
    if (isAlreadyLogged || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onRecordRipple(
        `${activeRoutine.label}: ${activeRoutine.habitTitle} (${daysPerWeek}x/wk)`,
        'Daily Ripple'
      );
      setLoggedIds((prev) => ({ ...prev, [activeRoutine.id]: true }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="daily-ripple" className="py-20 md:py-28 border-b border-[#1D2D27]/10">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header & Routine Selector */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <p className="text-xs tracking-wide text-[#5A6B62] mb-3">
              Cause &amp; Ripple Sandbox <span aria-hidden="true">·</span> Everyday Routines
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1D2D27] text-balance mb-3">
              Pick one moment already in your day. See how a small shift ripples outward.
            </h2>
            <p className="text-base leading-relaxed text-[#42524A]">
              No carbon footprint spreadsheets—just one realistic tweak paired with what it does for
              your own body and your local watershed.
            </p>
          </div>

          {/* Interactive Routine Selector Tabs */}
          <div>
            <span className="block text-xs font-semibold text-[#1D2D27] mb-2">
              Choose an everyday routine
            </span>
            <div className="flex flex-wrap gap-1.5 p-1.5 bg-[#EBE6DC] rounded-xl">
              {ROUTINE_OPTIONS.map((routine) => {
                const active = routine.id === activeRoutine.id;
                return (
                  <button
                    key={routine.id}
                    type="button"
                    onClick={() => setSelectedId(routine.id)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#1F3A2E] text-[#FBF9F5]'
                        : 'text-[#42524A] hover:text-[#1D2D27]'
                    }`}
                  >
                    {routine.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Single-Elevation Interactive Sandbox Surface */}
        <div className="bg-[#F3EFE6] border border-[#1D2D27]/10 rounded-2xl p-6 sm:p-10">
          {/* Top Rhythm Control Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#1D2D27]/10">
            <div>
              <p className="text-xs text-[#5A6B62] mb-1">
                {activeRoutine.label} <span aria-hidden="true">·</span> {activeRoutine.timeOfDay}
              </p>
              <h3 className="font-serif text-xl sm:text-2xl text-[#1D2D27] text-balance">
                {activeRoutine.habitTitle}
              </h3>
            </div>

            <div className="w-full md:w-72 shrink-0">
              <div className="flex items-center justify-between text-xs mb-2">
                <label htmlFor="routine-days-slider" className="font-semibold text-[#1D2D27]">
                  Days per week (aim for easy)
                </label>
                <span className="font-mono font-semibold tabular-nums text-[#1F3A2E]">
                  {daysPerWeek} {daysPerWeek === 1 ? 'day' : 'days'} / wk
                </span>
              </div>
              <input
                id="routine-days-slider"
                type="range"
                min={1}
                max={7}
                value={daysPerWeek}
                onChange={(e) =>
                  setDaysByRoutine((prev) => ({
                    ...prev,
                    [activeRoutine.id]: Number(e.target.value),
                  }))
                }
                className="w-full calm-slider"
              />
            </div>
          </div>

          {/* 3-Step Cause -> Personal Health -> Cleaner Earth Chain */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8 border-b border-[#1D2D27]/10">
            <div>
              <p className="text-xs text-[#5A6B62] mb-2">
                01. Your Small Shift <span aria-hidden="true">·</span> Low Friction
              </p>
              <p className="font-semibold text-base text-[#1D2D27] mb-2">
                {daysPerWeek}x a week, not all-or-nothing
              </p>
              <p className="text-sm leading-relaxed text-[#42524A]">{activeRoutine.smallShift}</p>
            </div>

            <div className="lg:border-l lg:border-[#1D2D27]/10 lg:pl-8">
              <p className="text-xs text-[#5A6B62] mb-2">
                02. For Your Body &amp; Calm <span aria-hidden="true">·</span> Immediate
              </p>
              <p className="font-semibold text-base text-[#1D2D27] mb-2">
                {activeRoutine.personalHeadline}
              </p>
              <p className="text-sm leading-relaxed text-[#42524A]">
                {activeRoutine.personalDetail}
              </p>
            </div>

            <div className="lg:border-l lg:border-[#1D2D27]/10 lg:pl-8">
              <p className="text-xs text-[#5A6B62] mb-2">
                03. For Your Local Earth <span aria-hidden="true">·</span> 12-Month Ripple
              </p>
              <p className="font-semibold text-base text-[#1F3A2E] mb-2">
                {activeRoutine.earthHeadline}
              </p>
              <p className="text-sm leading-relaxed text-[#42524A]">{activeRoutine.earthDetail}</p>
            </div>
          </div>

          {/* Satisfying Visual Annual Counters + Action Button */}
          <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex flex-wrap items-baseline gap-8 sm:gap-12">
              <div>
                <span className="block text-xs text-[#5A6B62] mb-1">1-Year Neighborhood Tally</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-3xl sm:text-4xl font-semibold tabular-nums text-[#1D2D27]">
                    {annualPrimaryCount.toLocaleString()}
                  </span>
                  <span className="text-sm text-[#42524A]">
                    {annualPrimaryCount === 1
                      ? activeRoutine.unitSingular
                      : activeRoutine.unitPlural}
                  </span>
                </div>
              </div>

              <div>
                <span className="block text-xs text-[#5A6B62] mb-1">
                  {activeRoutine.secondaryMetricLabel}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-2xl sm:text-3xl font-semibold tabular-nums text-[#1F3A2E]">
                    {annualSecondaryValue.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#42524A]">{activeRoutine.secondaryUnit}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCommitHabit}
              disabled={isAlreadyLogged || isSubmitting}
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                isAlreadyLogged
                  ? 'bg-[#DCE5DD] text-[#1F3A2E] cursor-default'
                  : 'bg-[#A84E32] text-[#FBF9F5] hover:bg-[#914128]'
              }`}
            >
              {isAlreadyLogged ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Added to Weekly Ripple</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  <span>Try This Rhythm ({daysPerWeek}x/wk)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
