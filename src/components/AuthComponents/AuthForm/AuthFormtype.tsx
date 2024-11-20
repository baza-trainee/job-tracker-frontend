export interface AuthorizationLayoutProps {
  isSignUpPage: boolean;
  isLogInPage: boolean;
  register: any;
  handleSubmit: any;
  resetField(name: string): void;
  onSubmit: any;
  errors: any;
  isCleanInputsForm: () => boolean;
  loading: boolean;
  error: boolean;
}
