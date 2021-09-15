import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  // @Transform((objectId) => objectId.value.toString(), { toClassOnly: true })
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop()
  username: string;

  @ExcludeProperty()
  @Prop()
  password: string;

  @ExcludeProperty()
  @Prop()
  salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
