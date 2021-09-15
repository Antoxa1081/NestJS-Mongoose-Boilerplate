import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class CheckMongoIdPipe implements PipeTransform<any, ObjectId> {
  transform(value: any): ObjectId {
    const validObjectId: boolean = ObjectId.isValid(value);

    if (!validObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }

    return ObjectId.createFromHexString(value);
  }
}
