/**
 * Error DTO. Must be used for swagger only.
 */
export class ErrorDto {
  message: string;
  error: string;
  statusCode: number;
}

/**
 * Field error DTO. Must be used for swagger only.
 */
export class FieldError {
  target: any;
  property: string;
  children: any[];
  constraints: [string] | string;
}

/**
 * Bad request error DTO. Must be used for swagger only.
 */
export class BadRequestErrorDto {
  message: FieldError[];
  error: string;
  statusCode: number;
}
