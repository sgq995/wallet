import { SessionRequest } from 'supertokens-node/framework/fastify';
import { SessionContainerInterface } from 'supertokens-node/recipe/session/types';

class SessionContainerMock implements Partial<SessionContainerInterface> {
  getUserId(): string {
    return '';
  }
}

function verifySession() {
  return async function preHandler(request: SessionRequest) {
    const session = new SessionContainerMock();
    request.session = session as SessionContainerInterface;
  };
}

export const supertokensMock = {
  'supertokens-node/recipe/session/framework/fastify': { verifySession },
};
