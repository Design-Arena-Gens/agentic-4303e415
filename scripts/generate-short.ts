#!/usr/bin/env ts-node
import fs from "fs";
import path from "path";
import { ScriptGenerator } from "../src/lib/ai/script-generator";
import { MetadataGenerator } from "../src/lib/ai/metadata-generator";
import { logger } from "../src/lib/logger";

async function main() {
  const openAiKey = process.env.OPENAI_API_KEY;
  if (!openAiKey) {
    throw new Error("OPENAI_API_KEY not set");
  }
  const scriptGenerator = new ScriptGenerator(openAiKey);
  const metadataGenerator = new MetadataGenerator(openAiKey);
  const script = await scriptGenerator.generateShortIdea();
  const metadata = await metadataGenerator.generateMetadata({
    draftTitle: script.title,
    script: script.script,
    cta: script.cta,
    affiliateLinks: [
      "https://affiliate.example.com/ai-suite",
      "https://affiliate.example.com/prompt-pack"
    ]
  });

  const outputDir = path.resolve(process.env.OUTPUT_DIR ?? "output");
  await fs.promises.mkdir(outputDir, { recursive: true });
  await fs.promises.writeFile(
    path.join(outputDir, "short-script.json"),
    JSON.stringify(script, null, 2)
  );
  await fs.promises.writeFile(
    path.join(outputDir, "short-metadata.json"),
    JSON.stringify(metadata, null, 2)
  );
  logger.info("Short script and metadata generated");
}

main().catch((error) => {
  logger.error({ error }, "Generation failed");
  process.exitCode = 1;
});
