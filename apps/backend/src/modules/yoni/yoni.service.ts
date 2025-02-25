import { YoniRepository } from './yoni.repository';

export class YoniService {
  public static async findAll() {
    return YoniRepository.findAll();
  }

  public static async findOne(id: string) {
    return YoniRepository.findOne(id);
  }

  public static async create(data: any) {
    return YoniRepository.create(data);
  }

  public static async update(id: string, data: any) {
    return YoniRepository.update(id, data);
  }

  public static async delete(id: string) {
    return YoniRepository.delete(id);
  }
}
