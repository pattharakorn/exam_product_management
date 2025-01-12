import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Product } from './product.entity';
import { reqParamFindProduct } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findOneByID(id: number): Promise<Product> {
    return await this.productRepository.findOneBy({ id });
  }

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

  async create(product: CreateProductDto): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async update(product: UpdateProductDto): Promise<UpdateResult> {
    return await this.productRepository.update(product.id, product);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.productRepository.delete({ id });
  }
}
