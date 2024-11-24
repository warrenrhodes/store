const DEFAULT_LENGTH = 8;

interface PromoCodeOptions {
  prefix?: string;
  length?: number;
  includeYear?: boolean;
}

function cleanText(text: string): string {
  return text.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function generateBaseCode(
  promotionName: string,
  includeYear: boolean,
  timestamp: Date
): string {
  const cleanedName = cleanText(promotionName);
  const words = cleanedName.split(/[^A-Z0-9]+/);
  let baseCode = words[0]?.slice(0, 6) || cleanedName.slice(0, 6);

  if (includeYear) {
    const yearInName = promotionName.match(/20[2-9][0-9]/)?.[0];
    const year = yearInName
      ? yearInName.slice(-2)
      : timestamp.getFullYear().toString().slice(-2);

    if (!baseCode.includes(year)) {
      baseCode += year;
    }
  }

  return baseCode;
}

function generateRandomString(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
}

export function generatePromoCode(
  promotionName: string,
  options: PromoCodeOptions = {}
): string {
  const { prefix, length = DEFAULT_LENGTH, includeYear = true } = options;

  const timestamp = new Date();
  const baseCode = prefix
    ? cleanText(prefix)
    : generateBaseCode(promotionName, includeYear, timestamp);
  const randomPart = generateRandomString(length);
  const code = `${baseCode}-${randomPart}`;

  return code;
}
