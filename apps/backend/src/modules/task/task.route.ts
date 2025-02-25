import { FastifyInstance } from 'fastify';
import { TaskController } from './task.controller';

export default async function (fastify: FastifyInstance) {
  fastify.register(
    async (fastify) => {
      fastify.get('/', TaskController.findAll);
      fastify.get('/:id', TaskController.findOne);
      fastify.post('/', TaskController.create);
      fastify.put('/:id', TaskController.update);
      fastify.delete('/:id', TaskController.delete);
    },
    { prefix: '/task' }
  );
}
