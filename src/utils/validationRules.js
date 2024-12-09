const DISALLOWED_TITLE_STARTS = ['List of', 'The', 'A', 'An'];
const DISCOURAGED_WORDS = ['I', 'me', 'my', 'mine', 'you', 'your', 'we', 'us', 'our'];

export const validateTitle = (title) => {
  if (!title.trim()) {
    return "Title is required";
  }
  if (title.length > 255) {
    return "Title must be less than 255 characters";
  }
  if (/^[a-z]/.test(title)) {
    return "Title must start with a capital letter";
  }
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(title)) {
    return "Title should not contain special characters";
  }
  if (DISALLOWED_TITLE_STARTS.some(start => title.startsWith(start))) {
    return `Title should not start with: ${DISALLOWED_TITLE_STARTS.join(', ')}`;
  }
  if (title.includes('(disambiguation)')) {
    return "Disambiguation pages have special formatting requirements";
  }
  if (title.split(' ').length > 10) {
    return "Title should be concise (preferably less than 10 words)";
  }
  return null;
};

export const validateContent = (content) => {
  if (!content.trim()) {
    return "Content is required";
  }
  if (content.length < 200) {
    return "Content should be at least 200 characters long for a substantial article";
  }
  if (!/\S+\s+\S+/.test(content)) {
    return "Content should contain multiple words";
  }
  const words = content.split(/\s+/);
  if (words.length < 50) {
    return "Content should have at least 50 words for a meaningful article";
  }
  if (DISCOURAGED_WORDS.some(word => new RegExp(`\\b${word}\\b`, 'i').test(content))) {
    return "Avoid using first-person or second-person pronouns in the content";
  }
  if (!/\n\n/.test(content)) {
    return "Use paragraphs to structure your content (separate paragraphs with blank lines)";
  }
  if (!/^[A-Z]/.test(content)) {
    return "The first sentence should start with a capital letter";
  }
  if (!/\.\s*$/.test(content)) {
    return "The content should end with a period";
  }
  if (/(\b[A-Z]{2,}\b)/.test(content)) {
    return "Avoid using all caps for emphasis; use italics instead";
  }
  return null;
};

export const validateReferences = (references) => {
  if (!references.trim()) {
    return "At least one reference is required";
  }
  const referenceLines = references.split('\n').filter(line => line.trim());
  if (referenceLines.length === 0) {
    return "At least one valid reference is required";
  }
  for (let i = 0; i < referenceLines.length; i++) {
    const line = referenceLines[i];
    if (!line.startsWith('* ')) {
      return `Reference ${i + 1} should start with '* '`;
    }
    if (!line.includes('http')) {
      return `Reference ${i + 1} should include a URL`;
    }
    if (!/\S+\s+\S+/.test(line.replace('* ', ''))) {
      return `Reference ${i + 1} should include a brief description, not just a URL`;
    }
    if (line.length > 500) {
      return `Reference ${i + 1} is too long (max 500 characters)`;
    }
  }
  if (new Set(referenceLines).size !== referenceLines.length) {
    return "Avoid duplicate references";
  }
  return null;
};

export const validateOverall = (title, content, references) => {
  if (content.includes(title)) {
    return "Avoid repeating the exact title in the content";
  }
  const contentWords = content.toLowerCase().split(/\s+/);
  const titleWords = title.toLowerCase().split(/\s+/);
  if (!titleWords.every(word => contentWords.includes(word))) {
    return "Ensure all words from the title appear in the content";
  }
  const referenceCount = (content.match(/\[\d+\]/g) || []).length;
  if (referenceCount === 0) {
    return "Use inline citations in the content (e.g., [1], [2])";
  }
  if (referenceCount !== references.split('\n').filter(line => line.trim()).length) {
    return "Ensure all references are cited in the content";
  }
  return null;
};
