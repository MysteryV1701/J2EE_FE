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
export type User = Entity<{
    fullname: string,
    email:string;
    password: string,
    role: "ADMIN" | "USER";
    bio: string;    
}>
export type AuthResponse = {
    jwt: string;
    user:User;
}
export type Comment = Entity<{
    body:string,
    author: User,
}>