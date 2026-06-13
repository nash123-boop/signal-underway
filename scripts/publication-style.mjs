const minorWords = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "from", "if", "in", "into",
  "nor", "of", "on", "or", "per", "the", "to", "up", "via", "vs", "with", "yet",
]);

function cleanWord(word) {
  return word.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9.]+$/g, "");
}

export function isPublicationTitleCase(text) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.every((rawWord, index) => {
    const word = cleanWord(rawWord);
    if (!word || /^\d/.test(word) || /^[A-Z0-9.]+$/.test(word)) return true;
    const lower = word.toLowerCase();
    const startsNewSegment = index > 0 && /^(?:-|—|–|:)$/.test(words[index - 1]);
    if (minorWords.has(lower) && index > 0 && index < words.length - 1 && !startsNewSegment) return word === lower;
    const firstLetter = word.match(/[A-Za-z]/)?.[0];
    return !firstLetter || firstLetter === firstLetter.toUpperCase();
  });
}

export function toPublicationTitleCase(text) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.map((rawWord, index) => {
    const match = rawWord.match(/^([^A-Za-z0-9]*)(.*?)([^A-Za-z0-9.]*)$/);
    if (!match) return rawWord;
    const [, prefix, word, suffix] = match;
    if (!word || /^\d/.test(word) || /^[A-Z0-9.]+$/.test(word)) return rawWord;
    const lower = word.toLowerCase();
    const startsNewSegment = index > 0 && /^(?:-|—|–|:)$/.test(words[index - 1]);
    if (minorWords.has(lower) && index > 0 && index < words.length - 1 && !startsNewSegment) return `${prefix}${lower}${suffix}`;
    return `${prefix}${word.charAt(0).toUpperCase()}${word.slice(1)}${suffix}`;
  }).join(" ");
}
