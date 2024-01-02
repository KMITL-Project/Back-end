import { datasource } from "~/ormconfig";
import { Material } from "~/packages/database/models/models";

class MaterialService {
  private materialRepository = datasource.getRepository(Material);

  async createMaterial(materialData: Partial<Material>): Promise<Material> {
    try {
      const material = this.materialRepository.create(materialData);
      await this.materialRepository.save(material);
      return material;
    } catch (error) {
      throw error;
    }
  }

  async getMaterialById(id: number): Promise<Material | null> {
    return await this.materialRepository.findOneBy({ id });
  }

  async getMaterialAll(): Promise<Material[] | null> {
    return await this.materialRepository.find();
  }

  async updateMaterial(id: number, materialData: Partial<Material>): Promise<Material | null> {
    let user = await this.materialRepository.findOneBy({ id });
    if (!user) {
      return null;
    }
    this.materialRepository.merge(user, materialData);
    await this.materialRepository.save(user);
    return user;
  }

  async deleteMaterial(id: number): Promise<void> {
    await this.materialRepository.delete(id);
  }
}

export const materialsService = new MaterialService();
