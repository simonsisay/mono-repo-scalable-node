import { FastifyRequest, FastifyReply } from "fastify";
import { TestingService } from "./testing.service";
import { TestingSchema } from "./testing.schema";

export class TestingController {
  public static async findAll(req: FastifyRequest, res: FastifyReply) {
    const data = await TestingService.findAll();
    return res.send({ success: true, data });
  }

  public static async findOne(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
    const data = await TestingService.findOne(req.params.id);
    return res.send({ success: true, data });
  }

  public static async create(req: FastifyRequest<{ Body: any }>, res: FastifyReply) {
    try {
      const validatedData = TestingSchema.parse(req.body);
      const data = await TestingService.create(validatedData);
      return res.status(201).send({ success: true, data });
    } catch (err) {
      return res.status(400).send({ success: false, message: err.errors });
    }
  }

  public static async update(req: FastifyRequest<{ Params: { id: string }, Body: any }>, res: FastifyReply) {
    const data = await TestingService.update(req.params.id, req.body);
    return res.send({ success: true, data });
  }

  public static async delete(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
    await TestingService.delete(req.params.id);
    return res.send({ success: true, message: "Deleted successfully" });
  }
}
