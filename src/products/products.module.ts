import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './services/products.service';
import { Product, productSchema } from './schemas/products.schema';
import { Category, categorySchema } from './schemas/category.schema';
import { CategoriesService } from './services/categories.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: productSchema }, { name: Category.name, schema: categorySchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, CategoriesService],
})
export class ProductsModule {}
