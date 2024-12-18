import mongoose from 'mongoose'

const globalWithMongoose = global as typeof globalThis & {
  mongoose: {
    conn: mongoose.Connection | null
    promise: Promise<typeof mongoose> | null
  }
}

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = {
    conn: null,
    promise: null,
  }
}

async function connectToDB() {
  if (globalWithMongoose.mongoose.conn) {
    return globalWithMongoose.mongoose.conn
  }

  if (!process.env.DATABASE_URL) {
    throw new Error('Please define the DATABASE_URL environment variable')
  }

  const opts = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    retryWrites: true,
    maxPoolSize: 10,
    minPoolSize: 1,
  }

  const promise = mongoose.connect(process.env.DATABASE_URL, opts).catch(error => {
    console.error('Failed to connect to MongoDB', error)
    throw error
  })

  globalWithMongoose.mongoose.promise = promise

  try {
    const conn = await promise
    globalWithMongoose.mongoose.conn = conn.connection
    return conn.connection
  } catch (error) {
    console.error('MongoDB connection error', error)
    throw error
  }
}

export { connectToDB }
