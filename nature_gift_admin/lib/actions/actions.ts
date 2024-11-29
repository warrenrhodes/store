import { notFound } from "next/navigation";
import { connectToDB } from "../mongoDB";

export const getTotalSales = async () => {
  await connectToDB();
  // const orders = await Order.find();
  // const totalOrders = orders.length;
  // const totalRevenue = orders.reduce(
  //   (acc, order) => acc + order.totalAmount,
  //   0
  // );
  const totalOrders = 0;
  const totalRevenue = 0;
  return { totalOrders, totalRevenue };
};

export const getTotalCustomers = async () => {
  await connectToDB();
  // const customers = await Customer.find();
  // const totalCustomers = customers.length;
  return 0;
};

export const getSalesPerMonth = async () => {
  // await connectToDB();
  // const orders = await Order.find();

  // const salesPerMonth = orders.reduce((acc, order) => {
  //   const monthIndex = new Date(order.createdAt).getMonth(); // 0 for Janruary --> 11 for December
  //   acc[monthIndex] = (acc[monthIndex] || 0) + order.totalAmount;
  //   // For June
  //   // acc[5] = (acc[5] || 0) + order.totalAmount (orders have monthIndex 5)
  //   return acc;
  // }, {});

  // const graphData = Array.from({ length: 12 }, (_, i) => {
  //   const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
  //     new Date(0, i)
  //   );
  //   // if i === 5 => month = "Jun"
  //   return { name: month, sales: salesPerMonth[i] || 0 };
  // });

  return [];
};

export const getMediaById = async (mediaId: string): Promise<string | null> => {
  const media = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/${mediaId}`
  );
  if (media.ok) {
    const url = await media.json();
    return url.mediaUrl;
  }
  return null;
};

export const uploadImages = async (files: File[]): Promise<string | null> => {
  const formData = new FormData();
  files.forEach((file, index) => {
    formData.append(`files`, file);
  });
  const result = await fetch("/api/media/upload", {
    method: "POST",
    body: formData,
  });

  if (result.ok) {
    const data = await result.json();
    console.log(data.files[0].file.url);
    return data.files[0].file.url;
  }
  return null;
};

export async function getProducts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`
  );
  if (!response.ok) {
    console.error("Failed to fetch products");
    return [];
  }
  const products = await response.json();
  return products;
}

export async function getCategories() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories`
  );
  if (!response.ok) {
    console.error("Failed to fetch categories");
    return [];
  }
  const categories = await response.json();
  return categories;
}

export async function getBlogPostById(blogPostId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs/${blogPostId}`
  );

  if (!response.ok) {
    notFound();
  }

  return response.json();
}
