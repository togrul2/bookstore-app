class ErrorDetailEntity {
  property: string;
  constraints: { [key: string]: string };
}

/**
 * Error DTO. Must be used for swagger only.
 */
export class ErrorEntity {
  path: string;
  timestamp: string;
  status: number;
  details: ErrorDetailEntity[];
  message: string;
}
