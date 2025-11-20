import {
  chmodSync,
  existsSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outDir = path.join(projectRoot, "out");
const args = process.argv.slice(2);
const packageJson = JSON.parse(
  readFileSync(path.join(projectRoot, "package.json"), "utf8")
);
const executableName = packageJson.productName || packageJson.name;

if (process.platform !== "linux") {
  console.log("[post-package] Skipping sandbox removal on non-Linux platform.");
  process.exit(0);
}

if (!existsSync(outDir) && args.length === 0) {
  console.warn("[post-package] Skipping: out/ directory not found.");
  process.exit(0);
}

const targets =
  args.length > 0
    ? args.map((dir) => path.resolve(dir))
    : discoverDefaultTargets();

const logs = [];

for (const targetDir of targets) {
  if (!existsSync(targetDir) || !statSync(targetDir).isDirectory()) continue;
  patchSandbox(targetDir);
  wrapExecutable(targetDir);
}

if (logs.length === 0) {
  console.log("[post-package] No Linux packages found to patch.");
} else {
  console.log(logs.join("\n"));
}

function discoverDefaultTargets() {
  const found = [];
  for (const entry of readdirSync(outDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || !entry.name.includes("linux")) continue;
    found.push(path.join(outDir, entry.name));
  }
  return found;
}

function patchSandbox(targetDir) {
  const candidate = path.join(targetDir, "chrome-sandbox");
  if (!existsSync(candidate)) return;
  rmSync(candidate, { force: true });
  logs.push(
    `[post-package] Removed chrome-sandbox: ${path.relative(
      projectRoot,
      candidate
    )}`
  );
}

function wrapExecutable(targetDir) {
  const binaryPath = path.join(targetDir, executableName);
  if (!existsSync(binaryPath)) return;

  const originalBinaryPath = `${binaryPath}-bin`;
  if (
    !existsSync(originalBinaryPath) ||
    statSync(originalBinaryPath).isDirectory()
  ) {
    renameSync(binaryPath, originalBinaryPath);
    logs.push(
      `[post-package] Renamed executable to ${path.relative(
        projectRoot,
        originalBinaryPath
      )}`
    );
  }

  const script = `#!/bin/sh
exec "${originalBinaryPath}" --no-sandbox "$@"
`;
  writeFileSync(binaryPath, script, { mode: 0o755 });
  chmodSync(binaryPath, 0o755);
  logs.push(
    `[post-package] Wrapped launcher with --no-sandbox: ${path.relative(
      projectRoot,
      binaryPath
    )}`
  );
}
