export interface UserProps {
  id?: string;
  username?: string;
  email: string;
  avatar?: string;
  password: string;
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

export interface forgotPasswordProps {
  email: string;
}

export interface resetPasswordProps {
  password: string;
  token: string;
}

export interface KnownErrorProps {
  message: string;
  code: number | undefined;
}
