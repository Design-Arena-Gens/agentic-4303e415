"use client";

import { useState } from "react";
import { PipelineRunLog } from "./PipelineRunLog";
import { PipelineSettingsForm } from "./PipelineSettingsForm";

export type PipelineRunResult = {
  scriptPath: string;
  videoPath: string;
  metadataPath: string;
  youtubeVideoId?: string;
};

export function PipelineDashboard() {
  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState<PipelineRunResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [skipUpload, setSkipUpload] = useState(true);
  const [affiliateLinks, setAffiliateLinks] = useState([
    "https://affiliate.example.com/ai-suite",
    "https://affiliate.example.com/prompt-pack"
  ]);

  const handleRun = async (config: Record<string, unknown>) => {
    setIsRunning(true);
    setError(null);
    try {
      const response = await fetch("/api/pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          config,
          affiliateLinks,
          skipUpload
        })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error ?? "Pipeline run failed");
      }
      const data = await response.json();
      setRunResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown pipeline error");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-10">
      <section className="mx-auto max-w-5xl space-y-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-10 shadow-glow backdrop-blur">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Agentic Shorts Automation Control Room
          </h1>
          <p className="text-slate-300">
            Generate AI wealth YouTube Shorts, metadata, and automated uploads.
            Configure your stack, queue daily runs, and monitor analytics in one
            hub.
          </p>
        </header>

        <PipelineSettingsForm
          onRun={handleRun}
          isRunning={isRunning}
          skipUpload={skipUpload}
          onSkipUploadChange={setSkipUpload}
          affiliateLinks={affiliateLinks}
          onAffiliateLinksChange={setAffiliateLinks}
        />
        <PipelineRunLog runResult={runResult} error={error} />
      </section>
    </main>
  );
}
