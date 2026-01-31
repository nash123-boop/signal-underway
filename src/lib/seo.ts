export function absoluteUrl(site: string, path: string) {
  return new URL(path, site).toString();
}
