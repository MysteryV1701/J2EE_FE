/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/prefer-as-const */
/* eslint-disable react-refresh/only-export-components */
import { configureAuth } from 'react-query-auth';
import { Navigate, useLocation } from 'react-router-dom';
import { z } from 'zod';

import { AuthResponse, User } from '@/types/api';
import { ROLES } from '@/types/enum';
import { api } from './api-client';
import axios from 'axios';

const getUser = async (): Promise<User | null> => {
  const accessToken = sessionStorage.getItem('access_token');
  if (!accessToken) {
    console.warn('No access token found. Returning guest user.');
    return null;
  }
  try {
    return await api.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data || error.message;
      console.log('Error fetching user data:', errorData);
    } else {
      console.error('Non-Axios error:', error);
    }

    return null;
  }
};

const logout = (): Promise<void> => {
  sessionStorage.removeItem('access_token');
  return api.post('/auth/logout');
};

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(1, 'Required'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
  return api.post('/auth/login', data);
};

export const registerInputSchema = z
  .object({
    email: z.string().min(1, 'Required'),
    name: z
      .string()
      .min(1, 'Required')
      .regex(/^[a-zA-Z]+$/, 'Name must only contain letters'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[\W_]/, 'Password must contain at least one special character'),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password don't match",
    path: ['confirmPassword'], // show error for confirmPassword field
  });

export type RegisterInput = z.infer<typeof registerInputSchema>;

const registerWithEmailAndPassword = (
  data: RegisterInput,
): Promise<AuthResponse> => {
  return api.post('/auth/register', data);
};

const authConfig = {
  userFn: getUser,
  loginFn: async (data: LoginInput) => {
    const response = await loginWithEmailAndPassword(data);
    sessionStorage.setItem('access_token', response.access_token);
    const user = await getUser();
    return user;
  },
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithEmailAndPassword(data);
    sessionStorage.setItem('access_token', response.access_token);
    return getUser();
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const location = useLocation();
  if (!user.data || user.data.role_name !== ROLES.ADMIN) {
    sessionStorage.removeItem('access_token');
    return (
      <Navigate
        to={`/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }
  return children;
};
