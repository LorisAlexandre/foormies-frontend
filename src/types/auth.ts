export interface Auth {
  accessToken?: string;
  refreshToken?: string;
}

export interface JWTTokens {
  sub: string;
  email: string;
}
