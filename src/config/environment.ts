"use strict";
import dotenv from "dotenv";
import { Environment, AppEnv, HttpLogger } from "../types/Environment";

dotenv.config(); // Load environment variables from .env

// Validate and assign NODE_ENV safely
const nodeEnvValue = process.env.NODE_ENV as AppEnv;
const APP_ENV: AppEnv = nodeEnvValue && Object.values(AppEnv).includes(nodeEnvValue) ? nodeEnvValue : AppEnv.Development;

// Validate and assign HTTP_REQUEST_LOGGER safely
const httpLoggerValue = process.env.HTTP_REQUEST_LOGGER as HttpLogger;
const HTTP_REQUEST_LOGGER: HttpLogger = Object.values(HttpLogger).includes(httpLoggerValue) ? httpLoggerValue : HttpLogger.Dev;

const environment: Environment = {
  PORT: process.env.PORT || "3000",
  DATABASE_URL: process.env.DATABASE_URL || "mongodb://localhost:27017/mydb",
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
  APP_ENV: APP_ENV,
  HTTP_REQUEST_LOGGER: HTTP_REQUEST_LOGGER,
};
export default environment;
