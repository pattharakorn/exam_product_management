import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { reqParamFindProduct } from './interfaces/product.interface';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findWithQuery(query: reqParamFindProduct): Promise<Product[]> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (query.id) {
      queryBuilder.andWhere('product.id = :id', { id: query.id });
    }
    if (query.name) {
      queryBuilder.andWhere('product.name LIKE :name', {
        name: `%${query.name}%`,
      });
    }
    if (query.barcode) {
      queryBuilder.andWhere('product.barcode = :barcode', {
        barcode: query.barcode,
      });
    }
    if (query.category) {
      queryBuilder.andWhere('product.category = :category', {
        category: query.category,
      });
    }

    return await queryBuilder.getMany();
  }

  // เพิ่มสินค้าใหม่ลงฐานข้อมูล
  create(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }
}
