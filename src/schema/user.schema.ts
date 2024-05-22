import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  confirmationCode: string;

  @Prop({ default: false })
  emailVerified: boolean;
  @Prop()
  wallet: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
