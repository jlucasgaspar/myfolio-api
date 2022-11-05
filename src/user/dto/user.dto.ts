import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as Joi from 'joi';

@JoiSchemaOptions({ allowUnknown: false, abortEarly: false })
export class IUser {
  @ApiProperty({ type: String })
  @JoiSchema(Joi.string().required())
  _id: string;

  @ApiProperty({ type: String })
  @JoiSchema(Joi.string().email().required())
  email: string;

  @ApiProperty({ type: String })
  @JoiSchema(Joi.string().required())
  password: string;

  @ApiProperty({ type: Date })
  @JoiSchema(Joi.date().required())
  createdAt: Date;

  @ApiPropertyOptional({ type: Date })
  @JoiSchema(Joi.date().optional())
  updatedAt?: Date | null;

  @ApiPropertyOptional({ type: Date })
  @JoiSchema(Joi.date().optional())
  deletedAt?: Date | null;
}
