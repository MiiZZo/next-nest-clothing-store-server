import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schemas/products.schema';
import { ProductDto, CreateProductDto } from '../product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(product: CreateProductDto): Promise<void> {
    const createdProduct = await this.productModel.create({
      ...product,
      comments: [],
      rating: 0,
    });
    await createdProduct.save();
  }

  async delete(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id);
  }

  async update({ _id, ...product }: ProductDto): Promise<void> {
    await this.productModel.findByIdAndUpdate(_id, product);
  }

  async findOne(id: string): Promise<ProductDto | null> {
    return await this.productModel.findById(id);
  }
  
  async findAll(): Promise<ProductDto[]> {
    return await this.productModel.find();
  }
}
