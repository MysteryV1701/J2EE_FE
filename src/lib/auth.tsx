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
  return api.post('/logout');
};

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Yêu cầu cần có email').email('Email không hợp lệ'),
  password: z.string().min(1, 'Yêu cầu cần có mật khẩu'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
  return api.post('/auth/login', data);
};

export const registerInputSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Yêu cầu cần có email')
      .email('Email không hợp lệ'),
    name: z
      .string()
      .min(1, 'Yêu cầu cần có họ và tên')
      .regex(
        /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂĐÊÔƠƯàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹỲÝỴỶỸ]+(?:\s[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂĐÊÔƠƯàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹỲÝỴỶỸ]+)+$/,
        'Họ và tên không hợp lệ',
      ),
    password: z
      .string()
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .regex(/[a-z]/, 'Mật khẩu phải có ít nhất 1 ký tự thường')
      .regex(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 ký tự hoa')
      .regex(/[\W_]/, 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu và xác nhận mật khẩu không khớp',
    path: ['confirmPassword'],
  });

export type RegisterInput = z.infer<typeof registerInputSchema>;

export const registerWithEmailAndPassword = (
  data: RegisterInput,
): Promise<User> => {
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
    return response;
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
