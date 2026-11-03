import heroConcreteImg from '../assets/images/hero_street_concrete_1793084615098.jpg';
import heroCanopyImg from '../assets/images/hero_street_canopy_1793084615502.jpg';
import editorialCanopyImg from '../assets/images/editorial_dappled_canopy_1793084616668.jpg';
import editorialSoilImg from '../assets/images/editorial_healthy_soil_garden_1793084617539.jpg';
import type { RoutineOption, ShareableStoryCard, ToolkitAction } from '../types/ecology';

export const VISUAL_ASSETS = {
  heroConcrete: heroConcreteImg,
  heroCanopy: heroCanopyImg,
  editorialCanopy: editorialCanopyImg,
  editorialSoil: editorialSoilImg,
};

export const ROUTINE_OPTIONS: RoutineOption[] = [
  {
    id: 'hydration',
    label: 'Daily Hydration',
    timeOfDay: 'All-Day Rhythm',
    habitTitle: 'Refill one steel or glass bottle before heading out',
    smallShift: 'Keep a filled bottle beside your keys instead of buying grab-and-go plastic water.',
    personalHeadline: 'Cooler water, fewer microplastics in your sip',
    personalDetail:
      'Insulated stainless steel keeps tap water crisp for 12 hours and avoids heat-triggered plastic shedding from bottled water.',
    earthHeadline: 'Keeps plastic fragments out of neighborhood waterways',
    earthDetail:
      'Fewer single-use bottles circulating through street bins means cleaner storm drains, creeks, and municipal drinking watersheds.',
    unitSingular: 'single-use bottle spared',
    unitPlural: 'single-use bottles spared',
    multiplierPerDay: 52,
    secondaryMetricLabel: 'Tap water savings',
    secondaryPerDay: 115,
    secondaryUnit: 'saved / yr ($)',
    defaultDaysPerWeek: 4,
  },
  {
    id: 'morning-coffee',
    label: 'Morning Coffee',
    timeOfDay: '8:00 AM Ritual',
    habitTitle: 'Hand your barista a ceramic-lined mug—or pause five minutes for "for-here" porcelain',
    smallShift: 'Swap disposable plastic-lined paper cups on your regular cafe mornings.',
    personalHeadline: 'Pure roast flavor and an unhurried five-minute reset',
    personalDetail:
      'Paper takeout cups are lined with thin polyethylene film that meets boiling espresso. Ceramic preserves aroma and invites a slower breath.',
    earthHeadline: 'Lightens street litter and protects mature pulpwood forests',
    earthDetail:
      'Plastic-coated cups rarely pulp cleanly in standard recycling. Reusing one cup keeps lined waste out of local parks and landfills.',
    unitSingular: 'lined takeout cup skipped',
    unitPlural: 'lined takeout cups skipped',
    multiplierPerDay: 52,
    secondaryMetricLabel: 'Calm cafe minutes reclaimed',
    secondaryPerDay: 260,
    secondaryUnit: 'mins / yr',
    defaultDaysPerWeek: 4,
  },
  {
    id: 'commute',
    label: 'Morning Commute',
    timeOfDay: '8:45 AM Transit',
    habitTitle: 'Step off one stop early—or route your walk down a tree-lined block',
    smallShift: 'Trade ten minutes of bumper-to-bumper exhaust or crowded transfers for a shaded street walk.',
    personalHeadline: 'Measurably steadier heart rate and sharper morning focus',
    personalDetail:
      'Ten minutes beneath mature street canopy lowers perceived traffic noise and steadies morning cortisol before you open your inbox.',
    earthHeadline: 'Zero tailpipe dust where neighbors live and walk',
    earthDetail:
      'Every short car hop or idling drop-off replaced by foot or bike cuts curb-level nitrogen oxides and brake dust right at breathing height.',
    unitSingular: 'shaded neighborhood walk',
    unitPlural: 'shaded neighborhood walks',
    multiplierPerDay: 52,
    secondaryMetricLabel: 'Outdoor movement gained',
    secondaryPerDay: 8.6,
    secondaryUnit: 'hours / yr',
    defaultDaysPerWeek: 3,
  },
  {
    id: 'grocery-trip',
    label: 'Grocery Run',
    timeOfDay: 'Midweek Market',
    habitTitle: 'Skip thin produce bags for whole apples, citrus, and hardy greens',
    smallShift: 'Place washable produce straight into your basket and rinse with cool water at home.',
    personalHeadline: 'Fresher crisper drawers without trapped condensation',
    personalDetail:
      'Sealed thin film traps ethylene gas and moisture that wilt herbs early. Breathable cotton towels keep greens crisp days longer.',
    earthHeadline: 'Stops wind-blown film from tangling in street trees and creeks',
    earthDetail:
      'Lightweight produce film is the #1 material blown out of collection trucks into neighborhood branches and urban streams.',
    unitSingular: 'film produce bag avoided',
    unitPlural: 'film produce bags avoided',
    multiplierPerDay: 104,
    secondaryMetricLabel: 'Less food spoilage',
    secondaryPerDay: 18,
    secondaryUnit: 'lbs saved / yr',
    defaultDaysPerWeek: 2,
  },
];

