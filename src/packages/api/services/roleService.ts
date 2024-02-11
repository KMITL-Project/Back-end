import { datasource } from '~/ormconfig';
import { Role } from '~/packages/database/models/models';

class RoleService {
  private roleRepository = datasource.getRepository(Role);

  async createRole(roleData: Partial<Role>): Promise<Role> {
    try {
      const role = this.roleRepository.create(roleData);
      await this.roleRepository.save(role);
      return role;
    } catch (error) {
      console.error('An error occurred: ', error);
      throw error;
    }
  }

  async getRoleById(id: number): Promise<Role | null> {
    return await this.roleRepository.findOneBy({ id });
  }

  async getRoleAll(): Promise<Role[] | null> {
    return await this.roleRepository.find();
  }

  async updateRole(id: number, roleData: Partial<Role>): Promise<Role | null> {
    try {
      const role = await this.roleRepository.findOneBy({ id });
      if (!role) {
        return null;
      }

      this.roleRepository.merge(role, roleData);
      await this.roleRepository.save(role);
      return role;
    } catch (error) {
      console.error('Error updating role:', error);
      throw error;
    }
  }

  async deleteRole(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }
}

export const roleService = new RoleService();
