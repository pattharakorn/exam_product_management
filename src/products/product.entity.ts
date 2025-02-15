import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  barcode: string;

  @Column()
  price: number;

  @Column()
  qty: number;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column()
  isActive: Boolean;
}
