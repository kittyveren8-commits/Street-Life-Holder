export interface RoutineOption {
  id: string;
  label: string;
  timeOfDay: string;
  habitTitle: string;
  smallShift: string;
  personalHeadline: string;
  personalDetail: string;
  earthHeadline: string;
  earthDetail: string;
  unitSingular: string;
  unitPlural: string;
  multiplierPerDay: number;
  secondaryMetricLabel: string;
  secondaryPerDay: number;
  secondaryUnit: string;
  defaultDaysPerWeek: number;
}

export interface ToolkitAction {
  id: string;
  tierIndex: '01' | '02' | '03';
  tierName: string;
  tierCadence: string;
  title: string;
  description: string;
  humanBenefit: string;
  ctaLabel: string;
  isShareCardTrigger?: boolean;
}

export interface ShareableStoryCard {
  id: string;
  numberLabel: string;
  title: string;
  statCallout: string;
  summary: string;
  takeaway: string;
}

export interface RegionStat {
  id: string;
  label: string;
  weeklyCount: number;
}

export interface CommunityNote {
  id: string;
  regionId: string;
  regionLabel: string;
  actionTitle: string;
  tierLabel: string;
  timestampIso: string;
}

export interface RippleApiResponse {
  totalWeeklyCount: number;
  regions: RegionStat[];
  recentNotes: CommunityNote[];
}
