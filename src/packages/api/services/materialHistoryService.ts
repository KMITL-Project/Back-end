import { resourceUsage } from "process";
import { DeepPartial } from "typeorm";
import { datasource } from "~/ormconfig";
import { Lot, LotMapping, Material, MaterialHistory, MaterialHistoryType } from "~/packages/database/models/models";

class MaterialHistoryService {
  private materialHistoryRepository = datasource.getRepository(MaterialHistory);

  async createMaterialHistory(materialHistoryData: Partial<MaterialHistory>): Promise<MaterialHistory> {
    try {
      const materialHistory = this.materialHistoryRepository.create(materialHistoryData);
      await this.materialHistoryRepository.save(materialHistory);
      return materialHistory;
    } catch (error) {
      throw error;
    }
  }

  async getMaterialHistoryById(id: number): Promise<MaterialHistory | null> {
    return await this.materialHistoryRepository.findOneBy({ id });
  }

  async getMaterialHistoryAll(): Promise<MaterialHistory[] | null> {
    return await this.materialHistoryRepository.find();
  }

  async updateMaterialHistory(id: number, materialHistoryData: Partial<MaterialHistory>): Promise<MaterialHistory | null> {
    try {
      let materialHistory = await this.materialHistoryRepository.findOneBy({ id });
      if (!materialHistory) {
        return null;
      }

      this.materialHistoryRepository.merge(materialHistory, materialHistoryData);
      await this.materialHistoryRepository.save(materialHistory);
      return materialHistory;
    } catch (error) {
      console.error("Error updating materialHistory:", error);
      throw error;
    }
  }

  async deleteMaterialHistory(id: number): Promise<void> {
    await this.materialHistoryRepository.delete(id);
  }
}

export const materialHistoryService = new MaterialHistoryService();
