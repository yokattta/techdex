import { existsSync, readdirSync } from "node:fs";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * This folder collects unrelated projects. A top-level directory holding its
 * own `package.json` or `.git` is somebody else's code — don't lint it. This
 * project's own directories (app, components, lib, public) have neither, so
 * detection beats a hardcoded list: a new sibling can't break `npm run lint`.
 */
const siblingProjects = readdirSync(".", { withFileTypes: true })
  .filter(
    (entry) =>
      entry.isDirectory() &&
      !entry.name.startsWith(".") &&
      entry.name !== "node_modules" &&
      (existsSync(`${entry.name}/.git`) ||
        existsSync(`${entry.name}/package.json`)),
  )
  .map((entry) => `${entry.name}/**`);

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ...siblingProjects,
  ]),
]);

export default eslintConfig;
