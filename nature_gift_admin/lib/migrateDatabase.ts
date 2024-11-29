import mongoose from "mongoose";
import Product from "./models/Product";

async function migrateSchema() {
  mongoose.set("strictQuery", true);

  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }

    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      retryWrites: true,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 1, // Minimum number of socket connections
    };
    const client = await mongoose.connect(process.env.MONGODB_URL, options);

    // await Product.updateMany({}, { $set: { categories: [] } });

    // Example: Remove an old field
    await Product.updateMany(
      { "features.icon": { $exists: true } },
      {
        $unset: { "features.$[].icon": "" },
        $set: { migratedFeatures: true },
      },
      {
        multi: true, // Ensure multiple documents can be updated
      }
    );

    await client.disconnect();
  } catch (err) {
    console.log(err);
  }
}

migrateSchema().catch(console.error);
