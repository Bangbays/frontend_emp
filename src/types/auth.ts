export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  referralCode?: string;
}

export interface ILogin {
  email: string;
  password: string;
}
