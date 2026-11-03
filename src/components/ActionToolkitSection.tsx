import React, { useState } from 'react';
import { Check, Share2 } from 'lucide-react';
import { TOOLKIT_ACTIONS } from '../data/ecologyContent';
import type { ToolkitAction } from '../types/ecology';

interface ActionToolkitSectionProps {
  completedIds: string[];
  onToggleComplete: (action: ToolkitAction) => Promise<void>;
  onOpenShareStudio: () => void;
}

export const ActionToolkitSection: React.FC<ActionToolkitSectionProps> = ({
  completedIds,
  onToggleComplete,
  onOpenShareStudio,
}) => {
  const [tierFilter, setTierFilter] = useState<'all' | '01' | '02' | '03'>('all');
  const [busyId, setBusyId] = useState<string | null>(null);

  const visibleActions =
    tierFilter === 'all'
      ? TOOLKIT_ACTIONS
      : TOOLKIT_ACTIONS.filter((a) => a.tierIndex === tierFilter);

  const handleCardAction = async (action: ToolkitAction) => {
    if (action.isShareCardTrigger) {
      onOpenShareStudio();
      return;
    }
    if (completedIds.includes(action.id) || busyId === action.id) return;
    setBusyId(action.id);
    try {
      await onToggleComplete(action);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <section id="action-toolkit" className="py-20 md:py-28 border-b border-[#1D2D27]/10">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Intro & Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs tracking-wide text-[#5A6B62] mb-3">
              The 3-Tier Action Toolkit <span aria-hidden="true">·</span> Anti-Overwhelm Framework
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1D2D27] text-balance mb-3">
              Start where your energy actually is today.
            </h2>
            <p className="text-base leading-relaxed text-[#42524A]">
              Busy week? Simply noticing three neighborhood birds builds real ecological attention.
              Have five spare minutes or an extra nudge to give? Step up a tier whenever you feel
              ready.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-[#EBE6DC] rounded-xl w-fit">
            {[
              { key: 'all', label: 'All Three Tiers' },
              { key: '01', label: '01. Zero Effort' },
              { key: '02', label: '02. 5-Minute Habit' },
              { key: '03', label: '03. Systemic Push' },
            ].map((tab) => {
              const active = tierFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setTierFilter(tab.key as 'all' | '01' | '02' | '03')}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#FBF9F5] text-[#1D2D27] shadow-xs'
                      : 'text-[#4C5D54] hover:text-[#1D2D27]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tier Overview Strip when viewing All */}
        {tierFilter === 'all' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 mb-8 border-b border-[#1D2D27]/10">
            <div>
              <p className="font-serif text-lg text-[#1D2D27]">01. Zero Effort (Observation)</p>
              <p className="text-xs text-[#5A6B62] mt-1">
                No gear, no cost—just tuning your senses to the living block around you.
              </p>
            </div>
            <div>
              <p className="font-serif text-lg text-[#1D2D27]">02. 5-Minute Habit</p>
              <p className="text-xs text-[#5A6B62] mt-1">
                Tactile, low-effort routines for kitchen counters, balconies, and corners.
              </p>
            </div>
            <div>
              <p className="font-serif text-lg text-[#1D2D27]">03. Systemic Push</p>
              <p className="text-xs text-[#5A6B62] mt-1">
                Gentle nudges that multiply shade, soil, and curiosity across your whole street.
              </p>
            </div>
          </div>
        )}

        {/* Action Cards Grid (Single-Elevation, Zero Pill Badges) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleActions.map((action) => {
            const done = completedIds.includes(action.id);
            return (
              <article
                key={action.id}
                className="flex flex-col justify-between bg-[#F3EFE6] border border-[#1D2D27]/10 rounded-2xl p-6"
              >
                <div>
                  {/* Quiet Unboxed Metadata */}
                  <p className="text-xs text-[#5A6B62] mb-3">
                    {action.tierIndex}. {action.tierName} <span aria-hidden="true">·</span>{' '}
                    {action.tierCadence}
                  </p>

                  <h3 className="font-serif text-xl leading-snug text-[#1D2D27] mb-3">
                    {action.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-[#42524A] mb-5">
                    {action.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1D2D27]/10">
                  <p className="text-xs text-[#4C5D54] mb-4">
                    <span className="font-semibold text-[#1D2D27]">Personal lift: </span>
                    {action.humanBenefit}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleCardAction(action)}
                    disabled={done || busyId === action.id}
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                      done
                        ? 'bg-[#DCE5DD] text-[#1F3A2E] cursor-default'
                        : action.isShareCardTrigger
                          ? 'bg-[#A84E32] text-[#FBF9F5] hover:bg-[#914128]'
                          : 'bg-[#1F3A2E] text-[#FBF9F5] hover:bg-[#294B3C]'
                    }`}
                  >
                    {done ? (
                      <>
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Recorded in This Week’s Ripple</span>
                      </>
                    ) : action.isShareCardTrigger ? (
                      <>
                        <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{action.ctaLabel}</span>
                      </>
                    ) : (
                      <span>{busyId === action.id ? 'Recording...' : action.ctaLabel}</span>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
