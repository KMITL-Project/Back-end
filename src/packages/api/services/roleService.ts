import { EntityManager } from 'typeorm';
import { datasource } from '~/ormconfig';
import { Role, RoleMapping } from '~/packages/database/models/models';
import { CustomError } from '../errors/customerError';

class RoleService {
  private roleRepository = datasource.getRepository(Role);
  private roleMappingRepository = datasource.getRepository(RoleMapping);

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

  async addRoleToUser(userId: number, roleId: number): Promise<RoleMapping> {
    return await datasource.transaction(async (transactionalEntityManager: EntityManager) => {
      try {
        const roleMappingRepository = transactionalEntityManager.getRepository(RoleMapping);

        const existingMapping = await roleMappingRepository.findOne({
          where: {
            user_id: userId,
            role_id: roleId,
          },
        });

        if (existingMapping) {
          console.error('User already has this role.');
          throw new CustomError('User already has this role.', 400);
        }

        const role = roleMappingRepository.create({
          user_id: userId,
          role_id: roleId,
        });

        return await roleMappingRepository.save(role);
      } catch (error) {
        console.error('An error occurred: ', error);
        throw error;
      }
    });
  }

  async getRolesByUserId(userId: number): Promise<Role[]> {
    const roleMapping = await this.roleMappingRepository.find({
      where: {
        user_id: userId,
      },
      relations: ['role'],
    });

    const role = roleMapping.map((roleMap) => roleMap.role);
    return role;
  }
}

export const roleService = new RoleService();
