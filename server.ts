import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface RegionStat {
  id: string;
  label: string;
  weeklyCount: number;
}

interface CommunityNote {
  id: string;
  regionId: string;
  regionLabel: string;
  actionTitle: string;
  tierLabel: string;
  timestampIso: string;
}

interface RippleStore {
  regions: RegionStat[];
  recentNotes: CommunityNote[];
}

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'ripples.json');

const INITIAL_STORE: RippleStore = {
  regions: [
    { id: 'pacific-northwest', label: 'Pacific Northwest', weeklyCount: 0 },
    { id: 'midwest-lakes', label: 'Midwest & Great Lakes', weeklyCount: 0 },
    { id: 'northeast-corridor', label: 'Northeast Corridor', weeklyCount: 0 },
    { id: 'california-coast', label: 'California Coast', weeklyCount: 0 },
    { id: 'southwest-mountain', label: 'Southwest & Mountain', weeklyCount: 0 },
    { id: 'southeast-piedmont', label: 'Southeast Piedmont', weeklyCount: 0 },
  ],
  recentNotes: [],
};

async function readStore(): Promise<RippleStore> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw) as RippleStore;
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(INITIAL_STORE, null, 2), 'utf-8');
    return structuredClone(INITIAL_STORE);
  }
}

async function writeStore(store: RippleStore): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.get('/api/ripples', async (_req, res) => {
    try {
      const store = await readStore();
      const totalWeeklyCount = store.regions.reduce((sum, r) => sum + r.weeklyCount, 0);
      res.json({
        totalWeeklyCount,
        regions: store.regions,
        recentNotes: store.recentNotes.slice(0, 8),
      });
    } catch (error) {
      console.error('Failed to read ripple store:', error);
      res.status(500).json({ error: 'Unable to load community ripple counts.' });
    }
  });

  app.post('/api/ripples', async (req, res) => {
    try {
      const { regionId, actionTitle, tierLabel } = req.body as {
        regionId?: string;
        actionTitle?: string;
        tierLabel?: string;
      };

      const cleanTitle = (actionTitle || 'Logged a neighborhood action').trim().slice(0, 120);
      const cleanTier = (tierLabel || 'Everyday Step').trim().slice(0, 40);

      const store = await readStore();
      const targetRegion =
        store.regions.find((r) => r.id === regionId) || store.regions[0];

      targetRegion.weeklyCount += 1;

      const newNote: CommunityNote = {
        id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        regionId: targetRegion.id,
        regionLabel: targetRegion.label,
        actionTitle: cleanTitle,
        tierLabel: cleanTier,
        timestampIso: new Date().toISOString(),
      };

      store.recentNotes = [newNote, ...store.recentNotes].slice(0, 16);
      await writeStore(store);

      const totalWeeklyCount = store.regions.reduce((sum, r) => sum + r.weeklyCount, 0);
      res.status(201).json({
        totalWeeklyCount,
        regions: store.regions,
        recentNotes: store.recentNotes.slice(0, 8),
        recorded: newNote,
      });
    } catch (error) {
      console.error('Failed to record community action:', error);
      res.status(500).json({ error: 'Unable to record action right now.' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Grounded server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
