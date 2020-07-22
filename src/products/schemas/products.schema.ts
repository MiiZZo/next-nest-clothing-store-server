import { Schema, SchemaFactory, Prop, raw } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Category } from './category.schema';
import { User } from 'src/users/schemas/users.schema';
import { Comment } from '../comment.interface';

@Schema()
export class Product extends Document {
  @Prop({ required: true, Type: [String] })
  mediaUrls: string[];

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: Number, default: 1 })
  count: number;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: Category.name,
  })
  category: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, default: 0 })
  rating: number;

  @Prop({
    type: [
      raw({
        name: {
          type: String,
        },
        value: {
          type: String,
        },
      }),
    ],
    required: true,
    default: [],
  })
  characteristics: Record<'name' | 'value', string>[];

  @Prop({
    type: [
      raw({
        rating: {
          type: Number,
        },
        text: {
          type: String,
        },
        author: {
          type: MongooseSchema.Types.ObjectId,
          ref: User.name,
        },
        date: {
          type: Date,
        },
      }),
    ],
    required: true,
    default: [],
  })
  comments: Comment[];
}
export const productSchema = SchemaFactory.createForClass(Product);
