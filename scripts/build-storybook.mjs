#!/usr/bin/env node

/**
 * Storybook build wrapper for CI/Chromatic.
 *
 * Important: don't enable --stats-json in CI; it can generate huge files.
 */

import { execSync } from "node:child_process";

const args = process.argv.slice(2);
const outputDirIdx = args.findIndex((a) => a === "-o" || a === "--output-dir");
const outputDir =
	outputDirIdx >= 0 &&
	args[outputDirIdx + 1] &&
	!args[outputDirIdx + 1].startsWith("-")
		? args[outputDirIdx + 1]
		: "storybook-static";

const cmd = `pnpm exec storybook build --output-dir ${outputDir}`;

execSync(cmd, {
	stdio: "inherit",
	env: {
		...process.env,
		NODE_OPTIONS: "--max_old_space_size=4096",
	},
});
