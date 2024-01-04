import { ApiProperty } from '@nestjs/swagger';

class ErrorDetailEntity {
  property: string;
  @ApiProperty({ type: 'object', description: 'Validation constraints' })
  constraints: { [key: string]: string };
}

/**
 * Error DTO. Must be used for swagger only.
 * @class
 * @public
 * @version 1.0.0
 * @see https://docs.nestjs.com/openapi/mapped-types
 */
export class ErrorEntity {
  path: string;
  timestamp: string;
  status: number;
  details: ErrorDetailEntity[];
  message: string;
}
