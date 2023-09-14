import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import config from "~/config";
export enum MaterialHistoryType {
  WITHDRAW = "withdraw",
  ADD = "add",
  REMOVE = "remove",
  USE = "use",
}

// Users
@Entity(config.DB.MAIN_SCHEMA + "." + "users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  image_url: string;

  @Column("varchar")
  full_name: string;

  @Column("varchar")
  username: string;

  @Column("varchar")
  token: string;

  @Column("varchar")
  password: string;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

// Roles
@Entity(config.DB.MAIN_SCHEMA + "." + "roles")
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

// RoleMapping
@Entity(config.DB.MAIN_SCHEMA + "." + "role_mapping")
export class RoleMapping extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user_id: number;

  @ManyToOne(() => Role, (role) => role.id)
  role_id: number;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

// MaterialHistory
@Entity(config.DB.MAIN_SCHEMA + "." + "material_history")
export class MaterialHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Material, (material) => material.id)
  material_id: number;

  @Column("varchar")
  name: string;

  @Column({
    type: "enum",
    enum: MaterialHistoryType,
  })
  type: MaterialHistoryType;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

// Permissions
@Entity(config.DB.MAIN_SCHEMA + "." + "permissions")
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @Column("varchar")
  action: string;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

// Units
@Entity(config.DB.MAIN_SCHEMA + "." + "units")
export class Unit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

// Materials
@Entity(config.DB.MAIN_SCHEMA + "." + "materials")
export class Material extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @Column({ type: "varchar", nullable: true })
  image_url: string;

  @Column("varchar")
  detail: string;

  @ManyToOne(() => Store, (store) => store.id)
  storage_id: number;

  @Column("int")
  total: number;

  @ManyToOne(() => Unit, (unit) => unit.id)
  unit_id: number;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

// Stores
@Entity(config.DB.MAIN_SCHEMA + "." + "stores")
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  image_url: string;

  @ManyToOne(() => Floor, (floor) => floor.id)
  floor_id: string;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

// shelves
@Entity(config.DB.MAIN_SCHEMA + "." + "shelves")
export class Shelf extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  image_url: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  detail: string;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

// Floors
@Entity(config.DB.MAIN_SCHEMA + "." + "floors")
export class Floor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shelf, (shelf) => shelf.id)
  shelf_id: number;

  @Column({ type: "varchar", nullable: true })
  image_url: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  detail: string;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

// LotMapping
@Entity(config.DB.MAIN_SCHEMA + "." + "lot_mapping")
export class LotMapping extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lot, (lot) => lot.id)
  lot_id: number;

  @ManyToOne(() => Material, (material) => material.id)
  material_id: number;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

// Lots
@Entity(config.DB.MAIN_SCHEMA + "." + "lots")
export class Lot extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @Column("timestamp")
  buy_date: Date;

  @Column("varchar")
  price: string;

  @Column("varchar")
  amount: string;

  @Column("varchar")
  detail: string;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

// Customers
@Entity(config.DB.MAIN_SCHEMA + "." + "customers")
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  full_name: string;

  @Column("varchar")
  address: string;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

// Orders
@Entity(config.DB.MAIN_SCHEMA + "." + "orders")
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.id)
  customer_id: number;

  @Column("varchar")
  name: string;

  @Column("varchar")
  detail: string;

  @Column("varchar")
  address: string;

  @Column("timestamp")
  send_date: Date;

  @Column("varchar")
  latitude: string;

  @Column("varchar")
  longitude: string;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
