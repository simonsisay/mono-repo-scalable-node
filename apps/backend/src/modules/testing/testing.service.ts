import { TestingRepository } from "./testing.repository";

export class TestingService {
  public static async findAll() {
    return TestingRepository.findAll();
  }

  public static async findOne(id: string) {
    return TestingRepository.findOne(id);
  }

  public static async create(data: any) {
    return TestingRepository.create(data);
  }

  public static async update(id: string, data: any) {
    return TestingRepository.update(id, data);
  }

  public static async delete(id: string) {
    return TestingRepository.delete(id);
  }
}
