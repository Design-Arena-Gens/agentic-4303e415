import { NextRequest, NextResponse } from "next/server";
import { ShortsPipeline } from "@/lib/workflow/pipeline";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const pipeline = new ShortsPipeline(body?.config);
  try {
    const result = await pipeline.run({
      affiliateLinks: body?.affiliateLinks,
      skipUpload: body?.skipUpload ?? false
    });
    return NextResponse.json(result);
  } catch (error) {
    logger.error({ error }, "Pipeline API run failed");
    return NextResponse.json(
      { error: "Pipeline execution failed", details: `${error}` },
      { status: 500 }
    );
  }
}
