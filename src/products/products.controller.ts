import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { reqParamFindProduct } from './interfaces/product.interface';
import { response } from 'src/interface/app.response';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findProducts(
    @Query()
    query: reqParamFindProduct,
  ): Promise<response<Product[]>> {
    return await this.productsService.findWithQuery(query);
  }

  @Post()
  async create(
    @Body() product: CreateProductDto,
  ): Promise<response<{ id: number }>> {
    return await this.productsService.create(product);
  }

  @Put()
  async update(@Body() product: UpdateProductDto): Promise<response<Product>> {
    return await this.productsService.update(product);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<{ message: string }> {
    await this.productsService.delete(id);
    return { message: `Product with ID ${id} deleted successfully` };
  }
}
