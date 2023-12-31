import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import config from "~/config";

export class CreateInitialTables1630000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: `${config.DB.MAIN_SCHEMA}.users`,
        columns: [
          { name: "id", type: "integer", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "image_url", type: "varchar" },
          { name: "full_name", type: "varchar" },
          { name: "username", type: "varchar", isUnique: true },
          { name: "password", type: "varchar" },
          { name: "update_at", type: "timestamp", default: `now()` },
          { name: "created_at", type: "timestamp", default: `now()` },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: `${config.DB.MAIN_SCHEMA}.role_mapping`,
        columns: [
          { name: "id", type: "integer", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "role_id", type: "integer" },
          { name: "user_id", type: "integer" },
          { name: "update_at", type: "timestamp", default: `now()` },
          { name: "created_at", type: "timestamp", default: `now()` },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: `${config.DB.MAIN_SCHEMA}.roles`,
        columns: [
          { name: "id", type: "integer", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "name", type: "varchar" },
          { name: "update_at", type: "timestamp", default: `now()` },
          { name: "created_at", type: "timestamp", default: `now()` },
        ],
      }),
      true,
    );

    // Permissions Table
    await queryRunner.createTable(
      new Table({
        name: `${config.DB.MAIN_SCHEMA}.permissions`,
        columns: [
          { name: "id", type: "integer", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "name", type: "varchar" },
          { name: "action", type: "varchar" },
          { name: "update_at", type: "timestamp", default: `now()` },
          { name: "created_at", type: "timestamp", default: `now()` },
        ],
      }),
      true,
    );

    // Permission Mapping Table
    await queryRunner.createTable(
      new Table({
        name: `${config.DB.MAIN_SCHEMA}.permission_mapping`,
        columns: [
          { name: "id", type: "integer", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "role_id", type: "integer" },
          { name: "permission_id", type: "integer" },
          { name: "update_at", type: "timestamp", default: `now()` },
          { name: "created_at", type: "timestamp", default: `now()` },
        ],
      }),
      true,
    );

    // Materials Table
    await queryRunner.createTable(
      new Table({
        name: `${config.DB.MAIN_SCHEMA}.materials`,
        columns: [
          { name: "id", type: "integer", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "name", type: "varchar" },
          { name: "image_url", type: "varchar" },
          { name: "detail", type: "varchar" },
          { name: "floor_id", type: "integer" },
          { name: "total", type: "integer" },
          { name: "unit_id", type: "integer" },
          { name: "update_at", type: "timestamp", default: `now()` },
          { name: "created_at", type: "timestamp", default: `now()` },
        ],
      }),
      true,
    );

    // Units Table
    await queryRunner.createTable(
      new Table({
        name: `${config.DB.MAIN_SCHEMA}.units`,
        columns: [
          { name: "id", type: "integer", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "name", type: "varchar" },
          { name: "update_at", type: "timestamp", default: `now()` },
          { name: "created_at", type: "timestamp", default: `now()` },
        ],
      }),
      true,
    );

    // Shelves Table
    await queryRunner.createTable(
      new Table({
        name: `${config.DB.MAIN_SCHEMA}.shelves`,
        columns: [
          { name: "id", type: "integer", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "image_url", type: "varchar" },
          { name: "name", type: "varchar" },
          { name: "detail", type: "varchar" },
          { name: "update_at", type: "timestamp", default: `now()` },
          { name: "created_at", type: "timestamp", default: `now()` },
        ],
      }),
      true,
    );

    // Floors Table
    await queryRunner.createTable(
      new Table({
        name: `${config.DB.MAIN_SCHEMA}.floors`,
        columns: [
          { name: "id", type: "integer", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "shelve_id", type: "integer" },
          { name: "image_url", type: "varchar" },
          { name: "name", type: "varchar" },
          { name: "detail", type: "varchar" },
          { name: "update_at", type: "timestamp", default: `now()` },
          { name: "created_at", type: "timestamp", default: `now()` },
        ],
      }),
      true,
    );

    // Lot Mapping Table
    await queryRunner.createTable(
      new Table({
        name: `${config.DB.MAIN_SCHEMA}.lot_mapping`,
        columns: [
          { name: "id", type: "integer", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "material_id", type: "integer" },
          { name: "lot_id", type: "integer" },
          { name: "update_at", type: "timestamp", default: `now()` },
          { name: "created_at", type: "timestamp", default: `now()` },
        ],
      }),
      true,
    );

    // Lots Table
    await queryRunner.createTable(
      new Table({
        name: `${config.DB.MAIN_SCHEMA}.lots`,
        columns: [
          { name: "id", type: "integer", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "name", type: "varchar" },
          { name: "buy_date", type: "timestamp", default: `now()` },
          { name: "price", type: "varchar" },
          { name: "amount", type: "varchar" },
          { name: "detail", type: "varchar" },
          { name: "update_at", type: "timestamp", default: `now()` },
          { name: "created_at", type: "timestamp", default: `now()` },
        ],
      }),
      true,
    );

    // Material History Table
    await queryRunner.createTable(
      new Table({
        name: `${config.DB.MAIN_SCHEMA}.material_history`,
        columns: [
          { name: "id", type: "integer", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "material_id", type: "integer" },
          { name: "remark", type: "varchar" },
          { name: "type", type: "varchar" },
          { name: "amount", type: "integer" },
          { name: "update_by", type: "integer" },
          { name: "update_at", type: "timestamp", default: `now()` },
          { name: "created_at", type: "timestamp", default: `now()` },
        ],
      }),
      true,
    );

    // Customers Table
    await queryRunner.createTable(
      new Table({
        name: `${config.DB.MAIN_SCHEMA}.customers`,
        columns: [
          { name: "id", type: "integer", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "full_name", type: "varchar" },
          { name: "address", type: "varchar" },
          { name: "update_at", type: "timestamp", default: `now()` },
          { name: "created_at", type: "timestamp", default: `now()` },
        ],
      }),
      true,
    );

    // Orders Table
    await queryRunner.createTable(
      new Table({
        name: `${config.DB.MAIN_SCHEMA}.orders`,
        columns: [
          { name: "id", type: "integer", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "customer_id", type: "integer" },
          { name: "name", type: "varchar" },
          { name: "detail", type: "varchar" },
          { name: "address", type: "varchar" },
          { name: "send_date", type: "timestamp", default: `now()` },
          { name: "latitude", type: "varchar" },
          { name: "longitude", type: "varchar" },
          { name: "status", type: "varchar" },
          { name: "update_at", type: "timestamp", default: `now()` },
          { name: "created_at", type: "timestamp", default: `now()` },
        ],
      }),
      true,
    );

    // Product Table
    await queryRunner.createTable(
      new Table({
        name: `${config.DB.MAIN_SCHEMA}.product`,
        columns: [
          { name: "id", type: "integer", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "name", type: "varchar" },
          { name: "order_id", type: "integer" },
          { name: "total_size", type: "varchar" },
          { name: "total_amount", type: "varchar" },
          { name: "update_at", type: "timestamp", default: `now()` },
          { name: "created_at", type: "timestamp", default: `now()` },
        ],
      }),
      true,
    );

    // Logistic Table
    await queryRunner.createTable(
      new Table({
        name: `${config.DB.MAIN_SCHEMA}.logistic`,
        columns: [
          { name: "id", type: "integer", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "order_id", type: "integer" },
          { name: "node", type: "varchar" },
          { name: "status", type: "varchar" },
          { name: "update_at", type: "timestamp", default: `now()` },
          { name: "created_at", type: "timestamp", default: `now()` },
        ],
      }),
      true,
    );

    // Foreign Key for role_mapping.user_id > users.id
    await queryRunner.createForeignKey(
      `${config.DB.MAIN_SCHEMA}.role_mapping`,
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: `${config.DB.MAIN_SCHEMA}.users`,
        onDelete: "CASCADE",
      }),
    );

    // Foreign Key for role_mapping.role_id > roles.id
    await queryRunner.createForeignKey(
      `${config.DB.MAIN_SCHEMA}.role_mapping`,
      new TableForeignKey({
        columnNames: ["role_id"],
        referencedColumnNames: ["id"],
        referencedTableName: `${config.DB.MAIN_SCHEMA}.roles`,
        onDelete: "CASCADE",
      }),
    );

    // Foreign Key for permission_mapping.role_id > roles.id
    await queryRunner.createForeignKey(
      `${config.DB.MAIN_SCHEMA}.permission_mapping`,
      new TableForeignKey({
        columnNames: ["role_id"],
        referencedColumnNames: ["id"],
        referencedTableName: `${config.DB.MAIN_SCHEMA}.roles`,
        onDelete: "CASCADE",
      }),
    );

    // Foreign Key for permission_mapping.permission_id > permissions.id
    await queryRunner.createForeignKey(
      `${config.DB.MAIN_SCHEMA}.permission_mapping`,
      new TableForeignKey({
        columnNames: ["permission_id"],
        referencedColumnNames: ["id"],
        referencedTableName: `${config.DB.MAIN_SCHEMA}.permissions`,
        onDelete: "CASCADE",
      }),
    );

    // Foreign Key for materials.unit_id > units.id
    await queryRunner.createForeignKey(
      `${config.DB.MAIN_SCHEMA}.materials`,
      new TableForeignKey({
        columnNames: ["unit_id"],
        referencedColumnNames: ["id"],
        referencedTableName: `${config.DB.MAIN_SCHEMA}.units`,
        onDelete: "CASCADE",
      }),
    );

    // Foreign Key for materials.floor_id > floors.id
    await queryRunner.createForeignKey(
      `${config.DB.MAIN_SCHEMA}.materials`,
      new TableForeignKey({
        columnNames: ["floor_id"],
        referencedColumnNames: ["id"],
        referencedTableName: `${config.DB.MAIN_SCHEMA}.floors`,
        onDelete: "CASCADE",
      }),
    );

    // Foreign Key for floors.shelve_id > shelves.id
    await queryRunner.createForeignKey(
      `${config.DB.MAIN_SCHEMA}.floors`,
      new TableForeignKey({
        columnNames: ["shelve_id"],
        referencedColumnNames: ["id"],
        referencedTableName: `${config.DB.MAIN_SCHEMA}.shelves`,
        onDelete: "CASCADE",
      }),
    );

    // Foreign Key for lot_mapping.material_id > materials.id
    await queryRunner.createForeignKey(
      `${config.DB.MAIN_SCHEMA}.lot_mapping`,
      new TableForeignKey({
        columnNames: ["material_id"],
        referencedColumnNames: ["id"],
        referencedTableName: `${config.DB.MAIN_SCHEMA}.materials`,
        onDelete: "CASCADE",
      }),
    );

    // Foreign Key for lot_mapping.lot_id > lots.id
    await queryRunner.createForeignKey(
      `${config.DB.MAIN_SCHEMA}.lot_mapping`,
      new TableForeignKey({
        columnNames: ["lot_id"],
        referencedColumnNames: ["id"],
        referencedTableName: `${config.DB.MAIN_SCHEMA}.lots`,
        onDelete: "CASCADE",
      }),
    );

    // Foreign Key for orders.customer_id > customers.id
    await queryRunner.createForeignKey(
      `${config.DB.MAIN_SCHEMA}.orders`,
      new TableForeignKey({
        columnNames: ["customer_id"],
        referencedColumnNames: ["id"],
        referencedTableName: `${config.DB.MAIN_SCHEMA}.customers`,
        onDelete: "CASCADE",
      }),
    );

    // Foreign Key for product.order_id > orders.id
    await queryRunner.createForeignKey(
      `${config.DB.MAIN_SCHEMA}.product`,
      new TableForeignKey({
        columnNames: ["order_id"],
        referencedColumnNames: ["id"],
        referencedTableName: `${config.DB.MAIN_SCHEMA}.orders`,
        onDelete: "CASCADE",
      }),
    );

    // Foreign Key for logistic.order_id > orders.id
    await queryRunner.createForeignKey(
      `${config.DB.MAIN_SCHEMA}.logistic`,
      new TableForeignKey({
        columnNames: ["order_id"],
        referencedColumnNames: ["id"],
        referencedTableName: `${config.DB.MAIN_SCHEMA}.orders`,
        onDelete: "CASCADE",
      }),
    );

    // Foreign Key for logistic.order_id > orders.id
    await queryRunner.createForeignKey(
      `${config.DB.MAIN_SCHEMA}.material_history`,
      new TableForeignKey({
        columnNames: ["update_by"],
        referencedColumnNames: ["id"],
        referencedTableName: `${config.DB.MAIN_SCHEMA}.users`,
        onDelete: "CASCADE",
      }),
    );

    // Foreign Key for logistic.order_id > orders.id
    await queryRunner.createForeignKey(
      `${config.DB.MAIN_SCHEMA}.material_history`,
      new TableForeignKey({
        columnNames: ["material_id"],
        referencedColumnNames: ["id"],
        referencedTableName: `${config.DB.MAIN_SCHEMA}.materials`,
        onDelete: "CASCADE",
      }),
    );

    // Modify the orders table to include the orders_status.type enum
    await queryRunner.query(`ALTER TABLE ${config.DB.MAIN_SCHEMA}.orders ADD CONSTRAINT chk_orders_status CHECK (status IN ('in_progress', 'pending', 'success'))`);

    // Modify the logistic table to include the logistic.type enum
    await queryRunner.query(`ALTER TABLE ${config.DB.MAIN_SCHEMA}.logistic ADD CONSTRAINT chk_logistic_status CHECK (status IN ('in_progress', 'pending', 'success'))`);

    // Modify the material_history table to include the material_history.type enum
    await queryRunner.query(`ALTER TABLE ${config.DB.MAIN_SCHEMA}.material_history ADD CONSTRAINT chk_material_history_type CHECK (type IN ('withdraw_material', 'add_material'))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop Type
    await queryRunner.query(`ALTER TABLE ${config.DB.MAIN_SCHEMA}.orders DROP CONSTRAINT chk_orders_status`);
    await queryRunner.query(`ALTER TABLE ${config.DB.MAIN_SCHEMA}.logistic DROP CONSTRAINT chk_logistic_status`);
    await queryRunner.query(`ALTER TABLE ${config.DB.MAIN_SCHEMA}.material_history DROP CONSTRAINT chk_material_history_type`);

    // Drop Foreign Keys first
    // Execute a raw SQL query to get all table names in the public schema
    const result = await queryRunner.query(`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='${config.DB.MAIN_SCHEMA}'`);

    // Extract table names
    const tableNames = result.map((row) => row.tablename);

    // Iterate over each table name to get table details and drop foreign keys
    for (const tableName of tableNames) {
      const table = await queryRunner.getTable(`${config.DB.MAIN_SCHEMA}.${tableName}`);
      if (table) {
        for (const foreignKey of table.foreignKeys) {
          await queryRunner.dropForeignKey(`${config.DB.MAIN_SCHEMA}.${tableName}`, foreignKey);
        }
      }
    }

    // Drop Tables in reverse order of creation
    await queryRunner.dropTable(`${config.DB.MAIN_SCHEMA}.logistic`);
    await queryRunner.dropTable(`${config.DB.MAIN_SCHEMA}.product`);
    await queryRunner.dropTable(`${config.DB.MAIN_SCHEMA}.orders`);
    await queryRunner.dropTable(`${config.DB.MAIN_SCHEMA}.customers`);
    await queryRunner.dropTable(`${config.DB.MAIN_SCHEMA}.material_history`);
    await queryRunner.dropTable(`${config.DB.MAIN_SCHEMA}.lot_mapping`);
    await queryRunner.dropTable(`${config.DB.MAIN_SCHEMA}.lots`);
    await queryRunner.dropTable(`${config.DB.MAIN_SCHEMA}.units`);
    await queryRunner.dropTable(`${config.DB.MAIN_SCHEMA}.materials`);
    await queryRunner.dropTable(`${config.DB.MAIN_SCHEMA}.floors`);
    await queryRunner.dropTable(`${config.DB.MAIN_SCHEMA}.shelves`);
    await queryRunner.dropTable(`${config.DB.MAIN_SCHEMA}.permission_mapping`);
    await queryRunner.dropTable(`${config.DB.MAIN_SCHEMA}.permissions`);
    await queryRunner.dropTable(`${config.DB.MAIN_SCHEMA}.role_mapping`);
    await queryRunner.dropTable(`${config.DB.MAIN_SCHEMA}.roles`);
    await queryRunner.dropTable(`${config.DB.MAIN_SCHEMA}.users`);
  }
}
