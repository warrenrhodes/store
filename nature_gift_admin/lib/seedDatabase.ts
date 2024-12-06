// lib/seedDatabase.ts

import slugify from "slugify";
import Blog from "./models/Blog";
import Category from "./models/Category";
import Media from "./models/Media";
import Product from "./models/Product";
import { Promotion } from "./models/Promotions";
import Shipment from "./models/Shipment";
import { connectToDB } from "./mongoDB";
import { generateSlug } from "./utils/slugify";

/**....................................Blog view ...............................*/
/**....................................Blog view ...............................*/

const calculateReadingTime = (text: string) => {
  const wordsPerMinute = 200; // Average reading speed
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

const generateContent = () => {
  const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  return {
    type: ["TEXT", "HTML", "MARKDOWN"][Math.floor(Math.random() * 3)],
    content: text.repeat(10),
    excerpt: text.substring(0, 100),
  };
};
const generateMetadataForBlog = (authorName: string) => ({
  title: `Blog Post ${Math.floor(Math.random() * 1000)}`,
  description: "This is a sample blog post description.",
  keywords: ["sample", "blog", "post", "Mongoose"],
  author: {
    name: authorName,
    bio: "A passionate writer.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  readingTime: calculateReadingTime(generateContent().content),
  featured: Math.random() > 0.7,
});

/**....................................Product view ...............................*/
/**....................................Product view ...............................*/
// Prevent multiple seeding
let isSeeded = false;

let index: number = 0;

// Utility to generate random data
const generateRandomData = {
  title: () =>
    [
      "Organic Bamboo Tumbler",
      "Eco-Friendly Water Bottle",
      "Sustainable Plant Pot",
      "Recycled Glass Planter",
      "Natural Cotton Tote Bag",
      "Biodegradable Plant Markers",
      "Wooden Gardening Tools Set",
      "Solar-Powered Garden Light",
      "Compostable Plant Starter Kit",
      "Handcrafted Ceramic Vase",
    ][index++ % 8],

  slug: (title: string) => generateSlug(title),

  description: () => ({
    contentType: "TEXT",
    content:
      "Crafted with care, this product represents our commitment to sustainability and environmental consciousness. Made from renewable resources and designed to minimize waste, it offers both functionality and ecological responsibility.",
  }),

  price: () => ({
    regular: parseFloat((Math.random() * 100 + 10).toFixed(2)),
    sale:
      Math.random() > 0.5
        ? parseFloat((Math.random() * 50 + 5).toFixed(2))
        : undefined,
  }),

  tags: () =>
    ["eco-friendly", "sustainable", "green", "natural", "recyclable"]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3),

  metadata: (title: string) => ({
    seoTitle: `${title} - Eco-Friendly Product`,
    seoDescription:
      "Sustainable, environmentally conscious product for eco-aware consumers.",
    keywords: [
      "eco",
      "sustainable",
      "green",
      "organic",
      "environmentally friendly",
    ],
  }),
};

const generateMetadata = (name: string) => {
  return {
    seoTitle: `${name} - Explore Now`,
    seoDescription: `Discover amazing ${name} products at our store.`,
    keywords: [name, "online shop", "buy", "deals", "best prices"],
  };
};

/**....................................Shipment view ...............................*/
/**....................................Shipment view ...............................*/
const generateRandomShipment = () => {
  return new Shipment({
    method: Math.random() > 0.5 ? "DELIVERY" : "EXPEDITION",
    isActive: Math.random() > 0.2,
    cost: parseFloat((Math.random() * 50 + 10).toFixed(2)), // Random cost between 10 and 60
    locations: ["USA", "Canada", "UK", "Germany", "France", "Australia"]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3), // Pick 3 random locations
  });
};

