import { PrismaClient } from '@prisma/client';
import { SessionRequest } from 'supertokens-node/framework/fastify';

export async function getProfileId(
  session: Required<SessionRequest>['session'],
  prisma: PrismaClient
): Promise<number> {
  const userId = session.getUserId();
  const profile = await prisma.profile.findUnique({
    where: { userId },
    rejectOnNotFound: true,
  });

  return profile.id;
}

export async function createProfile(
  session: Required<SessionRequest>['session'],
  prisma: PrismaClient
): Promise<number> {
  const userId = session.getUserId();
  const profile = await prisma.profile.create({
    data: {
      userId,
    },
  });

  return profile.id;
}

export async function getOrCreateProfileId(
  session: Required<SessionRequest>['session'],
  prisma: PrismaClient
): Promise<number> {
  try {
    return await getProfileId(session, prisma);
  } catch (e) {
    return await createProfile(session, prisma);
  }
}
