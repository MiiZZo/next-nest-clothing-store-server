import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductDto, CreateProductDto } from './product.dto';
import { CategoriesService } from './services/categories.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '@shared/guards/role.guard';
import { Role } from '@shared/decorators/role.decorator';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {}

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return await this.productsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role('admin')
  @Post()
  async createProduct(@Body() product: CreateProductDto) {
    await this.productsService.create(product);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role('admin')
  @Post('category')
  async createCategory(@Body() category: { name: string }) {
    await this.categoriesService.create(category.name);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role('admin')
  @Put('category')
  async updateCategory(@Body() category: { _id: string, name: string }) {
    await this.categoriesService.update(category._id, category.name);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role('admin')
  @Put()
  async updateProduct(@Body() product: ProductDto) {
    await this.productsService.update(product);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role('admin')
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    await this.productsService.delete(id);
  }
}