/**....................................Promotion view ...............................*/
/**....................................Promotion view ...............................*/
const generateRandomPromotion = () => {
  const actionTypes = [
    "PERCENTAGE_DISCOUNT",
    "FIXED_DISCOUNT",
    "FREE_SHIPPING",
    "FREE_PRODUCT",
    "BUY_X_GET_Y",
  ];

  const conditionTypes = [
    "MINIMUM_QUANTITY",
    "SPECIFIC_PRODUCTS",
    "DELIVERY_METHOD",
    "LOCATION",
  ];

  const randomValueForAction = (type: any) => {
    switch (type) {
      case "PERCENTAGE_DISCOUNT":
        return Math.floor(Math.random() * 50) + 1; // Discount percentage (1-50%)
      case "FIXED_DISCOUNT":
        return parseFloat((Math.random() * 100 + 10).toFixed(2)); // Fixed amount
      case "FREE_SHIPPING":
        return "All"; // Indicates all locations
      case "FREE_PRODUCT":
        return ["Product1", "Product2", "Product3"]; // List of product IDs
      case "BUY_X_GET_Y":
        return "2,1"; // Example: Buy 2, Get 1
      default:
        return 0;
    }
  };

  return new Promotion({
    code: `PROMO-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    name: `Promotion ${Math.floor(Math.random() * 1000)}`,
    description: "This is a promotional campaign to boost sales.",
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Valid for 1 week
    conditions: [
      {
        type: conditionTypes[Math.floor(Math.random() * conditionTypes.length)],
        value: Math.random() > 0.5 ? "USA" : 5, // Example values
      },
    ],
    actions: [
      {
        type: actionTypes[Math.floor(Math.random() * actionTypes.length)],
        value:
          randomValueForAction(
            actionTypes[Math.floor(Math.random() * actionTypes.length)]
          ) || 0,
        maxDiscount:
          Math.random() > 0.5 ? Math.floor(Math.random() * 50) + 1 : undefined,
      },
    ],
    usageLimit: {
      perCustomer: Math.floor(Math.random() * 5) + 1,
      total: Math.floor(Math.random() * 100) + 10,
    },
    status: ["DRAFT", "ACTIVE", "EXPIRED", "DISABLED"][
      Math.floor(Math.random() * 4)
    ],
    priority: Math.floor(Math.random() * 10),
    metadata: {
      createdBy: "admin",
      updatedBy: "admin",
      notes: "Automatically generated promotion.",
    },
  });
};

// Seed function
export async function seedDatabase() {
  // Check if already seeded
  if (isSeeded) {
    console.log("Database already seeded. Skipping...");
    return;
  }

  try {
    // Connect to database
    await connectToDB();

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Shipment.deleteMany({});
    await Promotion.deleteMany({});
    await Blog.deleteMany({});

    const mediaFiles = await Media.find(); // Limit to 10 media files
    const mediaIds = mediaFiles.map((media) => media._id);

    // Create Categories
    const categories = [];
    for (let i = 0; i < 10; i++) {
      const name = `Category ${i + 1}`;
      const category: any = new Category({
        name,
        slug: generateSlug(name),
        description: `Description for ${name}`,
        image:
          mediaIds.length > 0
            ? mediaIds[Math.floor(Math.random() * mediaIds.length)]
            : null,
        featured: Math.random() > 0.5,
        parent:
          i > 2
            ? categories[Math.floor(Math.random() * categories.length)]._id
            : null, // Assign parent to some categories
        metadata: generateMetadata(name),
      });

      categories.push(await category.save());
    }

    // Generate Products
    const products = [];
    for (let i = 0; i < 8; i++) {
      const title = generateRandomData.title();
      const product = new Product({
        title,
        slug: generateSlug(title),
        description: generateRandomData.description(),
        media: [
          mediaIds[Math.floor(Math.random() * mediaIds.length)],
          mediaIds[Math.floor(Math.random() * mediaIds.length)],
          mediaIds[Math.floor(Math.random() * mediaIds.length)],
        ],
        categories: [
          categories[Math.floor(Math.random() * categories.length)]._id,
        ],
        tags: generateRandomData.tags(),
        price: generateRandomData.price(),
        isFeature: Math.random() > 0.7,
        isNewProduct: Math.random() > 0.8,
        status: ["draft", "published", "archived"][
          Math.floor(Math.random() * 3)
        ],
        inventory: {
          quantity: Math.floor(Math.random() * 100),
          lowStockThreshold: 5,
          stockQuantity: Math.floor(Math.random() * 100),
        },
        parternId: `PARTNER-${Math.random().toString(36).substr(2, 9)}`,
        metadata: generateRandomData.metadata(title),
        features: [
          {
            title: "Sustainability",
            description: {
              contentType: "TEXT",
              content: "This product is eco-friendly and sustainable.",
            },
          },
        ],
      });
      products.push(await product.save());
    }

    const shipments = [];
    for (let i = 0; i < 10; i++) {
      shipments.push(await generateRandomShipment().save());
    }

    const promotions = [];
    for (let i = 0; i < 10; i++) {
      promotions.push(await generateRandomPromotion().save());
    }

    const blogs = [];
    for (let i = 0; i < 10; i++) {
      const title = `Sample Blog Title ${i + 1}`;
      const blog = new Blog({
        slug: slugify(title, { lower: true, strict: true }),
        title,
        content: generateContent(),
        metadata: generateMetadataForBlog(`Author ${i + 1}`),
        categories: categories
          .slice(0, Math.floor(Math.random() * categories.length) + 1)
          .map((cat) => cat._id),
        tags: ["tag1", "tag2", "tag3"].slice(
          0,
          Math.floor(Math.random() * 3) + 1
        ),
        status: ["DRAFT", "PUBLISHED", "ARCHIVED"][
          Math.floor(Math.random() * 3)
        ],
        publishedAt: Math.random() > 0.5 ? new Date() : null,
        customFields: new Map([
          ["field1", "value1"],
          ["field2", "value2"],
        ]),
        layout: ["DEFAULT", "FEATURED", "MINIMAL"][
          Math.floor(Math.random() * 3)
        ],
        comments: Math.random() > 0.5,
      });

      // Assign a random cover image
      if (mediaIds.length > 0) {
        blog.metadata.coverImage =
          mediaIds[Math.floor(Math.random() * mediaIds.length)];
      }

      blogs.push(await blog.save());
    }

    console.log("Database seeded successfully!");
    isSeeded = true;
  } catch (error) {
    console.error("Seeding error:", error);
    throw error;
  }
}

// Only seed in development
if (process.env.NODE_ENV === "development" && process.env.SEED_DB === "true") {
  (async () => {
    try {
      await seedDatabase();
    } catch (error) {
      console.error("Seed initialization error:", error);
    }
  })();
}
