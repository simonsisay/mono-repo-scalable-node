import * as path from 'path';
import { FastifyInstance } from 'fastify';
import AutoLoad from '@fastify/autoload';

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  // Place here your custom code!

  // Do not touch the following lines
  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application

  // Print files in modules directory

  console.log('🔄 Auto-loading modules...');
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, '../infra/plugins'),
    options: { ...opts },
  });

  // This loads all modules defined in routes
  // define your routes in one of these
  // ✅ Wrap the entire AutoLoad inside a parent prefix
  fastify.register(
    async function (apiRoutes) {
      apiRoutes.register(AutoLoad, {
        dir: path.join(__dirname, '../modules'),
        indexPattern: /.*\.route(\.ts|\.js)$/, // Ensure it loads `*.route.ts`
        options: { ...opts },
        dirNameRoutePrefix: false,
      });
    },
    { prefix: '/api' }
  );

  console.log('✅ Modules loaded successfully!');
}
