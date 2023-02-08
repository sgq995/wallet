import dotenv from 'dotenv';
dotenv.config();

export default {
  app: {
    host: process.env.APP_HOST ?? '0.0.0.0',
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 5000,
    transactions: {
      readLimit: process.env.APP_TRANSACTIONS_READ_LIMIT
        ? parseInt(process.env.APP_TRANSACTIONS_READ_LIMIT)
        : 10,
    },
    accounts: {
      readLimit: process.env.APP_ACCOUNTS_READ_LIMIT
        ? parseInt(process.env.APP_ACCOUNTS_READ_LIMIT)
        : 10,
    },
  },
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') ?? 'http://localhost:3000',
  },
  supertokens: {
    connectionURI:
      process.env.SUPERTOKENS_CONNECTION_URI ?? 'http://localhost:3567',
    appName: process.env.SUPERTOKENS_APP_NAME ?? 'Personal Budget',
    apiDomain: process.env.SUPERTOKENS_API_DOMAIN ?? 'http://localhost:5000',
    websiteDomain:
      process.env.SUPERTOKENS_WEBSITE_DOMAIN ?? 'http://localhost:3000',
    apiBasePath: process.env.SUPERTOKENS_API_BASE_PATH ?? '/v1/auth',
    websiteBasePath: process.env.SUPERTOKENS_WEBSITE_BASE_PATH ?? '/auth',
  },
  oauth: {
    google: {
      enabled: !!process.env.OAUTH_GOOGLE_ENABLED,
      clientId:
        process.env.OAUTH_GOOGLE_CLIENT_ID ??
        '1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com',
      clientSecret:
        process.env.OAUTH_GOOGLE_CLIENT_SECRET ??
        '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',
    },
    github: {
      enabled: !!process.env.OAUTH_GITHUB_ENABLED,
      clientId: process.env.OAUTH_GITHUB_CLIENT_ID ?? '467101b197249757c71f',
      clientSecret:
        process.env.OAUTH_GITHUB_CLIENT_SECRET ??
        'e97051221f4b6426e8fe8d51486396703012f5bd',
    },
    apple: {
      enabled: !!process.env.OAUTH_APPLE_ENABLED,
      clientId:
        process.env.OAUTH_APPLE_CLIENT_ID ??
        '4398792-io.supertokens.example.service',
      keyId: process.env.OAUTH_APPLE_KEY_ID ?? '7M48Y4RYDL',
      privateKey:
        process.env.OAUTH_APPLE_PRIVATE_KEY ??
        '-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----',
      teamId: process.env.OAUTH_APPLE_TEAM_ID ?? 'YWQCXGJRJL',
    },
    facebook: {
      enabled: !!process.env.OAUTH_FACEBOOK_ENABLED,
      clientSecret:
        process.env.OAUTH_FACEBOOK_CLIENT_SECRET ?? 'FACEBOOK_CLIENT_SECRET',
      clientId: process.env.OAUTH_FACEBOOK_CLIENT_ID ?? 'FACEBOOK_CLIENT_ID',
    },
  },
};
