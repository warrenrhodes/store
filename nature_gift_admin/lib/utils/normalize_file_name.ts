export function normalizeFileName(fileName: string): string {
  // random number.
  const number = Math.floor(Math.random() * 1000);
  return fileName
    .normalize("NFD") // Normalize Unicode characters
    .replace(/[\u0300-\u036f]/g, `${number}`) // Remove accent marks
    .replace(/[^\w\s.-]/g, `${number}`) // Remove special characters except . and -
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[-]+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^[-]+|[-]+$/g, `${number}`) // Remove leading/trailing hyphens
    .replace(/\((\d+)\)/g, `${number}`) // Remove parenthetical numbers
    .toLowerCase()
    .trim();
}
