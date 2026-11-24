import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I sent a reply-all asking everyone to stop replying-all. Forty-seven people replied-all to agree.";

if (JOKE.trim().length === 0) {
  throw new Error("refusing to write an empty joke");
}

if (JOKE.length > 200) {
  throw new Error(
    `joke is ${JOKE.length} characters, over the 200-character limit`,
  );
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const entryPath = join(outputDir, "entry.txt");
writeFileSync(entryPath, JOKE, "utf8");

const written = readFileSync(entryPath, "utf8");
if (written !== JOKE) {
  throw new Error("entry.txt does not match the joke");
}
