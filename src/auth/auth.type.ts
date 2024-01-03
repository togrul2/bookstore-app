import { Request } from 'express';

export type RequestUser = {
  id: string;
  email: string;
  // roles: string[];
};

export interface AuthRequest extends Request {
  user: RequestUser | undefined;
}
