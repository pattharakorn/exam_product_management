import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // ดึงรายการสินค้าทั้งหมดจากฐานข้อมูล
  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  // เพิ่มสินค้าใหม่ลงฐานข้อมูล
  create(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }
}
