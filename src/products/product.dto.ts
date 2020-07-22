import { Comment } from './comment.interface';

export class CreateProductDto {
  mediaUrls: string[];
  title: string;
  count: number;
  price: number;
  category: string;
  description: string;
  characteristics: Record<'name' | 'value', string>[];
}

export class ProductDto extends CreateProductDto {
  _id: string;
  rating: number;
  comments: Comment[];
}
