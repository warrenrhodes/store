import { z } from "zod";

export const ContentSchema = z.object({
  contentType: z.enum(["TEXT", "HTML"]).default("TEXT"),
  content: z.string().min(1),
});

const PriceSchema = z.object({
  regular: z.number().min(0),
  sale: z.number().min(0).optional(),
  saleStartDate: z.string().or(z.date()).optional(),
  saleEndDate: z.string().or(z.date()).optional(),
});

const FeatureSchema = z.object({
  icon: z.string().optional(),
  title: z.string(),
  description: ContentSchema.optional(),
});

const InventorySchema = z.object({
  quantity: z.number().default(0),
  lowStockThreshold: z.number().default(5),
  stockQuantity: z.number().optional(),
});

const MetadataSchema = z.object({
  seoTitle: z.string(),
  seoDescription: z.string(),
  keywords: z.array(z.string()),
});

const productSchema = z.object({
  title: z.string().min(2).max(50),
  slug: z.string(),
  description: ContentSchema,
  media: z.array(z.string()).min(1),
  categories: z.array(z.string()).min(1),
  tags: z.array(z.string()).optional(),
  price: PriceSchema,
  blogUrl: z.string().url().optional(),
  features: z.array(FeatureSchema).optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  visibility: z.boolean().default(true),
  isFeature: z.boolean().default(false),
  isNewProduct: z.boolean().default(false),
  inventory: InventorySchema,
  metadata: MetadataSchema,
});
const productVerificationForm = (
  values: ProductSchemaType
): string | undefined => {
  // Title validation
  if (values.title.trim().length < 2 || values.title.trim().length > 50) {
    return "Title must be between 2 and 50 characters.";
  }

  // Slug validation
  if (!values.slug.trim()) {
    return "Slug is required.";
  }

  if (values.description.content.trim().length < 1) {
    return "Description content cannot be empty.";
  }

  // Media validation
  if (values.media.length === 0) {
    return "At least one image is required.";
  }

  // Categories validation
  if (values.categories.length === 0) {
    return "At least one category is required.";
  }

  // Price validation
  if (values.price.regular < 0) {
    return "Regular price must be greater than or equal to 0.";
  }

  if (values.price.sale !== undefined) {
    if (values.price.sale < 0) {
      return "Sale price must be greater than or equal to 0.";
    }

    if (!values.price.saleStartDate || !values.price.saleEndDate) {
      return "Sale start and end dates are required when sale price is defined.";
    }
  }

  // Features validation
  if (values.features && values.features.length > 0) {
    for (const feature of values.features) {
      if (!feature.title.trim()) {
        return "All features must have a title.";
      }

      if (feature.description && !feature.description.content.trim()) {
        return "Feature description content cannot be empty if provided.";
      }
    }
  }

  // Inventory validation
  if (values.inventory.quantity < 0) {
    return "Inventory quantity must be greater than or equal to 0.";
  }

  if (values.inventory.lowStockThreshold < 0) {
    return "Low stock threshold must be greater than or equal to 0.";
  }

  if (values.inventory.lowStockThreshold >= values.inventory.quantity) {
    return "Low stock threshold must be less than quantity.";
  }

  // Metadata validation
  if (!values.metadata.seoTitle.trim()) {
    return "SEO title is required.";
  }

  if (!values.metadata.seoDescription.trim()) {
    return "SEO description is required.";
  }

  if (values.metadata.keywords.length === 0) {
    return "At least one keyword is required.";
  }

  // All validations passed
  return;
};

type ProductSchemaType = z.infer<typeof productSchema>;
export { productSchema, type ProductSchemaType, productVerificationForm };
