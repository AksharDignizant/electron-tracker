import { cpSync, existsSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const exportDir = path.join(projectRoot, "next-out");
const assetsDir = path.join(exportDir, "_next");

if (!existsSync(assetsDir)) {
  console.warn("[post-export] Skipping: next-out/_next not found.");
  process.exit(0);
}

const candidates = readdirSync(exportDir, { withFileTypes: true })
  .filter(
    (entry) =>
      entry.isDirectory() &&
      !entry.name.startsWith("_") &&
      entry.name !== "static" &&
      entry.name !== "_next"
  )
  .map((entry) => path.join(exportDir, entry.name));

for (const dir of candidates) {
  const target = path.join(dir, "_next");
  rmSync(target, { recursive: true, force: true });
  cpSync(assetsDir, target, { recursive: true });
  console.log(
    `[post-export] Mirrored assets to ${path.relative(exportDir, dir)}/_next`
  );
}
