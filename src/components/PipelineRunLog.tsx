"use client";

import Link from "next/link";
import { PipelineRunResult } from "./PipelineDashboard";

export function PipelineRunLog({
  runResult,
  error
}: {
  runResult: PipelineRunResult | null;
  error: string | null;
}) {
  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/50 bg-red-500/10 p-6 text-sm text-red-200">
        <p className="font-semibold uppercase tracking-widest text-red-100">
          Pipeline Failed
        </p>
        <p className="mt-2 text-red-200/80">{error}</p>
      </div>
    );
  }

  if (!runResult) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-300">
        Pipeline logs will appear after your first automated run.
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-sm text-emerald-100">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
          Script JSON
        </p>
        <p className="mt-1 break-all font-mono text-emerald-100/90">
          {runResult.scriptPath}
        </p>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
          Video Asset
        </p>
        <p className="mt-1 break-all font-mono text-emerald-100/90">
          {runResult.videoPath}
        </p>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
          Metadata JSON
        </p>
        <p className="mt-1 break-all font-mono text-emerald-100/90">
          {runResult.metadataPath}
        </p>
      </div>

      {runResult.youtubeVideoId ? (
        <Link
          href={`https://youtube.com/shorts/${runResult.youtubeVideoId}`}
          target="_blank"
          className="inline-flex rounded-xl bg-emerald-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-emerald-100 ring-1 ring-emerald-400/60 hover:bg-emerald-500/30"
        >
          View Published Short ↗
        </Link>
      ) : (
        <p className="text-xs text-emerald-200/70">
          Upload skipped — enable once OAuth credentials are ready.
        </p>
      )}
    </div>
  );
}
