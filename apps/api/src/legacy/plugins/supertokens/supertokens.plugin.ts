import supertokens from 'supertokens-node';
import {
  plugin as SuperTokensNodePlugin,
  errorHandler as SuperTokensNodeErrorHandler,
} from 'supertokens-node/framework/fastify';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import ThirdPartyEmailPasswordNode from 'supertokens-node/recipe/thirdpartyemailpassword';
import Session from 'supertokens-node/recipe/session';

import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import config from '../../../config';

supertokens.init({
  framework: 'fastify',
  supertokens: {
    // try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
    // connectionURI: 'https://try.supertokens.com',
    connectionURI: config.supertokens.connectionURI,
    // apiKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/session/appinfo
    appName: config.supertokens.appName,
    apiDomain: config.supertokens.apiDomain,
    websiteDomain: config.supertokens.websiteDomain,
    apiBasePath: config.supertokens.apiBasePath,
    websiteBasePath: config.supertokens.websiteBasePath,
  },
  recipeList: [
    EmailPassword.init(),
    ThirdPartyEmailPasswordNode.init({
      providers: [
        // We have provided you with development keys which you can use for testsing.
        // IMPORTANT: Please replace them with your own OAuth keys for production use.
        ...(config.oauth.google
          ? [
              ThirdPartyEmailPasswordNode.Google({
                clientId: config.oauth.google.clientId,
                clientSecret: config.oauth.google.clientSecret,
              }),
            ]
          : []),
        ...(config.oauth.github
          ? [
              ThirdPartyEmailPasswordNode.Github({
                clientId: config.oauth.github.clientId,
                clientSecret: config.oauth.github.clientSecret,
              }),
            ]
          : []),
        ...(config.oauth.apple
          ? [
              ThirdPartyEmailPasswordNode.Apple({
                clientId: config.oauth.apple.clientId,
                clientSecret: {
                  keyId: config.oauth.apple.keyId,
                  privateKey: config.oauth.apple.privateKey,
                  teamId: config.oauth.apple.teamId,
                },
              }),
            ]
          : []),
        ...(config.oauth.facebook
          ? [
              ThirdPartyEmailPasswordNode.Facebook({
                clientSecret: config.oauth.facebook.clientSecret,
                clientId: config.oauth.facebook.clientId,
              }),
            ]
          : []),
      ],
    }),
    Session.init({
      cookieDomain: 'localhost',
    }),
  ],
});

const plugin: FastifyPluginAsync = fp(async (fastify) => {
  await fastify.register(SuperTokensNodePlugin);
  fastify.setErrorHandler(SuperTokensNodeErrorHandler());

  fastify.log.info(__filename);
});

export default plugin;
