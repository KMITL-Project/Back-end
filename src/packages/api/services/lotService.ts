import { datasource } from "~/ormconfig";
import { Lot, LotMapping, Material } from "~/packages/database/models/models";

class LotService {
  private lotRepository = datasource.getRepository(Lot);

  async createLot(lotData: Partial<Lot>, materialId: number): Promise<Partial<Lot>> {
    return await datasource.transaction(async (transactionalEntityManager) => {
      try {
        const lot = transactionalEntityManager.create(Lot, lotData);
        await transactionalEntityManager.save(Lot, lot);

        const lotMapping = transactionalEntityManager.create(LotMapping, { material_id: materialId, lot_id: lot.id });
        await transactionalEntityManager.save(LotMapping, lotMapping);

        const material = await transactionalEntityManager.findOneBy(Material, { id: materialId });
        material.total += Number(lot.amount);
        await transactionalEntityManager.save(Material, material);

        return lot;
      } catch (error) {
        throw error;
      }
    });
  }

  async getLotById(id: number): Promise<Lot | null> {
    return await this.lotRepository.findOneBy({ id });
  }

  async updateLot(id: number, lotData: Partial<Lot>): Promise<Lot | null> {
    let lot = await this.lotRepository.findOneBy({ id });
    if (!lot) {
      return null;
    }
    this.lotRepository.merge(lot, lotData);
    await this.lotRepository.save(lot);
    return lot;
  }

  async deleteLot(id: number): Promise<void> {
    await this.lotRepository.delete(id);
  }
}

export const lotService = new LotService();
