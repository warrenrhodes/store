import slugify from "slugify";

export function generateSlug(title: string): string {
  console.log(title);
  return slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });
}
