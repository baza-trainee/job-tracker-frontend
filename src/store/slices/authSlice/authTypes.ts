export interface UserProps {
  id: string;
  username: string;
  email: string;
  avatar:string;
}

export interface AuthTokensProps {
  access_token: string;
  refresh_token: string;
}

export interface AuthStateProps {
  user: UserProps | null;
  tokens: AuthTokensProps | null;
  loading: boolean;
  error: string | null;
}
