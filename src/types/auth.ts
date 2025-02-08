export interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponseBody {
  user: {
    id: string;
    email: string;
    username: string;
  };
}

export interface JwtPayload {
  userId: string;
}
