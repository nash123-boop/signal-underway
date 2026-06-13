import fs from "node:fs";
import path from "node:path";

const pagesRoot = path.resolve("src/pages");
const files = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (entry.name.endsWith(".astro")) files.push(fullPath);
  }
}

walk(pagesRoot);
const errors = [];
for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  if (/<style(?:\s|>)/i.test(source)) {
    errors.push(`${path.relative(process.cwd(), file)}: page styles must live in src/styles/global.css`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Validated shared page styling.");
