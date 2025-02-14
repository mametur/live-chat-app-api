export enum AppEnv {
  Development = "development",
  Production = "production",
  Test = "test",
}

export enum HttpLogger {
  Dev = "dev",
  Combined = "combined",
  Common = "common",
  Short = "short",
  Tiny = "tiny",
}

export interface Environment {
  PORT: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  APP_ENV: AppEnv;
  HTTP_REQUEST_LOGGER: HttpLogger;
}
