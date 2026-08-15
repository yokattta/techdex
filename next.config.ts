import type { NextConfig } from "next";

/**
 * GitHub Pages serves this project at yokattta.github.io/techdex, so the build
 * needs a basePath — but only there. `npm run dev` stays at `/` because
 * PAGES_BASE_PATH is set by the Pages workflow and nowhere else.
 *
 * `output: "export"` is honest here: every page already comes out of
 * generateStaticParams, and there are no route handlers or server actions.
 */
const basePath = process.env.PAGES_BASE_PATH;

const nextConfig: NextConfig = {
  ...(basePath ? { output: "export" as const, basePath, trailingSlash: true } : {}),
};

export default nextConfig;
