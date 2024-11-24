import { ROLES } from './enum';

export type BaseEntity = {
  id: string;
  createdAt: string;
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
}>;
export type AuthResponse = {
  jwt: string;
  user: User;
};
export type Comment = Entity<{
  body: string;
  author: User;
}>;

export type Campaign = Entity<{
  categoryName: string;
  createdId: number;
  createdBy: string;
  name: string;
  code: string;
  description: string;
  thumbnail: string;
  targetAmount: number;
  currentAmount: number;
  startDate: Date;
  endDate: string;
  status: number;
}>;

export type Category = Entity<{
  name: string;
  description: string;
  status: number;
}>;

export type Donation = Entity<{
  campaignId: number;
  userId: number;
  amount: number;
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
