import React, { useState } from 'react';
import { Send } from 'lucide-react';
import type { CommunityNote, RegionStat } from '../types/ecology';

interface CollectiveRippleSectionProps {
  totalWeeklyCount: number;
  regions: RegionStat[];
  recentNotes: CommunityNote[];
  selectedRegionId: string;
  onSelectRegion: (regionId: string) => void;
  onSubmitCustomNote: (noteText: string) => Promise<void>;
  isLoading: boolean;
}

function formatNoteTimestamp(iso: string): string {
  try {
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

export const CollectiveRippleSection: React.FC<CollectiveRippleSectionProps> = ({
  totalWeeklyCount,
  regions,
  recentNotes,
  selectedRegionId,
  onSelectRegion,
  onSubmitCustomNote,
  isLoading,
}) => {
  const [customNote, setCustomNote] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [justSubmitted, setJustSubmitted] = useState<boolean>(false);

  const selectedRegion = regions.find((r) => r.id === selectedRegionId) || null;
  const displayedCount = selectedRegion ? selectedRegion.weeklyCount : totalWeeklyCount;
  const filteredNotes = selectedRegion
    ? recentNotes.filter((n) => n.regionId === selectedRegion.id)
    : recentNotes;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customNote.trim();
    if (!trimmed || isSending) return;
    setIsSending(true);
    try {
      await onSubmitCustomNote(trimmed);
      setCustomNote('');
      setJustSubmitted(true);
      setTimeout(() => setJustSubmitted(false), 3000);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="community-ripple"
      className="py-20 md:py-28 bg-[#F3EFE6] border-b border-[#1D2D27]/10"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Honest Live Counter Starting Strictly at Zero */}
          <div className="lg:col-span-7">
            <p className="text-xs tracking-wide text-[#5A6B62] mb-3">
              Collective Ripple Log <span aria-hidden="true">·</span> Real Visitor Entries Only
            </p>

            <div className="mb-6">
              <div className="font-mono text-4xl sm:text-6xl font-semibold tabular-nums text-[#1F3A2E] tracking-tight mb-3">
                {isLoading ? '—' : displayedCount.toLocaleString()}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1D2D27] text-balance">
                {displayedCount === 0 ? (
                  <>
                    actions logged so far{' '}
                    {selectedRegion ? (
                      <>
                        in <span className="italic text-[#A84E32]">{selectedRegion.label}</span>
                      </>
                    ) : (
                      'on this live page'
                    )}
                    .
                  </>
                ) : (
                  <>
                    {displayedCount === 1 ? 'real action' : 'real actions'} logged on this site{' '}
                    {selectedRegion ? (
                      <>
                        in <span className="italic text-[#A84E32]">{selectedRegion.label}</span>
                      </>
                    ) : (
                      'across all regions'
                    )}
                    .
                  </>
                )}
              </h2>
            </div>

            <p className="text-base leading-relaxed text-[#42524A] max-w-[56ch] mb-8">
              Zero pre-filled numbers or invented stories. This counter starts at zero and only
              increments when someone actually logs a habit from the toolkit above or submits a
              real step here.
            </p>

            {/* Region Filter Buttons */}
            <div>
              <span className="block text-xs font-semibold text-[#1D2D27] mb-2.5">
                Filter or select your region before logging
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => onSelectRegion('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedRegionId === 'all'
                      ? 'bg-[#1F3A2E] text-[#FBF9F5] border-[#1F3A2E]'
                      : 'bg-[#FBF9F5] text-[#42524A] border-[#1D2D27]/12 hover:border-[#1D2D27]/35'
                  }`}
                >
                  All Regions ({totalWeeklyCount})
                </button>
                {regions.map((region) => {
                  const active = selectedRegionId === region.id;
                  return (
                    <button
                      key={region.id}
                      type="button"
                      onClick={() => onSelectRegion(region.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-[#1F3A2E] text-[#FBF9F5] border-[#1F3A2E]'
                          : 'bg-[#FBF9F5] text-[#42524A] border-[#1D2D27]/12 hover:border-[#1D2D27]/35'
                      }`}
                    >
                      {region.label} ({region.weeklyCount})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Log a Real Step + Timestamped Feed */}
          <div className="lg:col-span-5 bg-[#FBF9F5] border border-[#1D2D27]/10 rounded-2xl p-6 sm:p-7">
            <h3 className="font-serif text-xl text-[#1D2D27] mb-1.5">
              Log a real step you took today
            </h3>
            <p className="text-xs text-[#5A6B62] mb-4">
              Select your region on the left and record an actual observation or habit. Every entry
              is saved with a live timestamp.
            </p>

            <form onSubmit={handleFormSubmit} className="flex gap-2 mb-6">
              <label htmlFor="community-note-input" className="sr-only">
                Describe a real action or observation from today
              </label>
              <input
                id="community-note-input"
                type="text"
                maxLength={100}
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="What did you actually do or notice today?"
                className="flex-1 min-w-0 px-3.5 py-2.5 text-sm bg-[#F3EFE6] border border-[#1D2D27]/15 rounded-lg text-[#1D2D27] placeholder:text-[#75827B] focus:outline-2 focus:outline-[#1F3A2E]"
              />
              <button
                type="submit"
                disabled={!customNote.trim() || isSending}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#1F3A2E] text-[#FBF9F5] hover:bg-[#294B3C] disabled:opacity-50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Send className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Log Step</span>
              </button>
            </form>

            {justSubmitted && (
              <p className="text-xs font-semibold text-[#1F3A2E] mb-4">
                Logged with timestamp to the live store.
              </p>
            )}

            <div className="pt-4 border-t border-[#1D2D27]/10">
              <p className="text-xs font-semibold text-[#1D2D27] mb-3">
                Recorded visitor log
              </p>
              {filteredNotes.length === 0 ? (
                <p className="text-sm text-[#5A6B62] leading-relaxed py-2">
                  No actions have been logged{selectedRegion ? ` in ${selectedRegion.label}` : ''}{' '}
                  yet. Nothing is pre-populated—when someone logs a real step, it will appear here.
                </p>
              ) : (
                <ul className="divide-y divide-[#1D2D27]/10">
                  {filteredNotes.slice(0, 5).map((note) => (
                    <li key={note.id} className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm text-[#1D2D27] leading-snug mb-1">{note.actionTitle}</p>
                      <p className="text-xs text-[#5A6B62]">
                        {note.regionLabel} <span aria-hidden="true">·</span> {note.tierLabel}{' '}
                        <span aria-hidden="true">·</span> {formatNoteTimestamp(note.timestampIso)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