export const TOOLKIT_ACTIONS: ToolkitAction[] = [
  // Tier 01: Zero Effort (Observation)
  {
    id: 'observe-birds',
    tierIndex: '01',
    tierName: 'Zero Effort',
    tierCadence: 'Observation · 30 Seconds',
    title: 'Notice 3 native birds or insects on your block today',
    description:
      'Pause by a street tree, courtyard hedge, or windowsill and listen for three distinct calls before checking your phone.',
    humanBenefit: 'Brief sensory attention to birdsong restores directed mental focus for hours.',
    ctaLabel: 'I Noticed Today',
  },
  {
    id: 'observe-air',
    tierIndex: '01',
    tierName: 'Zero Effort',
    tierCadence: 'Observation · 1 Minute',
    title: 'Check your local air index and air out your room after rain',
    description:
      'Rain washes suspended dust from neighborhood air. Crack a window for ten minutes right after a shower for crisp indoor airflow.',
    humanBenefit: 'Lowers indoor CO2 buildup that causes mid-afternoon grogginess.',
    ctaLabel: 'Tried This Today',
  },
  {
    id: 'observe-shade',
    tierIndex: '01',
    tierName: 'Zero Effort',
    tierCadence: 'Observation · Next Walk',
    title: 'Step from sunlit pavement onto tree shade and feel the drop',
    description:
      'On your next afternoon errand, pause where a mature canopy crosses the sidewalk and notice the instant radiant cooling.',
    humanBenefit: 'Builds intuitive awareness of how greenery protects neighborhood comfort.',
    ctaLabel: 'Felt the Difference',
  },

  // Tier 02: 5-Minute Habit
  {
    id: 'habit-compost',
    tierIndex: '02',
    tierName: '5-Minute Habit',
    tierCadence: 'Gentle Routine · Kitchen',
    title: 'Keep a small ceramic bowl for coffee grounds and fruit peels',
    description:
      'Tuck a lidded stoneware crock on the counter or in the freezer, then drop scraps at a weekend farmers’ market or garden bin.',
    humanBenefit: 'Keeps kitchen trash odor-free while building sponge-like local soil.',
    ctaLabel: 'Add to My Week',
  },
  {
    id: 'habit-balcony-pot',
    tierIndex: '02',
    tierName: '5-Minute Habit',
    tierCadence: 'Gentle Routine · Windowsill',
    title: 'Plant one terracotta pot of native thyme, clover, or coneflower',
    description:
      'Even a fourth-floor sill or stoop planter acts as a stepping-stone cafe for native bees moving between city parks.',
    humanBenefit: 'Tending soil microbes and fragrant herbs offers a grounding midday break.',
    ctaLabel: 'Planting One Pot',
  },
  {
    id: 'habit-cleanup',
    tierIndex: '02',
    tierName: '5-Minute Habit',
    tierCadence: 'Gentle Routine · Curbside',
    title: 'Clear five stray wrappers or matted leaves from your corner storm grate',
    description:
      'Keeping one curb inlet or tree pit clear before rain lets water soak into soil beds rather than puddling across crosswalks.',
    humanBenefit: 'Dryer walkways for neighbors and cleaner local creeks downstream.',
    ctaLabel: 'Count Me In',
  },

  // Tier 03: Systemic Push
  {
    id: 'systemic-share-card',
    tierIndex: '03',
    tierName: 'Systemic Push',
    tierCadence: 'Shared Momentum · 2 Minutes',
    title: 'Share a calm Micro-Data Story Card with a neighbor or group chat',
    description:
      'People protect what they find fascinating. Pass along a human-scale insight on street trees, shade, or living soil.',
    humanBenefit: 'Sparks curiosity without guilt—shifting neighborhood norms gently.',
    ctaLabel: 'Create Story Card',
    isShareCardTrigger: true,
  },
  {
    id: 'systemic-street-tree',
    tierIndex: '03',
    tierName: 'Systemic Push',
    tierCadence: 'Shared Momentum · Local',
    title: 'Request a free municipal street tree for an empty curb pit',
    description:
      'Most city forestry departments plant and mulch curb trees at zero cost when a resident submits a 311 address pin.',
    humanBenefit: 'Adds decades of window-height cooling and quieter sleep for the whole block.',
    ctaLabel: 'Pledge a Request',
  },
  {
    id: 'systemic-park-hour',
    tierIndex: '03',
    tierName: 'Systemic Push',
    tierCadence: 'Shared Momentum · Monthly',
    title: 'Join one Saturday morning park mulching or trail stewardship hour',
    description:
      'Local friends-of-the-park groups host low-key 60-minute mornings spreading woodchips around young trees.',
    humanBenefit: 'Turns solo eco-worry into relaxed neighborhood connection outdoors.',
    ctaLabel: 'Joining Next Month',
  },
];

