const config = {
  app: {
    apiBaseUrl:
      process.env.NEXT_PUBLIC_APP_API_BASE_URL ?? 'http://localhost:5000',
  },
  supertokens: {
    appName: process.env.NEXT_PUBLIC_SUPERTOKENS_APP_NAME ?? 'Personal Budget',
    apiDomain:
      process.env.NEXT_PUBLIC_SUPERTOKENS_API_DOMAIN ?? 'http://localhost:5000',
    websiteDomain:
      process.env.NEXT_PUBLIC_SUPERTOKENS_WEBSITE_DOMAIN ??
      'http://localhost:3000',
    apiBasePath:
      process.env.NEXT_PUBLIC_SUPERTOKENS_API_BASE_PATH ?? '/v1/auth',
    websiteBasePath:
      process.env.NEXT_PUBLIC_SUPERTOKENS_WEBSITE_BASE_PATH ?? '/auth',
  },
  oauth: {
    google: {
      enabled: !!process.env.NEXT_PUBLIC_OAUTH_GOOGLE_ENABLED,
    },
    github: {
      enabled: !!process.env.NEXT_PUBLIC_OAUTH_GITHUB_ENABLED,
    },
    apple: {
      enabled: !!process.env.NEXT_PUBLIC_OAUTH_APPLE_ENABLED,
    },
    facebook: {
      enabled: !!process.env.NEXT_PUBLIC_OAUTH_FACEBOOK_ENABLED,
    },
  },
};

export default config;
