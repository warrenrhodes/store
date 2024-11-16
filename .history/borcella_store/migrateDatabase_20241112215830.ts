import mongoose from "mongoose";
import Product from "./lib/models/Product";

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

    await Product.updateMany({}, { $set: { categories: [] } });

    // Example: Remove an old field
    await Product.updateMany({}, { $unset: { category: "", collections: "" } });

    //   // Example: Change data type (e.g., from string to number)
    //   const cursor = collection.find({});
    //   while (await cursor.hasNext()) {
    //       const doc = await cursor.next();
    //       await collection.updateOne(
    //           { _id: doc._id },
    //           { $set: { numericField: Number(doc.numericField) } }
    //       );
    //   }

    await client.disconnect();
  } catch (err) {
    console.log(err);
  }
}

migrateSchema().catch(console.error);
