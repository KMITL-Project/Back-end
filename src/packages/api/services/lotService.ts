import { datasource } from "~/ormconfig";
import { Lot } from "~/packages/database/models/models";

class LotService {
  private userRepository = datasource.getRepository(Lot);

  async createLot(materialData: Partial<Lot>): Promise<Lot> {
    try {
      const material = this.userRepository.create(materialData);
      await this.userRepository.save(material);
      return material;
    } catch (error) {
      throw error;
    }
  }

  async getLotById(id: number): Promise<Lot | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async updateLot(id: number, materialData: Partial<Lot>): Promise<Lot | null> {
    let user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return null;
    }
    this.userRepository.merge(user, materialData);
    await this.userRepository.save(user);
    return user;
  }

  async deleteLot(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}

export const lotService = new LotService();
