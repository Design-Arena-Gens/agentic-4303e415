# Agentic Shorts Automation

Fully automated pipeline for daily YouTube Shorts in the AI & AI money-making niche. Generates scripts, TTS audio, stock/AI visuals, metadata, and uploads to YouTube — all orchestrated through a Next.js control room and reusable Node scripts.

## 🚀 Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000 for the automation control room
```

To execute the full pipeline headlessly:

```bash
OPENAI_API_KEY=... GOOGLE_APPLICATION_CREDENTIALS=./gcp-key.json \
PEXELS_API_KEY=... PIXABAY_API_KEY=... \
YOUTUBE_CLIENT_ID=... YOUTUBE_CLIENT_SECRET=... \
YOUTUBE_REDIRECT_URI=... YOUTUBE_REFRESH_TOKEN=... \
npm run pipeline
```

Set `SKIP_UPLOAD=true` for dry-runs that skip the YouTube API step.

## 🧩 What’s Included

- **Next.js dashboard** (`src/app/page.tsx`) with form-driven config, affiliate stack management, and run logs.
- **LLM script + metadata generation** via OpenAI (`src/lib/ai/*`).
- **High-quality narration** using Google Cloud TTS (`src/lib/media/tts.ts`).
- **Stock footage ingestion** from Pexels + Pixabay (`src/lib/media/stock-media.ts`).
- **FFmpeg vertical assembly** with subtitles + overlays (`src/lib/media/video-builder.ts`).
- **YouTube upload automation** leveraging OAuth refresh tokens (`src/lib/youtube/uploader.ts`).
- **Reusable orchestrator + CLI** (`src/lib/workflow/pipeline.ts`, `scripts/run-pipeline.ts`).
- **Cron-ready scheduler** using `node-cron` (`src/lib/workflow/scheduler.ts`).

## 🛠️ Environment Variables

| Variable | Description |
| --- | --- |
| `OPENAI_API_KEY` | OpenAI key for script + metadata generation |
| `GOOGLE_APPLICATION_CREDENTIALS` | Path to Google service account JSON for TTS |
| `PEXELS_API_KEY` / `PIXABAY_API_KEY` | Stock footage providers |
| `STABLE_DIFFUSION_API_KEY` | Optional — integrate custom AI visuals |
| `YOUTUBE_CLIENT_ID` / `YOUTUBE_CLIENT_SECRET` / `YOUTUBE_REDIRECT_URI` / `YOUTUBE_REFRESH_TOKEN` | YouTube Data API OAuth |
| `YOUTUBE_CHANNEL_ID` | Optional channel targeting |
| `SHORTS_OUTPUT_DIR` / `WORKING_DIR` | Customize asset locations |
| `AFFILIATE_LINKS` | Pipe-separated list for CLI runs |

## 📅 Scheduling

Add a cron entry on your VM/container to run daily:

```cron
0 12 * * * cd /path/to/project && /usr/bin/env SKIP_UPLOAD=false npm run pipeline >> pipeline.log 2>&1
```

The built-in dashboard exposes the cron expression for visibility. For programmatic scheduling inside Node, instantiate `PipelineScheduler` from `src/lib/workflow/scheduler.ts`.

## 🧪 Verification

1. `npm run lint` – static analysis via Next.js ESLint preset.  
2. `npm run dev` – ensure dashboard loads and mock pipeline POST works (requires env).  
3. `npm run pipeline` – end-to-end asset generation (requires FFmpeg-compatible environment + credentials).  
4. Check `output/` for script, metadata, and rendered short.

## 📦 Deployment

This project is optimized for Vercel (Next.js 14 app router). After setting `VERCEL_TOKEN`, deploy with:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-4303e415
```

Dashboard API endpoints expect the same environment variables to exist in your Vercel project.

---

Craft high-CPM, affiliate-optimized AI Shorts with a single click or automated cron job. Plug in your keys, tailor the prompts, and scale the content flywheel.*** End Patch
