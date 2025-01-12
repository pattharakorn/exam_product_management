import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Product } from './product.entity';
import { ProductsRepository } from './products.repository';
import { reqParamFindProduct } from './interfaces/product.interface';
import { response } from 'src/interface/app.response';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findWithQuery(
    query: reqParamFindProduct,
  ): Promise<response<Product[]>> {
    const result = await this.productsRepository.findWithQuery(query);
    if (!result || result.length === 0) {
      return {
        status: {
          isSuccess: true,
          message: 'Product not found',
        },
        data: [],
      };
    }

    return {
      status: {
        isSuccess: true,
        message: 'success',
      },
      data: result,
    };
  }

  async create(product: CreateProductDto): Promise<response<{ id: number }>> {
    console.log('create data ==> ', product);

    const result = await this.productsRepository.create(product);
    console.log('create result ==> ', result);

    const findProduct = await this.productsRepository.findOneByID(result.id);
    if (!findProduct) {
      throw new InternalServerErrorException(
        'Failed to update product due to an internal error',
      );
    }

    return {
      status: {
        isSuccess: true,
        message: 'success',
      },
      data: result,
    };
  }

  async update(product: UpdateProductDto): Promise<response<Product>> {
    console.log('create data ==> ', product);

    const findProduct = await this.productsRepository.findOneByID(product.id);
    if (!findProduct) {
      throw new NotFoundException(`Product with id ${product.id} not found`);
    }

    const resultUpdate = await this.productsRepository.update(product);
    console.log('update result ==> ', resultUpdate);

    if (!resultUpdate) {
      throw new InternalServerErrorException(
        'Failed to update product due to an internal error',
      );
    }

    const result = await this.productsRepository.findOneByID(product.id);
    if (!findProduct) {
      throw new InternalServerErrorException(
        'Failed to update product due to an internal error',
      );
    }

    return {
      status: {
        isSuccess: true,
        message: 'success',
      },
      data: result,
    };
  }

  async delete(id: number): Promise<void> {
    const product = await this.productsRepository.findOneByID(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const result = await this.productsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
