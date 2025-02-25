import { TaskRepository } from './task.repository';

export class TaskService {
  public static async findAll() {
    return TaskRepository.findAll();
  }

  public static async findOne(id: string) {
    return TaskRepository.findOne(id);
  }

  public static async create(data: any) {
    return TaskRepository.create(data);
  }

  public static async update(id: string, data: any) {
    return TaskRepository.update(id, data);
  }

  public static async delete(id: string) {
    return TaskRepository.delete(id);
  }
}
