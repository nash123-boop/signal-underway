import fs from "node:fs";
import path from "node:path";

const sourceRoot = path.resolve("src");
const publicRoot = path.resolve("public");
const knownGeneratedRoutes = new Set(["/rss.xml", "/robots.txt", "/sitemap.xml"]);
const knownDynamicRoutes = new Set(["/c/world", "/c/politics", "/c/business", "/c/technology", "/c/culture"]);
const errors = [];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function routeExists(route) {
  if (route === "/") return true;
  if (knownGeneratedRoutes.has(route)) return true;
  if (knownDynamicRoutes.has(route)) return true;
  if (route.includes("${")) return true;
  const clean = route.split(/[?#]/)[0].replace(/\/$/, "");
  const pagePath = path.join(sourceRoot, "pages", clean.slice(1));
  return [
    `${pagePath}.astro`,
    `${pagePath}.js`,
    path.join(pagePath, "index.astro"),
    path.join(publicRoot, clean.slice(1)),
  ].some(fs.existsSync);
}

for (const file of walk(sourceRoot).filter((name) => /\.(astro|js|ts)$/.test(name))) {
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(/(?:href|action)="(\/[^"]*)"/g)) {
    const route = match[1];
    if (!routeExists(route)) errors.push(`${path.relative(process.cwd(), file)}: broken internal link ${route}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Validated fixed internal links.");
