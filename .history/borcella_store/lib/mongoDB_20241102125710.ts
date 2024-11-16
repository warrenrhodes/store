import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      retryWrites: true,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 1, // Minimum number of socket connections
    };
    await mongoose.connect(process.env.MONGODB_URL, options);

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (err) {
    console.log(err);
  }
};
