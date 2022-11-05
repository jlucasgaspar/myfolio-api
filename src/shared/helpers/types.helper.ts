import { ApiProperty } from '@nestjs/swagger';

export class ErrorSwagger {
  @ApiProperty()
  message: string;
}

export type WithoutTimestampsAndId<T> = Omit<
  T,
  '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
