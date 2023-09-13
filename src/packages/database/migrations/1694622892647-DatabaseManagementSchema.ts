import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import config from "~/config";

export class DatabaseManagementSchema1694622892647 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create enum
    await queryRunner.query(`CREATE TYPE "${config.DB.MAIN_SCHEMA}"."type" AS ENUM ('withdraw', 'add', 'remove', 'use')`);

    // Create Users table
    await queryRunner.createTable(
      new Table({
        name: config.DB.MAIN_SCHEMA + "." + "users",
        columns: [
          { name: "id", type: "integer", isPrimary: true },
          { name: "image_url", type: "varchar", isNullable: true },
          { name: "full_name", type: "varchar" },
          { name: "username", type: "varchar" },
          { name: "password", type: "varchar" },
          { name: "update_at", type: "timestamp", isNullable: true },
          { name: "created_at", type: "timestamp", isNullable: true },
        ],
      }),
      true,
    );

    // Create Roles table
    await queryRunner.createTable(
      new Table({
        name: config.DB.MAIN_SCHEMA + "." + "roles",
        columns: [
          { name: "id", type: "integer", isPrimary: true },
          { name: "name", type: "varchar" },
          { name: "update_at", type: "timestamp", isNullable: true },
          { name: "created_at", type: "timestamp", isNullable: true },
        ],
      }),
      true,
    );

    // Create Permissions table
    await queryRunner.createTable(
      new Table({
        name: config.DB.MAIN_SCHEMA + "." + "permissions",
        columns: [
          { name: "id", type: "integer", isPrimary: true },
          { name: "name", type: "varchar" },
          { name: "action", type: "varchar" },
          { name: "update_at", type: "timestamp", isNullable: true },
          { name: "created_at", type: "timestamp", isNullable: true },
        ],
      }),
      true,
    );

    // Create Materials table
    await queryRunner.createTable(
      new Table({
        name: config.DB.MAIN_SCHEMA + "." + "materials",
        columns: [
          { name: "id", type: "integer", isPrimary: true },
          { name: "name", type: "varchar" },
          { name: "image_url", type: "varchar", isNullable: true },
          { name: "detail", type: "varchar" },
          { name: "storage_id", type: "integer" },
          { name: "total", type: "integer" },
          { name: "unit_id", type: "integer" },
          { name: "update_at", type: "timestamp", isNullable: true },
          { name: "created_at", type: "timestamp", isNullable: true },
        ],
      }),
      true,
    );

    // Create Units table
    await queryRunner.createTable(
      new Table({
        name: config.DB.MAIN_SCHEMA + "." + "units",
        columns: [
          { name: "id", type: "integer", isPrimary: true },
          { name: "name", type: "varchar" },
          { name: "update_at", type: "timestamp", isNullable: true },
          { name: "created_at", type: "timestamp", isNullable: true },
        ],
      }),
      true,
    );

    // Create Stores table
    await queryRunner.createTable(
      new Table({
        name: config.DB.MAIN_SCHEMA + "." + "stores",
        columns: [
          { name: "id", type: "integer", isPrimary: true },
          { name: "image_url", type: "varchar", isNullable: true },
          { name: "floor_id", type: "integer", isPrimary: true },
          { name: "update_at", type: "timestamp", isNullable: true },
          { name: "created_at", type: "timestamp", isNullable: true },
        ],
      }),
      true,
    );

    // Create Shelves table
    await queryRunner.createTable(
      new Table({
        name: config.DB.MAIN_SCHEMA + "." + "shelves",
        columns: [
          { name: "id", type: "integer", isPrimary: true },
          { name: "image_url", type: "varchar", isNullable: true },
          { name: "name", type: "varchar" },
          { name: "detail", type: "varchar", isNullable: true },
          { name: "update_at", type: "timestamp", isNullable: true },
          { name: "created_at", type: "timestamp", isNullable: true },
        ],
      }),
      true,
    );

    // Create Floors table
    await queryRunner.createTable(
      new Table({
        name: config.DB.MAIN_SCHEMA + "." + "floors",
        columns: [
          { name: "id", type: "integer", isPrimary: true },
          { name: "shelf_id", type: "integer" },
          { name: "image_url", type: "varchar", isNullable: true },
          { name: "name", type: "varchar" },
          { name: "detail", type: "varchar", isNullable: true },
          { name: "update_at", type: "timestamp", isNullable: true },
          { name: "created_at", type: "timestamp", isNullable: true },
        ],
      }),
      true,
    );

    // Create Customers table
    await queryRunner.createTable(
      new Table({
        name: config.DB.MAIN_SCHEMA + "." + "customers",
        columns: [
          { name: "id", type: "integer", isPrimary: true },
          { name: "full_name", type: "varchar" },
          { name: "address", type: "varchar", isNullable: true },
          { name: "update_at", type: "timestamp", isNullable: true },
          { name: "created_at", type: "timestamp", isNullable: true },
        ],
      }),
      true,
    );

    // Create Orders table
    await queryRunner.createTable(
      new Table({
        name: config.DB.MAIN_SCHEMA + "." + "orders",
        columns: [
          { name: "id", type: "integer", isPrimary: true },
          { name: "customer_id", type: "integer" },
          { name: "name", type: "varchar" },
          { name: "detail", type: "varchar", isNullable: true },
          { name: "address", type: "varchar", isNullable: true },
          { name: "send_date", type: "timestamp", isNullable: true },
          { name: "latitude", type: "varchar", isNullable: true },
          { name: "longitude", type: "varchar", isNullable: true },
          { name: "update_at", type: "timestamp", isNullable: true },
          { name: "created_at", type: "timestamp", isNullable: true },
        ],
      }),
      true,
    );

    // Create Material History table
    await queryRunner.createTable(
      new Table({
        name: config.DB.MAIN_SCHEMA + "." + "material_history",
        columns: [
          { name: "id", type: "integer", isPrimary: true },
          { name: "material_id", type: "integer" },
          { name: "name", type: "varchar" },
          { name: "type", type: "enum", enum: ["withdraw", "add", "remove", "use"] },
          { name: "update_at", type: "timestamp", isNullable: true },
          { name: "created_at", type: "timestamp", isNullable: true },
        ],
      }),
      true,
    );

    // Foreign keys for Lot Mapping table
    await queryRunner.createTable(
      new Table({
        name: config.DB.MAIN_SCHEMA + "." + "lot_mapping",
        columns: [
          { name: "material_id", type: "integer" },
          { name: "lot_id", type: "integer" },
          { name: "update_at", type: "timestamp", isNullable: true },
          { name: "created_at", type: "timestamp", isNullable: true },
        ],
      }),
      true,
    );

    // Create the Lots table
    await queryRunner.createTable(
      new Table({
        name: config.DB.MAIN_SCHEMA + "." + "lots",
        columns: [
          { name: "id", type: "integer", isPrimary: true },
          { name: "name", type: "varchar" },
          { name: "buy_date", type: "timestamp", isNullable: true },
          { name: "price", type: "varchar", isNullable: true },
          { name: "amount", type: "varchar", isNullable: true },
          { name: "detail", type: "varchar", isNullable: true },
          { name: "update_at", type: "timestamp", isNullable: true },
          { name: "created_at", type: "timestamp", isNullable: true },
        ],
      }),
      true,
    );

    // Create Role Mapping table
    await queryRunner.createTable(
      new Table({
        name: config.DB.MAIN_SCHEMA + "." + "role_mapping",
        columns: [
          { name: "role_id", type: "integer" },
          { name: "user_id", type: "integer" },
          { name: "update_at", type: "timestamp", isNullable: true },
          { name: "created_at", type: "timestamp", isNullable: true },
        ],
      }),
      true,
    );

    // Create Permission Mapping table
    await queryRunner.createTable(
      new Table({
        name: config.DB.MAIN_SCHEMA + "." + "permission_mapping",
        columns: [
          { name: "role_id", type: "integer" },
          { name: "permission_id", type: "integer" },
          { name: "update_at", type: "timestamp", isNullable: true },
          { name: "created_at", type: "timestamp", isNullable: true },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      config.DB.MAIN_SCHEMA + "." + "materials",
      new TableForeignKey({
        columnNames: ["unit_id"],
        referencedColumnNames: ["id"],
        referencedTableName: config.DB.MAIN_SCHEMA + "." + "units",
        onDelete: "CASCADE",
      }),
    );

    // Foreign keys for Floors table
    await queryRunner.createForeignKey(
      config.DB.MAIN_SCHEMA + "." + "floors",
      new TableForeignKey({
        columnNames: ["shelf_id"],
        referencedColumnNames: ["id"],
        referencedTableName: config.DB.MAIN_SCHEMA + "." + "shelves",
        onDelete: "CASCADE",
      }),
    );

    // Foreign keys for Orders table
    await queryRunner.createForeignKey(
      config.DB.MAIN_SCHEMA + "." + "orders",
      new TableForeignKey({
        columnNames: ["customer_id"],
        referencedColumnNames: ["id"],
        referencedTableName: config.DB.MAIN_SCHEMA + "." + "customers",
        onDelete: "CASCADE",
      }),
    );

    // Foreign keys for Material History table
    await queryRunner.createForeignKey(
      config.DB.MAIN_SCHEMA + "." + "material_history",
      new TableForeignKey({
        columnNames: ["material_id"],
        referencedColumnNames: ["id"],
        referencedTableName: config.DB.MAIN_SCHEMA + "." + "materials",
        onDelete: "CASCADE",
      }),
    );

    // Foreign keys for Stores table
    await queryRunner.createForeignKey(
      config.DB.MAIN_SCHEMA + "." + "stores",
      new TableForeignKey({
        columnNames: ["floor_id"],
        referencedColumnNames: ["id"],
        referencedTableName: config.DB.MAIN_SCHEMA + "." + "floors",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createForeignKey(
      config.DB.MAIN_SCHEMA + "." + "lot_mapping",
      new TableForeignKey({
        columnNames: ["material_id"],
        referencedColumnNames: ["id"],
        referencedTableName: config.DB.MAIN_SCHEMA + "." + "materials",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createForeignKey(
      config.DB.MAIN_SCHEMA + "." + "lot_mapping",
      new TableForeignKey({
        columnNames: ["lot_id"],
        referencedColumnNames: ["id"],
        referencedTableName: config.DB.MAIN_SCHEMA + "." + "lots",
        onDelete: "CASCADE",
      }),
    );

    // Create Foreign Keys for Role Mapping table
    await queryRunner.createForeignKey(
      config.DB.MAIN_SCHEMA + "." + "role_mapping",
      new TableForeignKey({
        columnNames: ["role_id"],
        referencedColumnNames: ["id"],
        referencedTableName: config.DB.MAIN_SCHEMA + "." + "roles",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createForeignKey(
      config.DB.MAIN_SCHEMA + "." + "role_mapping",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: config.DB.MAIN_SCHEMA + "." + "users",
        onDelete: "CASCADE",
      }),
    );

    // Create Foreign Keys for Permission Mapping table
    await queryRunner.createForeignKey(
      config.DB.MAIN_SCHEMA + "." + "permission_mapping",
      new TableForeignKey({
        columnNames: ["role_id"],
        referencedColumnNames: ["id"],
        referencedTableName: config.DB.MAIN_SCHEMA + "." + "roles",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createForeignKey(
      config.DB.MAIN_SCHEMA + "." + "permission_mapping",
      new TableForeignKey({
        columnNames: ["permission_id"],
        referencedColumnNames: ["id"],
        referencedTableName: config.DB.MAIN_SCHEMA + "." + "permissions",
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop Foreign Keys
    await queryRunner.dropForeignKey(
      config.DB.MAIN_SCHEMA + "." + "role_mapping",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: config.DB.MAIN_SCHEMA + "." + "users",
      }),
    );

    await queryRunner.dropForeignKey(
      config.DB.MAIN_SCHEMA + "." + "role_mapping",
      new TableForeignKey({
        columnNames: ["role_id"],
        referencedColumnNames: ["id"],
        referencedTableName: config.DB.MAIN_SCHEMA + "." + "roles",
      }),
    );

    await queryRunner.dropForeignKey(
      config.DB.MAIN_SCHEMA + "." + "permission_mapping",
      new TableForeignKey({
        columnNames: ["role_id"],
        referencedColumnNames: ["id"],
        referencedTableName: config.DB.MAIN_SCHEMA + "." + "roles",
      }),
    );

    await queryRunner.dropForeignKey(
      config.DB.MAIN_SCHEMA + "." + "permission_mapping",
      new TableForeignKey({
        columnNames: ["permission_id"],
        referencedColumnNames: ["id"],
        referencedTableName: config.DB.MAIN_SCHEMA + "." + "permissions",
      }),
    );

    // Drop the tables
    await queryRunner.dropTable(config.DB.MAIN_SCHEMA + "." + "permission_mapping");
    await queryRunner.dropTable(config.DB.MAIN_SCHEMA + "." + "role_mapping");
    await queryRunner.dropTable(config.DB.MAIN_SCHEMA + "." + "lots");
    await queryRunner.dropTable(config.DB.MAIN_SCHEMA + "." + "lot_mapping");
    await queryRunner.dropTable(config.DB.MAIN_SCHEMA + "." + "floors");
    await queryRunner.dropTable(config.DB.MAIN_SCHEMA + "." + "stores");
    await queryRunner.dropTable(config.DB.MAIN_SCHEMA + "." + "material_history");
    await queryRunner.dropTable(config.DB.MAIN_SCHEMA + "." + "orders");
    await queryRunner.dropTable(config.DB.MAIN_SCHEMA + "." + "customers");
    await queryRunner.dropTable(config.DB.MAIN_SCHEMA + "." + "units");
    await queryRunner.dropTable(config.DB.MAIN_SCHEMA + "." + "materials");
    await queryRunner.dropTable(config.DB.MAIN_SCHEMA + "." + "permissions");
    await queryRunner.dropTable(config.DB.MAIN_SCHEMA + "." + "roles");
    await queryRunner.dropTable(config.DB.MAIN_SCHEMA + "." + "users");
    await queryRunner.dropTable(config.DB.MAIN_SCHEMA + "." + "shelves");

    // Drop the custom ENUM type
    await queryRunner.query(`DROP TYPE "${config.DB.MAIN_SCHEMA}"."type"`);

    // Drop the custom schema
    await queryRunner.query(`DROP SCHEMA "${config.DB.MAIN_SCHEMA}"`);
  }
}