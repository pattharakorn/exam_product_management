import { BadRequestException, Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductsRepository } from './products.repository';
import { reqParamFindProduct } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findWithQuery(query: reqParamFindProduct): Promise<Product[]> {
    const products = await this.productsRepository.findWithQuery(query);
    if (!products || products.length === 0) {
      throw new BadRequestException('Product not found');
    }
    return products;
  }

  // เพิ่มสินค้าใหม่ลงฐานข้อมูล
  create(product: Product): Promise<Product> {
    return this.productsRepository.create(product);
  }
}
