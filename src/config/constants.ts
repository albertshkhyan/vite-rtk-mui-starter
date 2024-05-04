export enum AuthStorageKeys {
  USER = "user",
  ACCESS_TOKEN = "ACCESS",
  REFRESH_TOKEN = "REFRESH",
  REMEMBER_ME = "rememberMe",
}

export const STRIPE_PUBLISHABLE_KEY =
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || "";

export const PHONE_REGEX = /^(1\s?)?(\d|\(\d\))[\s\-]?\d[\s\-]?\d{4}$/;

const AWS_S3_BUCKET_NAME: string = process.env.REACT_APP_S3_BUCKET_NAME || "";

export const AMAZON_S3_CDN_URL = `https://${AWS_S3_BUCKET_NAME}.s3.amazonaws.com`;
