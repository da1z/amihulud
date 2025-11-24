#!/usr/bin/env node
import { execSync } from "node:child_process";

const QUERY = "Sha1-Hulud: The Second Coming";

const run = (cmd: string): string => {
  try {
    return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim();
  } catch (error) {
    if (error instanceof Error && "stderr" in error) {
      throw new Error(`Command failed: ${cmd}\n${(error as { stderr: string }).stderr}`);
    }
    throw error;
  }
};

const main = () => {
  try {
    // Check if gh is installed
    try {
      execSync("gh --version", { stdio: "ignore" });
    } catch {
      console.error("❌ GitHub CLI (gh) is not installed or not in PATH.");
      console.error("   Install it from: https://cli.github.com/");
      process.exit(1);
    }

    // Check if gh is authenticated
    try {
      execSync("gh auth status", { stdio: "ignore" });
    } catch {
      console.error("❌ GitHub CLI is not authenticated.");
      console.error("   Run: gh auth login");
      process.exit(1);
    }

    // Get current user
    const user = run(`gh api user --jq ".login"`);
    console.log(`🔍 Checking repos for user: ${user}`);

    // Search for malicious code
    const result = run(
      `gh search code "${QUERY}" --owner ${user} --json repository,path --jq "length"`
    );
    const matches = Number(result) || 0;

    if (matches === 0) {
      console.log(`✅ OK: no matches for "${QUERY}"`);
      console.log("   Your repositories do not appear to be affected by the Sha1hulud attack.");
    } else {
      console.log(`❌ Affected: found ${matches} match(es) for "${QUERY}"`);
      console.log(`   Run this to see details:`);
      console.log(`   gh search code "${QUERY}" --owner ${user}`);
      process.exit(1);
    }
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
};

main();

