import fs from "node:fs";
import path from "node:path";

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
const slug = (args.slug || args.title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const target = path.resolve("src/content/posts", `${date}-${slug}.md`);
if (fs.existsSync(target)) {
  console.error(`Article already exists: ${target}`);
  process.exit(1);
}
const content = `---\ntitle: "${args.title.replaceAll('"', '\\"')}"\ndeck: "${args.deck.replaceAll('"', '\\"')}"\ncategory: "${args.category}"\npublishDate: "${date}"\nauthor: "The National Signal Desk"\ntags: []\nsources: []\nfeatured: false\n---\n\n**Opening signal:** Write the observable change in one clear paragraph.\n\n## The evidence\n\nExplain what can be verified and link primary sources.\n\n## What it could mean\n\nSeparate interpretation from established fact. Include credible alternatives.\n\n## What to watch next\n\nList the specific events or data that would strengthen or weaken the analysis.\n`;
fs.writeFileSync(target, content, "utf8");
console.log(`Created ${target}`);
