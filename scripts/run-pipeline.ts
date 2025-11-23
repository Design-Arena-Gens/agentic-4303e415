#!/usr/bin/env ts-node
import path from "path";
import { ShortsPipeline } from "../src/lib/workflow/pipeline";
import { logger } from "../src/lib/logger";

async function main() {
  const affiliateLinks = process.env.AFFILIATE_LINKS
    ? process.env.AFFILIATE_LINKS.split("|").map((link) => link.trim())
    : [
        "https://affiliate.example.com/ai-suite",
        "https://affiliate.example.com/prompt-pack"
      ];

  const pipeline = new ShortsPipeline();
  const result = await pipeline.run({
    affiliateLinks,
    skipUpload: process.env.SKIP_UPLOAD === "true"
  });

  logger.info(
    {
      scriptPath: path.resolve(result.scriptPath),
      videoPath: path.resolve(result.videoPath),
      metadataPath: path.resolve(result.metadataPath),
      youtubeVideoId: result.youtubeVideoId
    },
    "Pipeline completed"
  );
}

main().catch((error) => {
  logger.error({ error }, "Pipeline crash");
  process.exitCode = 1;
});
