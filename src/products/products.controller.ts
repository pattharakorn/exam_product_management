import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { reqParamFindProduct } from './interfaces/product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findProducts(
    @Query()
    query: reqParamFindProduct,
  ): Promise<Product[]> {
    return await this.productsService.findWithQuery(query);
  }

  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return await this.productsService.create(product);
  }
}
