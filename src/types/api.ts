export type BaseEntity = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;


export type Meta = {
    page:number;
    total:number;
    totalPages: number;
}

export enum ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER',
  OR = 'OR',
}

export type User = Entity<{
    name: string;
    email:string;
    role: ROLES;
    status: number;
}>
export type AuthResponse = {
    jwt: string;
    user:User;
}
export type Comment = Entity<{
    body:string,
    author: User,
}>