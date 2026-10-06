import { FastifyInstance } from 'fastify';
import { prisma } from '@katapedia/database';

export async function healthRoutes(app: FastifyInstance) {
  app.get('/live', async () => {
    return {
      status: 'ok',
      service: 'katapedia-des-api',
      timestamp: new Date().toISOString()
    };
  });

  app.get('/ready', async (request, reply) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return {
        status: 'ready',
        database: 'connected',
        timestamp: new Date().toISOString()
      };
    } catch (err: any) {
      reply.status(503);
      return {
        status: 'degraded',
        database: 'disconnected',
        error: err.message,
        timestamp: new Date().toISOString()
      };
    }
  });
}
