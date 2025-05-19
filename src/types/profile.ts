export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  profilePictureUrl?: string;
  referralCode: string;
  points: number;
  coupons: ICoupon[];
}

export interface ICoupon {
  id: string;
  code: string;
  discount: number;
  used: boolean;
  expiresAt: string;
}
