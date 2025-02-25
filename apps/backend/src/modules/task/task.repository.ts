export class TaskRepository {
  private static data: any[] = []; // Simulated database

  public static async findAll() {
    return this.data;
  }

  public static async findOne(id: string) {
    return this.data.find((item) => item.id === id);
  }

  public static async create(data: any) {
    data.id = (this.data.length + 1).toString();
    this.data.push(data);
    return data;
  }

  public static async update(id: string, newData: any) {
    const index = this.data.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...newData };
      return this.data[index];
    }
    return null;
  }

  public static async delete(id: string) {
    this.data = this.data.filter((item) => item.id !== id);
  }
}
