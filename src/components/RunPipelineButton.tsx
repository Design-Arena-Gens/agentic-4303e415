"use client";

import { motion } from "framer-motion";
import { SparklesIcon } from "./icons/SparklesIcon";

type Props = {
  isRunning: boolean;
  onClick?: () => void;
  label?: string;
  type?: "button" | "submit";
};

export function RunPipelineButton({
  isRunning,
  onClick,
  label = "Deploy Fully Automated Short",
  type = "button"
}: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={isRunning}
      type={type}
      className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 px-6 py-4 text-lg font-semibold text-slate-50 shadow-lg shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <SparklesIcon className="h-6 w-6 animate-pulse" />
      {isRunning ? "Generating..." : label}
    </motion.button>
  );
}
