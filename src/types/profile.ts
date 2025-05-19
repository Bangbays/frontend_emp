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
  role: "CUSTOMER" | "PENDING_ORGANIZER" | "ORGANIZER";
  organizationName?: string;
  organizationDesc?: string;
  organizationAddr?: string;
  organizationPhone?: string;
}

export interface ICoupon {
  id: string;
  code: string;
  discount: number;
  isUsed: boolean;
  createdAt: string;
  expiresAt: string;
}
