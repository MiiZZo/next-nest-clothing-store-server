import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Role } from './roles.schema';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Role.name,
  })
  role: any;

  @Prop({
    type: Boolean,
    default: false,
  })
  emailConfirmed?: boolean;
}

export const userSchema = SchemaFactory.createForClass(User);
