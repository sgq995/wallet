import supertokens from 'supertokens-node';
import {
  plugin as SuperTokensNodePlugin,
  errorHandler as SuperTokensNodeErrorHandler,
} from 'supertokens-node/framework/fastify';
import ThirdPartyEmailPasswordNode from 'supertokens-node/recipe/thirdpartyemailpassword';
import Session from 'supertokens-node/recipe/session';

import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

supertokens.init({
  framework: 'fastify',
  supertokens: {
    // try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
    // connectionURI: 'https://try.supertokens.com',
    connectionURI: 'http://supertokens:3567',
    // apiKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/session/appinfo
    appName: 'Personal Budget',
    apiDomain: 'http://localhost:5000',
    websiteDomain: 'http://localhost:3000',
    apiBasePath: '/v1/auth',
    websiteBasePath: '/auth',
  },
  recipeList: [
    ThirdPartyEmailPasswordNode.init({
      providers: [
        // We have provided you with development keys which you can use for testsing.
        // IMPORTANT: Please replace them with your own OAuth keys for production use.
        ThirdPartyEmailPasswordNode.Google({
          clientId:
            '1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com',
          clientSecret: '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',
        }),
        ThirdPartyEmailPasswordNode.Github({
          clientId: '467101b197249757c71f',
          clientSecret: 'e97051221f4b6426e8fe8d51486396703012f5bd',
        }),
        ThirdPartyEmailPasswordNode.Apple({
          clientId: '4398792-io.supertokens.example.service',
          clientSecret: {
            keyId: '7M48Y4RYDL',
            privateKey:
              '-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----',
            teamId: 'YWQCXGJRJL',
          },
        }),
        // ThirdPartyEmailPasswordNode.Facebook({
        //   clientSecret: "FACEBOOK_CLIENT_SECRET",
        //   clientId: "FACEBOOK_CLIENT_ID",
        // }),
      ],
    }),
    Session.init({
      cookieDomain: 'localhost',
    }),
  ],
});

const plugin: FastifyPluginAsync = fp(async (fastify, options) => {
  await fastify.register(SuperTokensNodePlugin);
  await fastify.setErrorHandler(SuperTokensNodeErrorHandler());

  fastify.log.info(__filename);
});

export default plugin;
