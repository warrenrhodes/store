import mongoose from "mongoose";
import { seedDatabase } from "../lib/seedDatabase";
import { connectToDB } from "../lib/mongoDB";
import "../envConfig";

async function runSeed() {
  try {
    console.log("Starting database seeding...");

    // Connect to database
    await connectToDB();

    // Run seed function
    await seedDatabase();

    console.log("Seeding completed successfully.");

    // Close the connection
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

runSeed();
