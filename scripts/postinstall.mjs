import { execSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function findStreamdownRoot() {
  const bunDir = path.join(rootDir, "node_modules", ".bun");
  if (!existsSync(bunDir)) return null;

  for (const entry of readdirSync(bunDir)) {
    if (!entry.startsWith("svelte-streamdown@")) continue;
    const candidate = path.join(
      bunDir,
      entry,
      "node_modules",
      "svelte-streamdown",
    );
    if (existsSync(path.join(candidate, "package.json"))) {
      return candidate;
    }
  }

  return null;
}

const streamdownRoot = findStreamdownRoot();
if (!streamdownRoot) {
  process.exit(0);
}

const dist = path.join(
  streamdownRoot,
  "packages/svelte-streamdown/dist/index.js",
);
if (existsSync(dist)) {
  process.exit(0);
}

console.log("Building svelte-streamdown dependency...");
execSync("bun install && bun run build:packages", {
  cwd: streamdownRoot,
  stdio: "inherit",
});
