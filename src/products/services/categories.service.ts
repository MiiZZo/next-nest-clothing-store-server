import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../schemas/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category> ) {}

  async create(name: string) {
    const createdCategory = await this.categoryModel.create({ name });
    await createdCategory.save();
  }

  async update(id: string, name: string) {
    await this.categoryModel.findByIdAndUpdate(id, { name });
  }
}
