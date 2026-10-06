import fastify from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import dotenv from 'dotenv';
import { healthRoutes } from './modules/health/health.routes.js';
import { authRoutes } from './modules/auth/auth.routes.js';
import { candidateRoutes } from './modules/candidates/candidates.routes.js';
import { contentRoutes } from './modules/contents/contents.routes.js';
import { scoringRoutes } from './modules/scoring/scoring.routes.js';
import { roadmapRoutes } from './modules/roadmap/roadmap.routes.js';
import { cohortRoutes } from './modules/cohorts/cohorts.routes.js';
import { aiRoutes } from './modules/ai/ai.routes.js';
import { dashboardRoutes } from './modules/dashboard/dashboard.routes.js';

dotenv.config();

const app = fastify({
  logger: {
    transport:
      process.env.NODE_ENV !== 'production'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname'
            }
          }
        : undefined
  }
});

async function main() {
  // Plugins
  await app.register(cors, {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  });

  await app.register(cookie, {
    secret: process.env.SESSION_SECRET || 'katapedia-session-secret-change-in-production'
  });

  // Swagger Documentation
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'Katapedia DES API',
        description: 'REST API untuk Digital Electability Dashboard (DED) & Metodologi DES Katapedia',
        version: '1.0.0'
      },
      servers: [
        {
          url: 'http://localhost:4000',
          description: 'Development Server'
        }
      ]
    }
  });

  await app.register(swaggerUi, {
    routePrefix: '/documentation'
  });

  // Health routes
  await app.register(healthRoutes, { prefix: '/health' });

  // Core API v1 routes
  await app.register(authRoutes, { prefix: '/api/v1/auth' });
  await app.register(candidateRoutes, { prefix: '/api/v1' });
  await app.register(contentRoutes, { prefix: '/api/v1' });
  await app.register(scoringRoutes, { prefix: '/api/v1' });
  await app.register(roadmapRoutes, { prefix: '/api/v1' });
  await app.register(cohortRoutes, { prefix: '/api/v1' });
  await app.register(aiRoutes, { prefix: '/api/v1' });
  await app.register(dashboardRoutes, { prefix: '/api/v1' });

  const port = Number(process.env.PORT) || 4000;
  await app.listen({ port, host: '0.0.0.0' });
  console.log(`🚀 Katapedia DES API server is running on http://localhost:${port}`);
  console.log(`📖 OpenAPI documentation available at http://localhost:${port}/documentation`);
}

main().catch((err) => {
  app.log.error(err);
  process.exit(1);
});
