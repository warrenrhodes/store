import { benefices } from "@/utils/promotions";
import { BeneficeType, ProductType } from "../types";

export const getCollections = async () => {
  const collections = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collections`
  );

  return await collections.json();
};

export const getCollectionDetails = async (collectionId: string) => {
  const collection = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`
  );
  return await collection.json();
};

export const getProducts = async () => {
  const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  return await products.json();
};

export const getProductDetails = async (
  productId: string
): Promise<ProductType | null> => {
  const product = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
  );
  return await product.json();
};

export const getSearchedProducts = async (query: string) => {
  const searchedProducts = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/search/${query}`
  );
  return await searchedProducts.json();
};

export const getOrders = async (customerId: string) => {
  const orders = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`
  );
  return await orders.json();
};

export const getRelatedProducts = async (
  productId: string
): Promise<ProductType[] | null> => {
  const relatedProducts = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`
  );
  return await relatedProducts.json();
};

export const getProductDescriptionImage = async (
  mediaId: string
): Promise<string | null> => {
  const media = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/media/${mediaId}`
  );

  if (media.ok) {
    const url = await media.json();
    return url.mediaUrl;
  }
  return null;
};

export const getBeneficesByProductId = async (
  productId: string
): Promise<BeneficeType[] | null> => {
  return benefices.filter((e) => e.productId === productId);
};
export const getBeneficesByProductId = async (
  productId: string
): Promise<BeneficeType[] | null> => {
  return benefices.filter((e) => e.productId === productId);
};
