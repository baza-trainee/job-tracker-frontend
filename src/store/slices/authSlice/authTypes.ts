export interface UserProps {
  id: string;
  username: string;
  email: string;
  avatar: string;
}

export interface AuthTokensProps {
  access_token: string;
  refresh_token: string;
}

export interface AuthStateProps {
  user: UserProps | null;
  tokens: AuthTokensProps | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

export interface KnownError {
  message: string;
  code: number | undefined;
}
export interface UserAuthProps {
  email: string;
  password: string;
}