export const SHAREABLE_STORY_CARDS: ShareableStoryCard[] = [
  {
    id: 'card-quiet-filter',
    numberLabel: 'Field Note 01 · Acoustic & Air Canopy',
    title: 'One mature street tree softens street noise by up to 9 decibels.',
    statCallout: '−9 dB sound · −24% street dust at window height',
    summary:
      'To the human ear, a 9 to 10 dB drop makes busy curb traffic sound nearly half as loud—while microscopic leaf hairs trap fine brake and road dust before it drifts indoors.',
    takeaway: 'Shaded streets aren’t scenery; they are quiet lungs outside our windows.',
  },
  {
    id: 'card-micro-climate',
    numberLabel: 'Field Note 02 · Radiant Comfort',
    title: 'Shaded grass stays up to 59°F cooler than bare asphalt on the same block.',
    statCallout: '138°F bare asphalt vs. 79°F shaded grass',
    summary:
      'On an 88°F summer afternoon, dark pavement stores and re-radiates heat well into the evening, while tree shade and transpiring turf keep walkways cool enough to linger.',
    takeaway: 'Every pocket of green cover turns a hot corridor into a breathable rest stop.',
  },
  {
    id: 'card-soil-sponge',
    numberLabel: 'Field Note 03 · Living Soil',
    title: 'Just 1% more organic matter helps an acre of soil hold 20,000 gallons of rain.',
    statCallout: '85% rain absorbed vs. 10% on sealed concrete',
    summary:
      'Healthy soil isn’t dirt—it’s an airy honeycomb of roots, fungi, and earthworm channels that drinks sudden cloudbursts so crosswalks stay dry and creeks run clear.',
    takeaway: 'Composting kitchen scraps directly rebuilds the sponge beneath our towns.',
  },
];
