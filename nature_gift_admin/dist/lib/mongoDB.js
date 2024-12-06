"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let isConnected = false;
const connectToDB = async () => {
    mongoose_1.default.set('strictQuery', true);
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL is not defined in environment variables');
        }
        const options = {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
            retryWrites: true,
            maxPoolSize: 10, // Maintain up to 10 socket connections
            minPoolSize: 1, // Minimum number of socket connections
        };
        await mongoose_1.default.connect(process.env.DATABASE_URL, options);
        isConnected = true;
        console.log('MongoDB is connected');
    }
    catch (err) {
        console.log(err);
    }
};
exports.connectToDB = connectToDB;
