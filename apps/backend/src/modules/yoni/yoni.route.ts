import { FastifyInstance } from 'fastify';
import { YoniController } from './yoni.controller';

export default async function (fastify: FastifyInstance) {
  fastify.register(
    async (fastify) => {
      fastify.get('/', YoniController.findAll);
      fastify.get('/:id', YoniController.findOne);
      fastify.post('/', YoniController.create);
      fastify.put('/:id', YoniController.update);
      fastify.delete('/:id', YoniController.delete);
    },
    { prefix: '/yoni' }
  );
}
