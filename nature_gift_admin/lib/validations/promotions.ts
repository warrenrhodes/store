import * as z from "zod";

export const promotionConditionSchema = z.object({
  type: z.enum([
    "MINIMUM_QUANTITY",
    "SPECIFIC_PRODUCTS",
    "FIRST_ORDER",
    "DELIVERY_METHOD",
    "LOCATION",
  ]),
  value: z.union([z.number(), z.string(), z.array(z.string())]),
});

export const promotionActionSchema = z.object({
  type: z.enum([
    "PERCENTAGE_DISCOUNT",
    "FIXED_DISCOUNT",
    "FREE_SHIPPING",
    "FREE_PRODUCT",
    "BUY_X_GET_Y",
  ]),
  value: z.union([z.number(), z.string(), z.array(z.string())]),
  maxDiscount: z.number().optional(),
});

export const promotionSchema = z.object({
  code: z.string().min(3).max(20),
  name: z.string().min(2).max(50),
  description: z.string().optional(),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()),
  conditions: z.array(promotionConditionSchema),
  actions: z.array(promotionActionSchema),
  usageLimit: z
    .object({
      perCustomer: z.number().optional(),
      total: z.number().optional(),
    })
    .optional(),
  status: z.enum(["DRAFT", "ACTIVE", "EXPIRED", "DISABLED"]).default("DRAFT"),
  priority: z.number().default(0),
  metadata: z.object({
    createdBy: z.string(),
    updatedBy: z.string(),
    notes: z.string().optional(),
  }),
});

const validatePromotionFrom = (
  values: PromotionSchemaType
): string | undefined => {
  console.log(values);
  // Code validation
  if (values.code.length < 3 || values.code.length > 20) {
    return "Promotion code must be between 3 and 20 characters.";
  }

  // Name validation
  if (values.name.trim().length < 2 || values.name.trim().length > 50) {
    return "Promotion name must be between 2 and 50 characters.";
  }

  // Date validation
  const startDate = new Date(values.startDate);
  const endDate = new Date(values.endDate);
  const now = new Date();

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return "Invalid date format.";
  }

  if (startDate > endDate) {
    return "Start date must be before end date.";
  }

  if (endDate < now && values.status === "ACTIVE") {
    return "Cannot set expired promotion to active status.";
  }

  // Conditions validation
  if (values.conditions.length === 0 && values.actions.length === 0) {
    return "At least one condition or one action is required.";
  }

  // Validate actions
  for (const action of values.actions) {
    if (action.type === "PERCENTAGE_DISCOUNT") {
      const value = Number(action.value);
      if (isNaN(value) || value <= 0 || value > 100) {
        return "Percentage discount must be between 0 and 100.";
      }
    }

    if (action.type === "FIXED_DISCOUNT") {
      const value = Number(action.value);
      if (isNaN(value) || value <= 0) {
        return "Fixed discount must be greater than 0.";
      }
    }

    if (action.type === "BUY_X_GET_Y") {
      const value = ((action.value || "") as string).split(",");
      if (!Array.isArray(value) || value.length !== 2) {
        return "BUY_X_GET_Y must have exactly two values [x, y].";
      }
    }
  }

  // Usage limit validation
  if (values.usageLimit) {
    if (
      values.usageLimit.perCustomer !== undefined &&
      values.usageLimit.perCustomer < 1
    ) {
      return "Per customer usage limit must be at least 1.";
    }
    if (values.usageLimit.total !== undefined && values.usageLimit.total < 1) {
      return "Total usage limit must be at least 1.";
    }
  }

  // Specific combinations validation
  const hasSpecificProducts = values.conditions.some(
    (c) => c.type === "SPECIFIC_PRODUCTS"
  );
  const hasFreeProduct = values.actions.some((a) => a.type === "FREE_PRODUCT");

  if (hasFreeProduct && !hasSpecificProducts) {
    return "FREE_PRODUCT action requires SPECIFIC_PRODUCTS condition.";
  }

  return undefined;
};

export type PromotionSchemaType = z.infer<typeof promotionSchema>;
export type PromotionCondition = z.infer<typeof promotionConditionSchema>;
export type PromotionAction = z.infer<typeof promotionActionSchema>;
export { validatePromotionFrom };
