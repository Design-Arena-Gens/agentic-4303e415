"use client";

import { useMemo, useState } from "react";
import { RunPipelineButton } from "./RunPipelineButton";

type Props = {
  onRun: (config: Record<string, unknown>) => Promise<void>;
  isRunning: boolean;
  skipUpload: boolean;
  onSkipUploadChange: (value: boolean) => void;
  affiliateLinks: string[];
  onAffiliateLinksChange: (links: string[]) => void;
};

const voicePresets = [
  { value: "en-US-Neural2-C", label: "US Energetic (Neural2-C)" },
  { value: "en-GB-News-H", label: "UK News Hype (News-H)" },
  { value: "en-IN-Neural2-A", label: "India Global Hustler (Neural2-A)" }
];

export function PipelineSettingsForm({
  onRun,
  isRunning,
  skipUpload,
  onSkipUploadChange,
  affiliateLinks,
  onAffiliateLinksChange
}: Props) {
  const [outputDir, setOutputDir] = useState("output");
  const [workingDir, setWorkingDir] = useState("tmp");
  const [model, setModel] = useState("gpt-4o-mini");
  const [voice, setVoice] = useState(voicePresets[0].value);
  const [languageCode, setLanguageCode] = useState("en-US");
  const [cronExpression, setCronExpression] = useState("0 12 * * *");

  const config = useMemo(
    () => ({
      outputDir,
      workingDir,
      openAiModel: model,
      narrationVoice: voice,
      languageCode
    }),
    [outputDir, workingDir, model, voice, languageCode]
  );

  return (
    <form
      className="space-y-6"
      onSubmit={async (event) => {
        event.preventDefault();
        await onRun(config);
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Output Directory
          </span>
          <input
            value={outputDir}
            onChange={(event) => setOutputDir(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none"
            placeholder="output"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Working Directory
          </span>
          <input
            value={workingDir}
            onChange={(event) => setWorkingDir(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none"
            placeholder="tmp"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            OpenAI Model
          </span>
          <select
            value={model}
            onChange={(event) => setModel(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none"
          >
            <option value="gpt-4o-mini">gpt-4o-mini</option>
            <option value="gpt-4o">gpt-4o</option>
            <option value="o4-mini">o4-mini</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Narration Voice
          </span>
          <select
            value={voice}
            onChange={(event) => setVoice(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none"
          >
            {voicePresets.map((preset) => (
              <option key={preset.value} value={preset.value}>
                {preset.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Language Code
          </span>
          <input
            value={languageCode}
            onChange={(event) => setLanguageCode(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none"
            placeholder="en-US"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Scheduler (cron)
          </span>
          <input
            value={cronExpression}
            onChange={(event) => setCronExpression(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none"
            placeholder="0 12 * * *"
          />
        </label>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
          Affiliate Link Stack
        </p>
        <div className="space-y-3">
          {affiliateLinks.map((link, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                value={link}
                onChange={(event) => {
                  const next = [...affiliateLinks];
                  next[index] = event.target.value;
                  onAffiliateLinksChange(next);
                }}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() =>
                  onAffiliateLinksChange(
                    affiliateLinks.filter((_, idx) => idx !== index)
                  )
                }
                className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:border-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onAffiliateLinksChange([...affiliateLinks, ""])}
            className="rounded-xl border border-dashed border-slate-700 px-4 py-3 text-sm text-cyan-300 hover:border-cyan-400 hover:text-cyan-200"
          >
            + Add Affiliate Link
          </button>
        </div>
      </div>

      <label className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 px-5 py-4">
        <div>
          <p className="text-base font-semibold text-slate-100">
            Skip YouTube Upload (local dry run)
          </p>
          <p className="text-sm text-slate-400">
            Disable this once OAuth credentials are configured.
          </p>
        </div>
        <input
          type="checkbox"
          checked={skipUpload}
          onChange={(event) => onSkipUploadChange(event.target.checked)}
          className="h-5 w-5 rounded border border-slate-600 bg-slate-800 text-cyan-400 focus:ring-cyan-400"
        />
      </label>

      <RunPipelineButton
        isRunning={isRunning}
        type="submit"
        label="Launch Automated Short"
      />

      <p className="text-center text-xs uppercase tracking-widest text-slate-500">
        Scheduler command: <code>npm run pipeline</code> + cron {">"} pushes
        daily shorts @ {cronExpression}
      </p>
    </form>
  );
}
