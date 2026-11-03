/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MicroDataSection } from './components/MicroDataSection';
import { EditorialInterlude } from './components/EditorialInterlude';
import { CauseRippleSandbox } from './components/CauseRippleSandbox';
import { ActionToolkitSection } from './components/ActionToolkitSection';
import { CollectiveRippleSection } from './components/CollectiveRippleSection';
import { ShareCardModal } from './components/ShareCardModal';
import { Footer } from './components/Footer';
import type {
  CommunityNote,
  RegionStat,
  RippleApiResponse,
  ToolkitAction,
} from './types/ecology';

const STORAGE_COMPLETED_KEY = 'grounded_completed_actions_v1';

export default function App() {
  const [totalWeeklyCount, setTotalWeeklyCount] = useState<number>(0);
  const [regions, setRegions] = useState<RegionStat[]>([]);
  const [recentNotes, setRecentNotes] = useState<CommunityNote[]>([]);
  const [selectedRegionId, setSelectedRegionId] = useState<string>('all');
  const [isLoadingRipples, setIsLoadingRipples] = useState<boolean>(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_COMPLETED_KEY);
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    let active = true;
    const loadRipples = async () => {
      try {
        const res = await fetch('/api/ripples');
        if (!res.ok) throw new Error('Failed to load');
        const data = (await res.json()) as RippleApiResponse;
        if (active) {
          setTotalWeeklyCount(data.totalWeeklyCount);
          setRegions(data.regions);
          setRecentNotes(data.recentNotes);
        }
      } catch {
        // Fallback gracefully if API hasn't initialized yet
      } finally {
        if (active) setIsLoadingRipples(false);
      }
    };
    loadRipples();
    return () => {
      active = false;
    };
  }, []);

  const recordRippleOnServer = useCallback(
    async (actionTitle: string, tierLabel: string) => {
      const regionToPost =
        selectedRegionId !== 'all'
          ? selectedRegionId
          : regions[0]?.id || 'northeast-corridor';

      // Optimistic increment for instant <=200ms feedback
      setTotalWeeklyCount((prev) => prev + 1);

      try {
        const res = await fetch('/api/ripples', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            regionId: regionToPost,
            actionTitle,
            tierLabel,
          }),
        });
        if (res.ok) {
          const data = (await res.json()) as RippleApiResponse;
          setTotalWeeklyCount(data.totalWeeklyCount);
          setRegions(data.regions);
          setRecentNotes(data.recentNotes);
        }
      } catch {
        // Keep optimistic state if offline
      }
    },
    [selectedRegionId, regions]
  );

  const handleToggleToolkitAction = async (action: ToolkitAction) => {
    const updated = [...completedIds, action.id];
    setCompletedIds(updated);
    try {
      localStorage.setItem(STORAGE_COMPLETED_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage quota issues
    }
    await recordRippleOnServer(action.title, action.tierName);
  };

  const handleShareSuccess = (cardTitle: string) => {
    if (!completedIds.includes('systemic-share-card')) {
      const updated = [...completedIds, 'systemic-share-card'];
      setCompletedIds(updated);
      try {
        localStorage.setItem(STORAGE_COMPLETED_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage quota issues
      }
    }
    recordRippleOnServer(cardTitle, 'Systemic Push');
  };

  const handleJumpToToolkit = () => {
    const el = document.getElementById('action-toolkit');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1D2D27]">
      <Navbar onJumpToToolkit={handleJumpToToolkit} />

      <main className="flex-1">
        <HeroSection />
        <MicroDataSection />
        <EditorialInterlude />
        <CauseRippleSandbox onRecordRipple={recordRippleOnServer} />
        <ActionToolkitSection
          completedIds={completedIds}
          onToggleComplete={handleToggleToolkitAction}
          onOpenShareStudio={() => setIsShareModalOpen(true)}
        />
        <CollectiveRippleSection
          totalWeeklyCount={totalWeeklyCount}
          regions={regions}
          recentNotes={recentNotes}
          selectedRegionId={selectedRegionId}
          onSelectRegion={setSelectedRegionId}
          onSubmitCustomNote={(note) => recordRippleOnServer(note, 'Community Note')}
          isLoading={isLoadingRipples}
        />
      </main>

      <Footer />

      <ShareCardModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onSharedSuccess={handleShareSuccess}
      />
    </div>
  );
}
