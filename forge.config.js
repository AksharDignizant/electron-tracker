import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';

let hasBuilt = false;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postPackageScript = path.join(__dirname, 'scripts', 'post-package.mjs');

function run(command, args = []) {
  return new Promise((resolve, reject) => {
    const subprocess = spawn(command, args, {
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });

    subprocess.on('close', (code) => {
      if (code === 0) resolve(undefined);
      else reject(new Error(`${command} ${args.join(' ')} failed with code ${code}`));
    });
  });
}

async function patchLinuxOutputs(targets = []) {
  if (!targets.length) return;
  await run('node', [postPackageScript, ...targets]);
}

const config = {
  packagerConfig: {
    asar: true,
  },
  hooks: {
    async prePackage() {
      if (hasBuilt) return;
      await run('npm', ['run', 'build']);
      hasBuilt = true;
    },
    async postPackage(_forgeConfig, packageResult) {
      await patchLinuxOutputs(packageResult?.outputPaths ?? []);
    },
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'electron_demo',
        authors: 'BreakDayz',
        description: 'BreakDayz Desktop App',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
