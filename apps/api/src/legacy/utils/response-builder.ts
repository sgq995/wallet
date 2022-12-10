import { FastifyReply } from 'fastify';

export function replyOK<T>(reply: FastifyReply, data: T) {
  return reply.status(200).send({
    statusCode: 200,
    data,
  });
}

export function replyCreated<T>(reply: FastifyReply, data: T) {
  return reply.status(201).send({
    statusCode: 201,
    data,
  });
}

export function replyNotFound(reply: FastifyReply, message: string) {
  return reply.status(404).send({
    statusCode: 404,
    error: 'Not Found',
    message,
  });
}

export function replyForbidden(reply: FastifyReply, message: string) {
  return reply.status(403).send({
    statusCode: 403,
    error: 'Forbidden',
    message,
  });
}
