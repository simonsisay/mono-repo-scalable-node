import { FastifyInstance } from 'fastify';
import { TestingController } from './testing.controller';

export default async function (fastify: FastifyInstance) {
  fastify.register(
    async (fastify) => {
      fastify.get('/', TestingController.findAll);
      fastify.get('/:id', TestingController.findOne);
      fastify.post('/', TestingController.create);
      fastify.put('/:id', TestingController.update);
      fastify.delete('/:id', TestingController.delete);
    },
    { prefix: '/testing' }
  );
}
