import fs from "node:fs";
import path from "node:path";
import { toPublicationTitleCase } from "./publication-style.mjs";

const args = Object.fromEntries(process.argv.slice(2).map((part) => {
  const [key, ...value] = part.replace(/^--/, "").split("=");
  return [key, value.join("=")];
}));
const required = ["title", "deck", "category"];
const missing = required.filter((key) => !args[key]);
if (missing.length) {
  console.error(`Missing: ${missing.join(", ")}\nExample: npm run new:post -- --title="Story title" --deck="One-line summary" --category="Technology"`);
  process.exit(1);
}
const categories = ["World", "Politics", "Business", "Technology", "Culture"];
if (!categories.includes(args.category)) {
  console.error(`Category must be one of: ${categories.join(", ")}`);
  process.exit(1);
}
const date = args.date || new Date().toISOString().slice(0, 10);
const publicationTitle = toPublicationTitleCase(args.title);
const slug = (args.slug || publicationTitle).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const target = path.resolve("src/content/posts", `${date}-${slug}.md`);
if (fs.existsSync(target)) {
  console.error(`Article already exists: ${target}`);
  process.exit(1);
}
const content = `---\ntitle: "${publicationTitle.replaceAll('"', '\\"')}"\ndeck: "${args.deck.replaceAll('"', '\\"')}"\ncategory: "${args.category}"\npublishDate: "${date}"\nauthor: "The National Angle Desk"\ntags: []\nsources: []\nfeatured: false\n---\n\nOpen with the most consequential verified fact or development in one clear paragraph.\n\n## The Evidence\n\nExplain what can be verified and link primary sources.\n\n## What It Could Mean\n\nSeparate interpretation from established fact. Include credible alternatives.\n\n## What to Watch Next\n\nList the specific events or data that would strengthen or weaken the analysis.\n`;
fs.writeFileSync(target, content, "utf8");
console.log(`Created ${target}`);
