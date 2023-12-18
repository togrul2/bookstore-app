/**
 * JWT Token Payload object type.
 */
export type JwtPayload = {
  username: string;
  sub: string;
};

/**
 * JWT Refresh Token Payload object type.
 */
export type JwtRefreshPayload = {
  username: string;
  sub: string;
  refreshToken: string;
};
