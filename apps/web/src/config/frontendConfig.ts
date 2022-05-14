import ThirdPartyEmailPasswordReact from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import SessionReact from 'supertokens-auth-react/recipe/session';
import { appInfo } from './appInfo';
import config from '.';

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordReact.init({
        signInAndUpFeature: {
          providers: [
            ...(config.oauth.google.enabled
              ? [ThirdPartyEmailPasswordReact.Google.init()]
              : []),
            ...(config.oauth.facebook.enabled
              ? [ThirdPartyEmailPasswordReact.Facebook.init()]
              : []),
            ...(config.oauth.github.enabled
              ? [ThirdPartyEmailPasswordReact.Github.init()]
              : []),
            ...(config.oauth.apple.enabled
              ? [ThirdPartyEmailPasswordReact.Apple.init()]
              : []),
          ],
        },
      }),
      SessionReact.init({
        cookieDomain: 'localhost',
      }),
    ],
  };
};
