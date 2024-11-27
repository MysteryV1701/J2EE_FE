import { ROLES } from './enum';

export type BaseEntity = {
  id: number;
  createdDate: string;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type Meta = {
  page: number;
  size: number;
  totalPages: number;
};

export type Role = Entity<{
  name: ROLES;
  description: string;
  status: number;
}>;

export type User = Entity<{
  name: string;
  email: string;
  roleName: ROLES;
  status: number;
  avatar: string;
}>;
export type AuthResponse = {
  token_type: string;
  access_token: string;
};
export type Comment = Entity<{
  body: string;
  author: User;
}>;

export type Campaign = Entity<{
  name: string;
  code: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  thumbnail: string;
  startDate: Date;
  endDate: string;
  accountNumber: string;
  bankname: string;
  status: number;
  categoryId: number;
  categoryName: string;
  createdId: number;
}>;

export type CampaignView = Entity<{
  education: Education;
  category: Category;
  owner: User;
}> & Campaign;

export type Category = Entity<{
  name: string;
  description: string;
  status: number;
}>;

export type Donation = Entity<{
  campaignId: number;
  userId: number;
  amount: number;
  name: string;
  isAnonymous: boolean;
  isPaid: boolean;
  status: number;
}>;

export type FinancialReport = Entity<{
  totalReceived: number;
  totalRemain: number;
  campaignId: number;
  personReceivedId: number;
}>;

export type Payment = Entity<{
  code: string;
  message: string;
  paymentUrl: string;
}>;

export type Recipient = Entity<{
  name: string;
  phone: number;
  address: string;
  status: number;
}>;

export type Education = Entity<{
  name: string;
  email: string;
  phone: number;
  address: string;
  status: number;
}>;

export type VNPResponse = {
  code: string;
  message: string;
  paymentUrl: string;
};
