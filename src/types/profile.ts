export interface UserProfile {
  firstName: string;
  lastName: string;
  bio?: string;
  profilePictureUrl?: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  newPassword: string;
}
