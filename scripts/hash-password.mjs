#!/usr/bin/env node
// Generates the ADMIN_PASSWORD_HASH (and a fresh SESSION_SECRET) for the
// admin panel. Usage:
//
//   npm run hash-password
//
// You'll be prompted for the password; nothing is written to disk. Paste the
// printed lines into .env.local (local) or Vercel's Environment Variables.
//
// Output format: scrypt:N:r:p:<salt base64url>:<key base64url>
// Must stay in sync with verifyPassword() in api/_lib/auth.ts.
import { randomBytes, scryptSync } from "node:crypto";
import readline from "node:readline";

const N = 16384;
const R = 8;
const P = 1;
const KEY_LENGTH = 64;
const MIN_PASSWORD_LENGTH = 12;

function prompt(question, { hidden = false } = {}) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: Boolean(process.stdin.isTTY),
    });
    if (hidden && process.stdin.isTTY) {
      // Echo nothing while the password is typed.
      rl._writeToOutput = (text) => {
        if (text.includes(question)) process.stdout.write(question);
      };
    }
    rl.question(question, (answer) => {
      rl.close();
      if (hidden && process.stdin.isTTY) process.stdout.write("\n");
      resolve(answer);
    });
  });
}

const password = await prompt("New admin password: ", { hidden: true });
if (password.length < MIN_PASSWORD_LENGTH) {
  console.error(`\nPassword must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  process.exit(1);
}
if (process.stdin.isTTY) {
  const confirmation = await prompt("Confirm password: ", { hidden: true });
  if (confirmation !== password) {
    console.error("\nPasswords do not match.");
    process.exit(1);
  }
}

const salt = randomBytes(16);
const key = scryptSync(password, salt, KEY_LENGTH, { N, r: R, p: P });
const hash = `scrypt:${N}:${R}:${P}:${salt.toString("base64url")}:${key.toString("base64url")}`;

console.log("\nAdd these to .env.local (local) or Vercel → Settings → Environment Variables:\n");
console.log(`ADMIN_PASSWORD_HASH=${hash}`);
console.log(`SESSION_SECRET=${randomBytes(32).toString("base64url")}`);
console.log("\n(Keep any existing SESSION_SECRET if you only want to change the password.)");
