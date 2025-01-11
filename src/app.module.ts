import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // ใช้ 'db' เมื่อรันใน Docker
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'testdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product]),
    ProductsModule,
  ],
})
export class AppModule {}
