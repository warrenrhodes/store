"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const env_1 = require("@next/env");
const projectDir = process.cwd();
const { combinedEnv } = (0, env_1.loadEnvConfig)(projectDir);
// Export loaded env vars
exports.env = {
    DATABASE_URL: combinedEnv.DATABASE_URL,
    OPTIMIZE_API_KEY: combinedEnv.OPTIMIZE_API_KEY,
    // Add other env vars as needed
};
// Log to verify env loading
if (!exports.env.DATABASE_URL || !exports.env.OPTIMIZE_API_KEY) {
    console.error('env DATABASE_URL or OPTIMIZE_API_KEY is not defined in environment');
}
